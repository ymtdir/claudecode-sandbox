/**
 * タスク関連のセレクター
 * メモ化により効率的な再計算を実現
 */

import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../index';
import type { Priority, Category } from '../../types/task';
import type { TaskSchema } from '../../database/schema';

// 基本セレクター
const selectTaskEntities = (state: RootState) => state.tasks.entities;
const selectTaskIds = (state: RootState) => state.tasks.ids;
const selectTaskFilter = (state: RootState) => state.tasks.filter;

// 全タスクを配列として取得
export const selectAllTasks = createSelector(
  [selectTaskEntities, selectTaskIds],
  (entities, ids) =>
    ids
      .map((id) => entities[id])
      .filter((task): task is TaskSchema => task !== undefined)
);

// 日付別タスクを取得
export const selectTasksByDate = createSelector(
  [selectAllTasks, (_state: RootState, date: string) => date],
  (tasks, date) => {
    return tasks.filter((task) => {
      // Date型の場合はtoISOString、string型の場合はそのまま比較
      const taskDate =
        task.date instanceof Date
          ? task.date.toISOString().split('T')[0]
          : task.date;
      return taskDate === date;
    });
  }
);

// 完了タスクを取得
export const selectCompletedTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status === 'completed')
);

// ペンディングタスクを取得
export const selectPendingTasks = createSelector([selectAllTasks], (tasks) =>
  tasks.filter((task) => task.status === 'pending')
);

// カテゴリー別タスクを取得
export const selectTasksByCategory = createSelector(
  [selectAllTasks, (_state: RootState, category: Category) => category],
  (tasks, category) => tasks.filter((task) => task.category === category)
);

// 優先度別タスクを取得
export const selectTasksByPriority = createSelector(
  [selectAllTasks, (_state: RootState, priority: Priority) => priority],
  (tasks, priority) => tasks.filter((task) => task.priority === priority)
);

// タスク完了率を計算
export const selectTaskCompletionRate = createSelector(
  [selectAllTasks],
  (tasks) => {
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((t) => t.status === 'completed').length;
    return Math.round((completed / tasks.length) * 100);
  }
);

// 今日のタスクを取得
export const selectTodayTasks = createSelector([selectAllTasks], (tasks) => {
  const today = new Date().toISOString().split('T')[0];
  return tasks.filter((task) => {
    const taskDate =
      task.date instanceof Date
        ? task.date.toISOString().split('T')[0]
        : task.date;
    return taskDate === today;
  });
});

// 期限切れタスクを取得
export const selectOverdueTasks = createSelector([selectAllTasks], (tasks) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return tasks.filter((task) => {
    if (task.status === 'completed') return false;

    const taskDate =
      task.date instanceof Date ? task.date : new Date(task.date);
    taskDate.setHours(0, 0, 0, 0);

    return taskDate < today;
  });
});

// フィルター適用済みタスクを取得
export const selectFilteredTasks = createSelector(
  [selectAllTasks, selectTaskFilter],
  (tasks, filter) => {
    let filtered = [...tasks];

    // 日付フィルター
    if (filter.date) {
      filtered = filtered.filter((task) => {
        const taskDate =
          task.date instanceof Date
            ? task.date.toISOString().split('T')[0]
            : task.date;
        return taskDate === filter.date;
      });
    }

    // カテゴリーフィルター
    if (filter.category) {
      filtered = filtered.filter((task) => task.category === filter.category);
    }

    // ステータスフィルター
    if (filter.status) {
      filtered = filtered.filter((task) => task.status === filter.status);
    }

    // 優先度フィルター
    if (filter.priority) {
      filtered = filtered.filter((task) => task.priority === filter.priority);
    }

    return filtered;
  }
);

// タスク統計を取得
export const selectTaskStatistics = createSelector(
  [selectAllTasks],
  (tasks) => {
    const stats = {
      total: tasks.length,
      completed: 0,
      pending: 0,
      overdue: 0,
      byCategory: {} as Record<Category, number>,
      byPriority: {} as Record<Priority, number>,
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    tasks.forEach((task) => {
      // ステータス別カウント
      if (task.status === 'completed') {
        stats.completed++;
      } else if (task.status === 'pending') {
        stats.pending++;
      }

      // 期限切れチェック
      if (task.status !== 'completed') {
        const taskDate =
          task.date instanceof Date ? task.date : new Date(task.date);
        taskDate.setHours(0, 0, 0, 0);
        if (taskDate < today) {
          stats.overdue++;
        }
      }

      // カテゴリー別カウント
      const category = task.category as Category;
      stats.byCategory[category] = (stats.byCategory[category] || 0) + 1;

      // 優先度別カウント
      stats.byPriority[task.priority] =
        (stats.byPriority[task.priority] || 0) + 1;
    });

    return stats;
  }
);

// 選択中のタスクを取得
export const selectSelectedTask = createSelector(
  [selectTaskEntities, (state: RootState) => state.tasks.selectedId],
  (entities, selectedId) => {
    if (!selectedId) return null;
    return entities[selectedId] || null;
  }
);

// ローディング状態を取得
export const selectTasksLoading = (state: RootState) => state.tasks.loading;

// エラー状態を取得
export const selectTasksError = (state: RootState) => state.tasks.error;
