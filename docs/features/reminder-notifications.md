# リマインダー通知機能

## 概要

タスクに対してリマインダー通知を設定し、指定した時間に通知を受け取ることができる機能です。ブラウザのWeb Notification APIを使用して、デスクトップ通知を送信します。

## 機能一覧

### 1. 時間ベースリマインダー
- タスクの期限前に通知（5分前、10分前、30分前など）
- カスタム時間設定

### 2. 繰り返しリマインダー
- 毎日
- 毎週
- 毎月
- カスタム間隔

### 3. 位置ベースリマインダー（将来実装予定）
- 特定の場所に到着/出発時に通知

## 使用方法

### 通知権限の取得

1. アプリケーション初回起動時に通知権限をリクエスト
2. 設定画面から権限のオン/オフを切り替え可能

```typescript
// 通知権限のリクエスト
const service = NotificationService.getInstance();
const granted = await service.requestPermission();
```

### リマインダーの設定

#### タスク作成時

1. タスクフォームの「リマインダー設定」セクションを開く
2. 「時間前」または「繰り返し」を選択
3. 通知タイミングを設定
4. 保存

#### 既存タスクへの追加

1. タスク編集画面を開く
2. 「リマインダー追加」ボタンをクリック
3. リマインダータイプと設定を選択
4. 保存

### リマインダーの管理

- **有効/無効の切り替え**: トグルスイッチで一時的に無効化
- **削除**: 削除ボタンでリマインダーを完全に削除
- **一覧表示**: すべてのアクティブなリマインダーを確認

## 技術仕様

### アーキテクチャ

```
┌─────────────────────┐
│   UI Components     │
│  (ReminderSettings) │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│    Redux Store      │
│  (reminderSlice)    │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ NotificationService │
│    (Singleton)      │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  Web Notification   │
│        API          │
└─────────────────────┘
```

### 主要コンポーネント

#### UI Components

- **ReminderSettings.tsx**: リマインダー設定UI
- **ReminderList.tsx**: リマインダー一覧表示
- **ReminderSettingsAdapter.tsx**: TaskFormとの連携

#### Services

- **NotificationService.ts**: 通知管理サービス
  - 通知権限管理
  - 通知のスケジューリング
  - 繰り返し通知の処理

#### State Management

- **reminderSlice.ts**: Reduxスライス
  - リマインダーのCRUD操作
  - 通知権限状態の管理
  - セレクタの提供

#### Error Handling

- **errorHandling.ts**: エラー処理ユーティリティ
- **ErrorBoundary.tsx**: Reactエラー境界
- **globalErrorHandler.ts**: グローバルエラーハンドラー

### データ構造

#### Reminder型

```typescript
interface Reminder {
  id: string;
  taskId: string;
  type: 'time' | 'repeat' | 'location';
  timeOffset?: number; // 分単位（負の値）
  repeatRule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    interval?: number;
    daysOfWeek?: number[];
    dayOfMonth?: number;
  };
  location?: {
    latitude: number;
    longitude: number;
    radius: number;
    trigger: 'enter' | 'exit';
  };
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastTriggered?: Date;
}
```

### Web Notification API

#### 権限管理

```typescript
// 権限の状態
type NotificationPermission = 'default' | 'granted' | 'denied';

// 権限のリクエスト
const permission = await Notification.requestPermission();
```

#### 通知の表示

```typescript
const notification = new Notification(title, {
  body: 'タスクの期限が近づいています',
  icon: '/favicon.ico',
  badge: '/badge.png',
  tag: 'task-reminder',
  requireInteraction: true,
});
```

### Service Worker（PWA対応）

```javascript
// sw.js
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('/tasks/' + event.notification.data.taskId)
  );
});
```

## エラーハンドリング

### エラータイプ

- `NOTIFICATION_PERMISSION`: 通知権限エラー
- `NOTIFICATION_DISPLAY`: 通知表示エラー
- `NOTIFICATION_SCHEDULE`: スケジューリングエラー
- `REMINDER_CREATE/UPDATE/DELETE`: リマインダー操作エラー

### エラー処理フロー

1. エラーのキャッチ
2. ログへの記録（console + localStorage）
3. ユーザーフレンドリーなメッセージ表示
4. エラーレポートの作成（開発環境）

### デバッグ

開発環境では以下のコマンドで保存されたエラーを確認可能：

```javascript
window.displaySavedErrors();
```

## テスト

### ユニットテスト

- NotificationService: 通知サービスの全メソッド
- reminderSlice: Redux状態管理のアクション/セレクタ
- カバレッジ: 90%以上

### 手動テスト手順

1. **通知権限のテスト**
   - ブラウザ設定で通知を無効化
   - アプリから権限リクエスト
   - 権限付与後の動作確認

2. **時間ベースリマインダー**
   - 1分後にリマインダー設定
   - 通知が表示されることを確認

3. **繰り返しリマインダー**
   - 日次リマインダー設定
   - 翌日の同時刻に通知確認

## 制限事項

### ブラウザ互換性

- Chrome: 完全対応
- Firefox: 完全対応
- Safari: 部分対応（macOSの通知設定に依存）
- Edge: 完全対応
- Mobile: PWA経由でのみ対応

### 制限

1. バックグラウンド通知はService Worker実装が必要
2. モバイルブラウザでは制限あり
3. 通知はOSレベルで無効化される可能性

## トラブルシューティング

### 通知が表示されない

1. ブラウザの通知権限を確認
2. OS（Windows/macOS/Linux）の通知設定を確認
3. ブラウザのサイト設定を確認
4. Service Workerの登録状態を確認

### リマインダーが動作しない

1. Redux DevToolsでstate確認
2. localStorage内のデータ確認
3. エラーログの確認（`window.displaySavedErrors()`）

## 今後の改善計画

1. **プッシュ通知対応**
   - バックエンドサーバーとの連携
   - FCM/APNs統合

2. **位置ベースリマインダー**
   - Geolocation API統合
   - ジオフェンシング実装

3. **スマート通知**
   - 機械学習による最適な通知タイミング
   - ユーザーの行動パターン分析

4. **カスタマイズ機能**
   - 通知音のカスタマイズ
   - 通知のグループ化
   - Do Not Disturb時間帯設定

## 参考資料

- [Web Notifications API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Service Worker API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Push API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)