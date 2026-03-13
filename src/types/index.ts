/**
 * UnifiedCal - 型定義のメインエクスポート
 */

// 基本型のエクスポート
export * from './common';
export * from './calendar';
export * from './user';

// task.tsからの選択的エクスポート（重複を避ける）
export type {
  Category,
  Priority,
  TaskStatus,
  ReminderType,
  Location,
  RepeatRule,
  Reminder,
  Task,
  TaskInput,
} from './task';

// 型ユーティリティ
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type AsyncResult<T> = Promise<T | Error>;

// APIレスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

// ページネーション型
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
