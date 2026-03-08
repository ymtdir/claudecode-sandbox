/**
 * アプリケーション設定定数
 */

// 環境設定
export const ENV = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

// 現在の環境
export const CURRENT_ENV = process.env.NODE_ENV || ENV.DEVELOPMENT;
export const IS_DEV = CURRENT_ENV === ENV.DEVELOPMENT;
export const IS_PROD = CURRENT_ENV === ENV.PRODUCTION;
export const IS_TEST = CURRENT_ENV === ENV.TEST;

// デバッグ設定
export const DEBUG = {
  ENABLED: IS_DEV,
  LOG_LEVEL: IS_DEV ? 'debug' : 'error',
  SHOW_REDUX_DEVTOOLS: IS_DEV,
  SHOW_NETWORK_LOGS: IS_DEV,
  SHOW_PERFORMANCE_METRICS: IS_DEV,
} as const;

// 日付・時刻設定
export const DATE_TIME_CONFIG = {
  DEFAULT_LOCALE: 'ja-JP',
  FALLBACK_LOCALE: 'en-US',
  TIMEZONE: 'Asia/Tokyo',
  DATE_FORMATS: {
    SHORT: 'MM/dd',
    MEDIUM: 'yyyy/MM/dd',
    LONG: 'yyyy年MM月dd日',
    FULL: 'yyyy年MM月dd日 EEEE',
    ISO: 'yyyy-MM-dd',
  },
  TIME_FORMATS: {
    SHORT: 'HH:mm',
    MEDIUM: 'HH:mm:ss',
    LONG: 'HH時mm分ss秒',
    WITH_TIMEZONE: 'HH:mm:ss zzz',
  },
  DATETIME_FORMATS: {
    SHORT: 'MM/dd HH:mm',
    MEDIUM: 'yyyy/MM/dd HH:mm',
    LONG: 'yyyy年MM月dd日 HH:mm:ss',
    FULL: 'yyyy年MM月dd日 EEEE HH時mm分ss秒',
  },
  WEEK_STARTS_ON: 1, // 1 = Monday, 0 = Sunday
  WEEKEND_DAYS: [0, 6], // Sunday and Saturday
} as const;

// ローカライゼーション設定
export const LOCALIZATION = {
  SUPPORTED_LANGUAGES: ['ja', 'en', 'zh', 'ko'],
  DEFAULT_LANGUAGE: 'ja',
  FALLBACK_LANGUAGE: 'en',
  AUTO_DETECT: true,
  RTL_LANGUAGES: ['ar', 'he'],
} as const;

// キャッシュ設定
export const CACHE_CONFIG = {
  ENABLED: true,
  TTL: {
    SHORT: 300000, // 5分
    MEDIUM: 1800000, // 30分
    LONG: 3600000, // 1時間
    VERY_LONG: 86400000, // 24時間
  },
  MAX_SIZE: 52428800, // 50MB
  CLEAR_ON_LOGOUT: true,
  PERSIST_ON_REFRESH: true,
} as const;

// セッション設定
export const SESSION_CONFIG = {
  TIMEOUT: IS_PROD ? 3600000 : 86400000, // 本番: 1時間, 開発: 24時間
  WARNING_BEFORE: 300000, // タイムアウト5分前に警告
  EXTEND_ON_ACTIVITY: true,
  REMEMBER_ME_DURATION: 2592000000, // 30日
} as const;

// ネットワーク設定
export const NETWORK_CONFIG = {
  TIMEOUT: {
    DEFAULT: 30000, // 30秒
    UPLOAD: 120000, // 2分
    DOWNLOAD: 60000, // 1分
  },
  RETRY: {
    MAX_ATTEMPTS: 3,
    INITIAL_DELAY: 1000,
    MAX_DELAY: 10000,
    MULTIPLIER: 2,
  },
  OFFLINE_MODE: true,
  AUTO_SYNC: true,
  SYNC_INTERVAL: 300000, // 5分
} as const;

// ファイルアップロード設定
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10485760, // 10MB
  MAX_IMAGE_SIZE: 5242880, // 5MB
  CHUNK_SIZE: 524288, // 512KB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  COMPRESSION: {
    ENABLED: true,
    QUALITY: 0.8,
    MAX_WIDTH: 1920,
    MAX_HEIGHT: 1080,
  },
} as const;

