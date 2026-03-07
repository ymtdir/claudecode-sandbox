/**
 * カラー定数定義
 */

// ブランドカラー
export const BRAND_COLORS = {
  PRIMARY: '#4A90E2',
  PRIMARY_LIGHT: '#6BA3E5',
  PRIMARY_DARK: '#2E7CD6',
  SECONDARY: '#FF6B6B',
  SECONDARY_LIGHT: '#FF8E8E',
  SECONDARY_DARK: '#FF4848',
  ACCENT: '#4ECDC4',
  ACCENT_LIGHT: '#6ED5CD',
  ACCENT_DARK: '#3CBAB1',
} as const;

// 基本カラー
export const BASE_COLORS = {
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  TRANSPARENT: 'transparent',
} as const;

// グレースケール
export const GRAY_COLORS = {
  GRAY_50: '#F9FAFB',
  GRAY_100: '#F3F4F6',
  GRAY_200: '#E5E7EB',
  GRAY_300: '#D1D5DB',
  GRAY_400: '#9CA3AF',
  GRAY_500: '#6B7280',
  GRAY_600: '#4B5563',
  GRAY_700: '#374151',
  GRAY_800: '#1F2937',
  GRAY_900: '#111827',
} as const;

// セマンティックカラー
export const SEMANTIC_COLORS = {
  SUCCESS: '#4ECDC4',
  SUCCESS_LIGHT: '#6ED5CD',
  SUCCESS_DARK: '#3CBAB1',
  WARNING: '#FFD93D',
  WARNING_LIGHT: '#FFE066',
  WARNING_DARK: '#FFCC00',
  ERROR: '#FF6B6B',
  ERROR_LIGHT: '#FF8E8E',
  ERROR_DARK: '#FF4848',
  INFO: '#4A90E2',
  INFO_LIGHT: '#6BA3E5',
  INFO_DARK: '#2E7CD6',
} as const;

// テキストカラー
export const TEXT_COLORS = {
  PRIMARY: '#1F2937',
  SECONDARY: '#6B7280',
  TERTIARY: '#9CA3AF',
  DISABLED: '#D1D5DB',
  INVERSE: '#FFFFFF',
  LINK: '#4A90E2',
  LINK_HOVER: '#2E7CD6',
} as const;

// 背景カラー
export const BACKGROUND_COLORS = {
  PRIMARY: '#FFFFFF',
  SECONDARY: '#F9FAFB',
  TERTIARY: '#F3F4F6',
  OVERLAY: 'rgba(0, 0, 0, 0.5)',
  MODAL: 'rgba(0, 0, 0, 0.7)',
  DISABLED: '#E5E7EB',
  HOVER: '#F3F4F6',
  SELECTED: '#E0F2FE',
} as const;

// ボーダーカラー
export const BORDER_COLORS = {
  DEFAULT: '#E5E7EB',
  LIGHT: '#F3F4F6',
  DARK: '#D1D5DB',
  FOCUS: '#4A90E2',
  ERROR: '#FF6B6B',
  SUCCESS: '#4ECDC4',
} as const;

// タスク優先度カラー
export const PRIORITY_COLORS = {
  LOW: '#6B7280',
  MEDIUM: '#4A90E2',
  HIGH: '#FFD93D',
  URGENT: '#FF6B6B',
} as const;

// タスクステータスカラー
export const STATUS_COLORS = {
  PENDING: '#9CA3AF',
  IN_PROGRESS: '#4A90E2',
  COMPLETED: '#4ECDC4',
  ARCHIVED: '#6B7280',
  CANCELLED: '#FF6B6B',
} as const;

// カテゴリーカラー（デフォルト）
export const CATEGORY_COLORS = [
  '#FF6B6B', // Red
  '#FF8E53', // Orange
  '#FFD93D', // Yellow
  '#4ECDC4', // Teal
  '#4A90E2', // Blue
  '#6C5CE7', // Purple
  '#A8E6CF', // Mint
  '#FD79A8', // Pink
  '#FDCB6E', // Gold
  '#6C5CE7', // Violet
  '#00B894', // Green
  '#0984E3', // Sky Blue
] as const;

// カレンダーカラー
export const CALENDAR_COLORS = {
  TODAY: '#4A90E2',
  TODAY_BG: '#E0F2FE',
  WEEKEND: '#FF6B6B',
  WEEKEND_BG: '#FEE2E2',
  HOLIDAY: '#FFD93D',
  HOLIDAY_BG: '#FEF3C7',
  SELECTED: '#4A90E2',
  SELECTED_BG: '#DBEAFE',
  EVENT: '#4ECDC4',
  OTHER_MONTH: '#D1D5DB',
} as const;

// チャートカラー
export const CHART_COLORS = [
  '#4A90E2',
  '#FF6B6B',
  '#4ECDC4',
  '#FFD93D',
  '#6C5CE7',
  '#A8E6CF',
  '#FD79A8',
  '#FDCB6E',
  '#00B894',
  '#0984E3',
] as const;

// ダークモードカラー
export const DARK_COLORS = {
  BACKGROUND_PRIMARY: '#111827',
  BACKGROUND_SECONDARY: '#1F2937',
  BACKGROUND_TERTIARY: '#374151',
  TEXT_PRIMARY: '#F9FAFB',
  TEXT_SECONDARY: '#D1D5DB',
  TEXT_TERTIARY: '#9CA3AF',
  BORDER: '#374151',
  BORDER_LIGHT: '#4B5563',
} as const;

// グラデーション
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #4A90E2 0%, #6BA3E5 100%)',
  SECONDARY: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 100%)',
  SUCCESS: 'linear-gradient(135deg, #4ECDC4 0%, #6ED5CD 100%)',
  WARNING: 'linear-gradient(135deg, #FFD93D 0%, #FFE066 100%)',
  SUNSET: 'linear-gradient(135deg, #FF6B6B 0%, #FFD93D 100%)',
  OCEAN: 'linear-gradient(135deg, #4A90E2 0%, #4ECDC4 100%)',
  PURPLE: 'linear-gradient(135deg, #6C5CE7 0%, #A8E6CF 100%)',
} as const;

// シャドウカラー
export const SHADOW_COLORS = {
  LIGHT: 'rgba(0, 0, 0, 0.1)',
  MEDIUM: 'rgba(0, 0, 0, 0.15)',
  DARK: 'rgba(0, 0, 0, 0.2)',
  COLORED: 'rgba(74, 144, 226, 0.2)',
} as const;

// アルファ値
export const ALPHA_VALUES = {
  TRANSPARENT: 0,
  VERY_LIGHT: 0.1,
  LIGHT: 0.3,
  MEDIUM: 0.5,
  DARK: 0.7,
  VERY_DARK: 0.9,
  OPAQUE: 1,
} as const;

// カラーパレット統合
export const COLORS = {
  ...BRAND_COLORS,
  ...BASE_COLORS,
  GRAY: GRAY_COLORS,
  SEMANTIC: SEMANTIC_COLORS,
  TEXT: TEXT_COLORS,
  BACKGROUND: BACKGROUND_COLORS,
  BORDER: BORDER_COLORS,
  PRIORITY: PRIORITY_COLORS,
  STATUS: STATUS_COLORS,
  CATEGORY: CATEGORY_COLORS,
  CALENDAR: CALENDAR_COLORS,
  CHART: CHART_COLORS,
  DARK: DARK_COLORS,
  GRADIENT: GRADIENTS,
  SHADOW: SHADOW_COLORS,
  ALPHA: ALPHA_VALUES,
} as const;

export default COLORS;
