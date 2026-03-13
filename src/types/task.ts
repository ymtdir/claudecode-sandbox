/**
 * タスク関連の型定義
 */

// カテゴリー型
export type Category = '仕事' | 'プライベート' | '家事' | '健康' | '学習';

// 優先度型
export type Priority = 'low' | 'medium' | 'high';

// タスクステータス型
export type TaskStatus = 'pending' | 'completed' | 'archived';

// リマインダータイプ
export type ReminderType = 'time' | 'location';

// 位置情報型
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

// 繰り返しルール型
export interface RepeatRule {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom';
  interval?: number; // 間隔（例：2週間ごと）
  endDate?: Date; // 終了日
  daysOfWeek?: number[]; // 曜日（0:日曜〜6:土曜）
  dayOfMonth?: number; // 日付（月次繰り返し用）
}

// リマインダー型
export interface Reminder {
  id: string;
  taskId: string;
  type: ReminderType;
  timeOffset?: number; // 分単位（タスク時刻からの差分）
  location?: Location;
  isActive: boolean;
}

// タスク型
export interface Task {
  id: string; // UUID
  title: string; // タスクタイトル
  category: Category; // カテゴリー
  date: Date; // 日付
  time?: string; // 時刻（HH:mm）
  priority: Priority;
  status: TaskStatus;
  completedAt?: Date; // 完了日時
  note?: string; // メモ
  repeatRule?: RepeatRule; // 繰り返し設定
  reminders: Reminder[]; // リマインダー配列
  sharedWith: string[]; // 共有ユーザーID
  createdAt: Date;
  updatedAt: Date;
}

// タスク入力型（作成・更新時用）
export type TaskInput = Partial<
  Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'status' | 'completedAt'>
>;

// バリデーションエラー型
export interface ValidationError {
  field: string;
  message: string;
}

// バリデーション結果型
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
