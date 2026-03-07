/**
 * メッセージ定数定義
 */

// 成功メッセージ
export const SUCCESS_MESSAGES = {
  // タスク関連
  TASK_CREATED: 'タスクを作成しました',
  TASK_UPDATED: 'タスクを更新しました',
  TASK_DELETED: 'タスクを削除しました',
  TASK_COMPLETED: 'タスクを完了しました',
  TASK_RESTORED: 'タスクを復元しました',
  TASK_DUPLICATED: 'タスクを複製しました',

  // カレンダー関連
  CALENDAR_CREATED: 'カレンダーを作成しました',
  CALENDAR_UPDATED: 'カレンダーを更新しました',
  CALENDAR_DELETED: 'カレンダーを削除しました',
  CALENDAR_SHARED: 'カレンダーを共有しました',
  CALENDAR_SYNCED: 'カレンダーを同期しました',

  // ユーザー関連
  LOGIN_SUCCESS: 'ログインしました',
  LOGOUT_SUCCESS: 'ログアウトしました',
  REGISTER_SUCCESS: 'アカウントを作成しました',
  PASSWORD_CHANGED: 'パスワードを変更しました',
  PROFILE_UPDATED: 'プロフィールを更新しました',
  EMAIL_VERIFIED: 'メールアドレスを確認しました',

  // 設定関連
  SETTINGS_SAVED: '設定を保存しました',
  PREFERENCES_UPDATED: '設定を更新しました',
  THEME_CHANGED: 'テーマを変更しました',
  LANGUAGE_CHANGED: '言語を変更しました',

  // ファイル関連
  FILE_UPLOADED: 'ファイルをアップロードしました',
  FILE_DELETED: 'ファイルを削除しました',
  FILE_DOWNLOADED: 'ファイルをダウンロードしました',

  // 共有関連
  SHARE_SUCCESS: '共有しました',
  INVITE_SENT: '招待を送信しました',
  PERMISSION_UPDATED: '権限を更新しました',

  // その他
  DATA_SAVED: 'データを保存しました',
  DATA_EXPORTED: 'データをエクスポートしました',
  DATA_IMPORTED: 'データをインポートしました',
  SYNC_COMPLETE: '同期が完了しました',
  BACKUP_COMPLETE: 'バックアップが完了しました',
} as const;

// エラーメッセージ
export const ERROR_MESSAGES = {
  // 一般エラー
  GENERIC_ERROR: 'エラーが発生しました',
  NETWORK_ERROR: 'ネットワークエラーが発生しました',
  SERVER_ERROR: 'サーバーエラーが発生しました',
  TIMEOUT_ERROR: 'リクエストがタイムアウトしました',
  PERMISSION_DENIED: '権限がありません',
  NOT_FOUND: 'データが見つかりません',

  // 認証関連
  LOGIN_FAILED: 'ログインに失敗しました',
  INVALID_CREDENTIALS: 'メールアドレスまたはパスワードが正しくありません',
  ACCOUNT_LOCKED: 'アカウントがロックされています',
  SESSION_EXPIRED: 'セッションの有効期限が切れました',
  UNAUTHORIZED: '認証が必要です',
  TOKEN_EXPIRED: 'トークンの有効期限が切れました',

  // バリデーション関連
  VALIDATION_FAILED: '入力内容に誤りがあります',
  REQUIRED_FIELD: 'このフィールドは必須です',
  INVALID_EMAIL: '有効なメールアドレスを入力してください',
  INVALID_PASSWORD: 'パスワードが要件を満たしていません',
  PASSWORD_MISMATCH: 'パスワードが一致しません',
  INVALID_DATE: '有効な日付を入力してください',
  INVALID_TIME: '有効な時刻を入力してください',
  INVALID_FORMAT: '形式が正しくありません',

  // 長さ・サイズ関連
  TOO_SHORT: '文字数が不足しています',
  TOO_LONG: '文字数が多すぎます',
  FILE_TOO_LARGE: 'ファイルサイズが大きすぎます',
  LIMIT_EXCEEDED: '上限を超えています',

  // タスク関連
  TASK_NOT_FOUND: 'タスクが見つかりません',
  TASK_CREATE_FAILED: 'タスクの作成に失敗しました',
  TASK_UPDATE_FAILED: 'タスクの更新に失敗しました',
  TASK_DELETE_FAILED: 'タスクの削除に失敗しました',
  TASK_ALREADY_COMPLETED: 'タスクは既に完了しています',

  // カレンダー関連
  CALENDAR_NOT_FOUND: 'カレンダーが見つかりません',
  CALENDAR_CREATE_FAILED: 'カレンダーの作成に失敗しました',
  CALENDAR_UPDATE_FAILED: 'カレンダーの更新に失敗しました',
  CALENDAR_DELETE_FAILED: 'カレンダーの削除に失敗しました',
  CALENDAR_SYNC_FAILED: 'カレンダーの同期に失敗しました',

  // ファイル関連
  FILE_UPLOAD_FAILED: 'ファイルのアップロードに失敗しました',
  FILE_NOT_FOUND: 'ファイルが見つかりません',
  FILE_TYPE_NOT_SUPPORTED: 'このファイル形式はサポートされていません',

  // ストレージ関連
  STORAGE_FULL: 'ストレージ容量が不足しています',
  STORAGE_ERROR: 'ストレージエラーが発生しました',

  // 同期関連
  SYNC_FAILED: '同期に失敗しました',
  SYNC_CONFLICT: '同期の競合が発生しました',
  OFFLINE_MODE: 'オフラインのため操作できません',
} as const;

