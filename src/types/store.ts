/**
 * Redux Store関連の型定義
 */

import { store } from '../store';

// ストアから型を推論
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// タスクフィルターの型
export interface TaskFilter {
  date?: string;
  category?: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority?: 'low' | 'medium' | 'high';
}

// カレンダービューモードの型
export type CalendarViewMode = 'month' | 'week' | 'day';

// マークされた日付の情報
export interface MarkerInfo {
  marked: boolean;
  dotColor?: string;
  taskCount?: number;
  completedCount?: number;
}

// 同期状態の型
export interface SyncStatus {
  isSyncing: boolean;
  lastSyncTime: string | null;
  pendingChanges: number;
  syncError: string | null;
}

// 非同期アクションのエラー型
export interface AsyncError {
  message: string;
  code?: string;
  details?: unknown;
}
