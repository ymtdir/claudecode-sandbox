/**
 * Service Worker
 * PWA対応とバックグラウンド通知処理
 */

// Service Workerのバージョン管理
const CACHE_VERSION = 'v1.0.0';
const CACHE_NAME = `task-app-cache-${CACHE_VERSION}`;

// キャッシュする静的アセット
const STATIC_ASSETS = ['/', '/index.html', '/favicon.ico', '/manifest.json'];

// Service Worker のインストール
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );

  // 新しいService Workerを即座にアクティベート
  self.skipWaiting();
});

// Service Worker のアクティベート
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );

  // 即座にクライアントを制御
  self.clients.claim();
});

// フェッチイベントの処理（キャッシュファースト戦略）
self.addEventListener('fetch', (event) => {
  // APIリクエストはキャッシュしない
  if (event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }

        // キャッシュにない場合はネットワークから取得
        return fetch(event.request).then((response) => {
          // 有効なレスポンスでない場合はそのまま返す
          if (
            !response ||
            response.status !== 200 ||
            response.type !== 'basic'
          ) {
            return response;
          }

          // レスポンスをキャッシュに保存
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        });
      })
      .catch(() => {
        // オフライン時のフォールバック
        if (event.request.destination === 'document') {
          return caches.match('/offline.html');
        }
      })
  );
});

// 通知クリックイベントの処理
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  const data = notification.data || {};

  console.log('[ServiceWorker] Notification click:', action);

  // 通知を閉じる
  notification.close();

  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      // 既存のウィンドウがあればフォーカス
      for (let client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          // メインウィンドウにメッセージを送信
          client.postMessage({
            type: 'notification-click',
            data: {
              tag: notification.tag,
              action: action,
              taskId: data.taskId,
              reminderId: data.reminderId,
            },
          });
          return client.focus();
        }
      }

      // ウィンドウがなければ新しく開く
      if (clients.openWindow) {
        return clients.openWindow('/').then((client) => {
          // 新しいウィンドウにメッセージを送信（少し遅延）
          setTimeout(() => {
            client.postMessage({
              type: 'notification-click',
              data: {
                tag: notification.tag,
                action: action,
                taskId: data.taskId,
                reminderId: data.reminderId,
              },
            });
          }, 1000);
        });
      }
    })
  );
});

// 通知クローズイベントの処理
self.addEventListener('notificationclose', (event) => {
  const notification = event.notification;
  const data = notification.data || {};

  console.log('[ServiceWorker] Notification closed');

  // メインウィンドウに通知クローズを通知
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage({
          type: 'notification-close',
          data: {
            tag: notification.tag,
            taskId: data.taskId,
            reminderId: data.reminderId,
          },
        });
      });
    })
  );
});

// プッシュ通知の処理（将来の拡張用）
self.addEventListener('push', (event) => {
  console.log('[ServiceWorker] Push received');

  let notificationData = {
    title: 'タスクリマインダー',
    body: '新しいリマインダーがあります',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
  };

  // プッシュメッセージからデータを取得
  if (event.data) {
    try {
      notificationData = event.data.json();
    } catch (e) {
      notificationData.body = event.data.text();
    }
  }

  const options = {
    body: notificationData.body,
    icon: notificationData.icon || '/favicon.ico',
    badge: notificationData.badge || '/favicon.ico',
    vibrate: [200, 100, 200],
    data: notificationData.data,
    actions: notificationData.actions || [
      {
        action: 'complete',
        title: '完了',
        icon: '/icons/check.png',
      },
      {
        action: 'snooze',
        title: 'スヌーズ',
        icon: '/icons/snooze.png',
      },
    ],
    requireInteraction: true,
  };

  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});

// バックグラウンド同期（将来の拡張用）
self.addEventListener('sync', (event) => {
  console.log('[ServiceWorker] Sync event:', event.tag);

  if (event.tag === 'sync-reminders') {
    event.waitUntil(syncReminders());
  }
});

// リマインダーの同期処理
async function syncReminders() {
  try {
    // APIからリマインダーデータを取得
    const response = await fetch('/api/reminders/sync');
    const data = await response.json();

    // 必要に応じて通知をスケジュール
    console.log('[ServiceWorker] Reminders synced:', data);
  } catch (error) {
    console.error('[ServiceWorker] Sync failed:', error);
  }
}

// 定期的なバックグラウンド同期（将来の拡張用）
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-reminders') {
    event.waitUntil(checkAndNotifyReminders());
  }
});

// リマインダーチェックと通知
async function checkAndNotifyReminders() {
  try {
    // APIから期限が近いリマインダーを取得
    const response = await fetch('/api/reminders/upcoming');
    const reminders = await response.json();

    // 各リマインダーに対して通知を表示
    reminders.forEach((reminder) => {
      const options = {
        body: reminder.description,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        tag: reminder.id,
        data: {
          taskId: reminder.taskId,
          reminderId: reminder.id,
        },
        requireInteraction: true,
      };

      self.registration.showNotification(reminder.title, options);
    });
  } catch (error) {
    console.error('[ServiceWorker] Check reminders failed:', error);
  }
}

// Service Worker のメッセージ処理
self.addEventListener('message', (event) => {
  console.log('[ServiceWorker] Message received:', event.data);

  if (event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