// 警告メッセージ
export const WARNING_MESSAGES = {
  UNSAVED_CHANGES: '保存されていない変更があります',
  DELETE_CONFIRMATION: '本当に削除しますか？この操作は元に戻せません',
  LOGOUT_CONFIRMATION: '本当にログアウトしますか？',
  OVERWRITE_CONFIRMATION: '既存のデータを上書きしますか？',
  SESSION_EXPIRING: 'セッションがまもなく終了します',
  WEAK_PASSWORD: 'パスワードが弱すぎます',
  DUPLICATE_ENTRY: '重複するエントリが存在します',
  FEATURE_BETA: 'この機能はベータ版です',
  OFFLINE_WARNING: 'オフラインモードで実行中です',
  SYNC_PENDING: '同期待ちのデータがあります',
  STORAGE_WARNING: 'ストレージ容量が残りわずかです',
} as const;

// 情報メッセージ
export const INFO_MESSAGES = {
  LOADING: '読み込み中...',
  SAVING: '保存中...',
  DELETING: '削除中...',
  UPLOADING: 'アップロード中...',
  DOWNLOADING: 'ダウンロード中...',
  SYNCING: '同期中...',
  PROCESSING: '処理中...',
  NO_DATA: 'データがありません',
  NO_RESULTS: '検索結果がありません',
  NO_TASKS_TODAY: '今日のタスクはありません',
  NO_UPCOMING_TASKS: '予定されているタスクはありません',
  PULL_TO_REFRESH: '下に引いて更新',
  RELEASE_TO_REFRESH: '離して更新',
  END_OF_LIST: 'リストの終わりです',
} as const;

// プレースホルダーメッセージ
export const PLACEHOLDER_MESSAGES = {
  EMAIL: 'メールアドレスを入力',
  PASSWORD: 'パスワードを入力',
  SEARCH: '検索...',
  TASK_TITLE: 'タスクのタイトルを入力',
  TASK_DESCRIPTION: 'タスクの詳細を入力',
  CALENDAR_NAME: 'カレンダー名を入力',
  ADD_NOTE: 'メモを追加',
  SELECT_DATE: '日付を選択',
  SELECT_TIME: '時刻を選択',
  SELECT_CATEGORY: 'カテゴリーを選択',
  SELECT_PRIORITY: '優先度を選択',
  ADD_TAG: 'タグを追加',
} as const;

// ボタンラベル
export const BUTTON_LABELS = {
  OK: 'OK',
  CANCEL: 'キャンセル',
  SAVE: '保存',
  DELETE: '削除',
  EDIT: '編集',
  CREATE: '作成',
  UPDATE: '更新',
  SUBMIT: '送信',
  CONFIRM: '確認',
  CLOSE: '閉じる',
  BACK: '戻る',
  NEXT: '次へ',
  PREVIOUS: '前へ',
  FINISH: '完了',
  ADD: '追加',
  REMOVE: '削除',
  APPLY: '適用',
  RESET: 'リセット',
  RETRY: '再試行',
  SHARE: '共有',
  EXPORT: 'エクスポート',
  IMPORT: 'インポート',
  LOGIN: 'ログイン',
  LOGOUT: 'ログアウト',
  REGISTER: '登録',
  FORGOT_PASSWORD: 'パスワードを忘れた方',
} as const;

// タイトル
export const TITLES = {
  // 画面タイトル
  HOME: 'ホーム',
  CALENDAR: 'カレンダー',
  TASKS: 'タスク',
  SETTINGS: '設定',
  PROFILE: 'プロフィール',
  STATISTICS: '統計',
  NOTIFICATIONS: '通知',
  HELP: 'ヘルプ',
  ABOUT: 'このアプリについて',

  // ダイアログタイトル
  NEW_TASK: '新しいタスク',
  EDIT_TASK: 'タスクを編集',
  DELETE_TASK: 'タスクを削除',
  NEW_CALENDAR: '新しいカレンダー',
  EDIT_CALENDAR: 'カレンダーを編集',
  DELETE_CALENDAR: 'カレンダーを削除',
  SHARE_CALENDAR: 'カレンダーを共有',
  IMPORT_DATA: 'データをインポート',
  EXPORT_DATA: 'データをエクスポート',

  // セクションタイトル
  TODAY: '今日',
  TOMORROW: '明日',
  THIS_WEEK: '今週',
  THIS_MONTH: '今月',
  UPCOMING: '予定',
  OVERDUE: '期限切れ',
  COMPLETED: '完了済み',
  ALL_TASKS: 'すべてのタスク',
} as const;

// ヘルプメッセージ
export const HELP_MESSAGES = {
  PASSWORD_REQUIREMENTS:
    'パスワードは8文字以上で、大文字、小文字、数字、特殊文字を含む必要があります',
  DATE_FORMAT: '日付形式: YYYY/MM/DD',
  TIME_FORMAT: '時刻形式: HH:MM (24時間形式)',
  SWIPE_TO_DELETE: '左にスワイプして削除',
  SWIPE_TO_COMPLETE: '右にスワイプして完了',
  LONG_PRESS_TO_SELECT: '長押しして選択',
  DRAG_TO_REORDER: 'ドラッグして並び替え',
  PULL_DOWN_TO_REFRESH: '下に引いて更新',
  TAP_TO_EDIT: 'タップして編集',
  DOUBLE_TAP_TO_ZOOM: 'ダブルタップでズーム',
} as const;

// 統合エクスポート
export const MESSAGES = {
  SUCCESS: SUCCESS_MESSAGES,
  ERROR: ERROR_MESSAGES,
  WARNING: WARNING_MESSAGES,
  INFO: INFO_MESSAGES,
  PLACEHOLDER: PLACEHOLDER_MESSAGES,
  BUTTON: BUTTON_LABELS,
  TITLE: TITLES,
  HELP: HELP_MESSAGES,
} as const;

export default MESSAGES;
