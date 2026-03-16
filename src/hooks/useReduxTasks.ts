/**
 * Redux用タスク管理統合フック
 * タスクの取得、作成、更新、削除などの操作を提供
 */

import { useEffect, useCallback } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  selectTask,
  setFilter,
  completeTask,
  updateTaskPriority,
  clearError,
} from '../store/slices/tasksSlice';
import {
  selectAllTasks,
  selectTasksByDate,
  selectFilteredTasks,
  selectTasksLoading,
  selectTasksError,
  selectSelectedTask,
  selectTaskCompletionRate,
  selectTodayTasks,
  selectOverdueTasks,
} from '../store/selectors';
import type { Priority } from '../types/task';
import type { TaskFilter } from '../types/store';
import type { TaskSchema } from '../database/schema';

/**
 * Redux タスク管理用フック
 * @param date - 特定日付のタスクを取得する場合に指定（オプション）
 * @returns タスク関連のデータと操作関数
 */
export function useReduxTasks(date?: string) {
  const dispatch = useAppDispatch();

  // セレクターでデータ取得
  const tasks = useAppSelector((state) =>
    date ? selectTasksByDate(state, date) : selectAllTasks(state)
  );
  const allTasks = useAppSelector(selectAllTasks);
  const filteredTasks = useAppSelector(selectFilteredTasks);
  const loading = useAppSelector(selectTasksLoading);
  const error = useAppSelector(selectTasksError);
  const selectedTask = useAppSelector(selectSelectedTask);
  const completionRate = useAppSelector(selectTaskCompletionRate);
  const todayTasks = useAppSelector(selectTodayTasks);
  const overdueTasks = useAppSelector(selectOverdueTasks);

  // 初期データ取得
  useEffect(() => {
    const dateObj = date ? new Date(date) : undefined;
    dispatch(fetchTasks(dateObj));
  }, [date, dispatch]);

  // タスク作成
  const handleCreateTask = useCallback(
    async (taskData: Partial<TaskSchema>) => {
      try {
        await dispatch(createTask(taskData)).unwrap();
      } catch (error) {
        console.error('Failed to create task:', error);
        throw error;
      }
    },
    [dispatch]
  );

  // タスク更新
  const handleUpdateTask = useCallback(
    async (id: string, updates: Partial<TaskSchema>) => {
      try {
        await dispatch(updateTask({ id, updates })).unwrap();
      } catch (error) {
        console.error('Failed to update task:', error);
        throw error;
      }
    },
    [dispatch]
  );

  // タスク削除
  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteTask(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete task:', error);
        throw error;
      }
    },
    [dispatch]
  );

  // タスク選択
  const handleSelectTask = useCallback(
    (id: string | null) => {
      dispatch(selectTask(id));
    },
    [dispatch]
  );

  // タスク完了
  const handleCompleteTask = useCallback(
    (id: string) => {
      dispatch(completeTask(id));
    },
    [dispatch]
  );

  // 優先度変更
  const handleUpdatePriority = useCallback(
    (id: string, priority: Priority) => {
      dispatch(updateTaskPriority({ id, priority }));
    },
    [dispatch]
  );

  // フィルター設定
  const handleSetFilter = useCallback(
    (filter: TaskFilter) => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );

  // エラークリア
  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // データ再取得
  const refetch = useCallback(() => {
    const dateObj = date ? new Date(date) : undefined;
    dispatch(fetchTasks(dateObj));
  }, [date, dispatch]);

  return {
    // データ
    tasks,
    allTasks,
    filteredTasks,
    selectedTask,
    todayTasks,
    overdueTasks,
    completionRate,
    loading,
    error,

    // 操作関数
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    selectTask: handleSelectTask,
    completeTask: handleCompleteTask,
    updatePriority: handleUpdatePriority,
    setFilter: handleSetFilter,
    clearError: handleClearError,
    refetch,
  };
}

/**
 * Redux 今日のタスク用フック
 */
export function useReduxTodayTasks() {
  const today = new Date().toISOString().split('T')[0];
  return useReduxTasks(today);
}

/**
 * Redux 選択されたタスク用フック
 */
export function useReduxSelectedTask() {
  const dispatch = useAppDispatch();
  const selectedTask = useAppSelector(selectSelectedTask);

  const handleSelectTask = useCallback(
    (id: string | null) => {
      dispatch(selectTask(id));
    },
    [dispatch]
  );

  return {
    selectedTask,
    selectTask: handleSelectTask,
  };
}