// 通知設定
export const NOTIFICATION_CONFIG = {
  ENABLED: true,
  PERMISSION_REQUEST_DELAY: 10000, // 10秒後に権限要求
  DEFAULT_SOUND: true,
  DEFAULT_VIBRATION: true,
  BATCH_INTERVAL: 60000, // 1分ごとにバッチ送信
  MAX_NOTIFICATIONS: 10,
  AUTO_DISMISS_DELAY: 5000, // 5秒後に自動消去
} as const;

// ページネーション設定
export const PAGINATION_CONFIG = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  MAX_PAGE_SIZE: 100,
  INITIAL_PAGE: 1,
  SHOW_TOTAL: true,
  SHOW_SIZE_CHANGER: true,
  SHOW_QUICK_JUMPER: true,
} as const;

// 検索設定
export const SEARCH_CONFIG = {
  MIN_QUERY_LENGTH: 2,
  DEBOUNCE_DELAY: 300,
  MAX_SUGGESTIONS: 10,
  ENABLE_FUZZY_SEARCH: true,
  SEARCH_HISTORY_SIZE: 20,
  HIGHLIGHT_MATCHES: true,
} as const;

// バリデーション設定
export const VALIDATION_CONFIG = {
  PASSWORD: {
    MIN_LENGTH: 8,
    MAX_LENGTH: 128,
    REQUIRE_UPPERCASE: true,
    REQUIRE_LOWERCASE: true,
    REQUIRE_NUMBER: true,
    REQUIRE_SPECIAL: true,
    SPECIAL_CHARS: '@$!%*?&',
  },
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 30,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  EMAIL: {
    MAX_LENGTH: 255,
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
} as const;

// パフォーマンス設定
export const PERFORMANCE_CONFIG = {
  LAZY_LOAD: true,
  VIRTUALIZATION_THRESHOLD: 50,
  IMAGE_LAZY_LOAD: true,
  DEBOUNCE_INPUT: 300,
  THROTTLE_SCROLL: 100,
  BATCH_UPDATES: true,
  USE_WEB_WORKERS: true,
} as const;

// セキュリティ設定
export const SECURITY_CONFIG = {
  ENABLE_ENCRYPTION: true,
  ENABLE_BIOMETRIC: true,
  AUTO_LOCK: true,
  AUTO_LOCK_DELAY: 300000, // 5分
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900000, // 15分
  ENABLE_2FA: true,
  CSP_ENABLED: IS_PROD,
} as const;

// ストレージ設定
export const STORAGE_CONFIG = {
  TYPE: 'AsyncStorage', // 'AsyncStorage' | 'SecureStore' | 'MMKV'
  ENCRYPTION_ENABLED: true,
  MAX_STORAGE_SIZE: 104857600, // 100MB
  COMPRESSION_ENABLED: true,
  AUTO_BACKUP: true,
  BACKUP_INTERVAL: 86400000, // 24時間
} as const;

// アナリティクス設定
export const ANALYTICS_CONFIG = {
  ENABLED: IS_PROD,
  TRACK_EVENTS: true,
  TRACK_SCREENS: true,
  TRACK_ERRORS: true,
  TRACK_PERFORMANCE: true,
  USER_PROPERTIES: true,
  SESSION_TIMEOUT: 1800000, // 30分
} as const;

// フィーチャーフラグ
export const FEATURES = {
  ENABLE_PUSH_NOTIFICATIONS: true,
  ENABLE_OFFLINE_MODE: true,
  ENABLE_SYNC: true,
  ENABLE_SHARING: true,
  ENABLE_COLLABORATION: true,
  ENABLE_AI_SUGGESTIONS: false,
  ENABLE_VOICE_INPUT: false,
  ENABLE_DARK_MODE: true,
  ENABLE_WIDGETS: false,
  ENABLE_EXPORT: true,
} as const;

// エクスポート設定
export const EXPORT_CONFIG = {
  FORMATS: ['pdf', 'csv', 'json', 'ical'],
  MAX_ITEMS: 1000,
  INCLUDE_ATTACHMENTS: false,
  COMPRESSION: true,
} as const;
