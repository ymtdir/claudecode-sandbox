/**
 * TaskManagerクラス
 * タスクの作成、更新、削除、取得を管理するユーティリティ
 */

import { v4 as uuidv4 } from 'uuid';
import type { Task, TaskInput, TaskStatus, Priority } from '../types/task';
import { DEFAULT_CATEGORY } from '../constants/categories';

// メモリ内でタスクを管理（将来的にはAsyncStorageやDBに置き換え）
class TaskStore {
  private tasks: Map<string, Task> = new Map();

  getAll(): Task[] {
    return Array.from(this.tasks.values());
  }

  getById(id: string): Task | undefined {
    return this.tasks.get(id);
  }

  save(task: Task): void {
    this.tasks.set(task.id, task);
  }

  delete(id: string): boolean {
    return this.tasks.delete(id);
  }
}

const taskStore = new TaskStore();

export class TaskManager {
  /**
   * 新しいタスクを作成
   */
  static createTask(data: TaskInput): Task {
    const now = new Date();
    const newTask: Task = {
      id: uuidv4(),
      title: data.title || '',
      category: data.category || DEFAULT_CATEGORY,
      date: data.date || now,
      time: data.time,
      priority: data.priority || 'medium',
      status: 'pending' as TaskStatus,
      note: data.note,
      repeatRule: data.repeatRule,
      reminders: data.reminders || [],
      sharedWith: data.sharedWith || [],
      createdAt: now,
      updatedAt: now,
    };

    taskStore.save(newTask);
    return newTask;
  }

  /**
   * タスクを更新
   */
  static updateTask(id: string, updates: Partial<Task>): Task | null {
    const existingTask = taskStore.getById(id);

    if (!existingTask) {
      return null;
    }

    const updatedTask: Task = {
      ...existingTask,
      ...updates,
      id: existingTask.id, // IDは変更不可
      createdAt: existingTask.createdAt, // 作成日時は変更不可
      updatedAt: new Date(),
    };

    // タスクが完了状態に変更された場合、完了日時を設定
    if (updates.status === 'completed' && existingTask.status !== 'completed') {
      updatedTask.completedAt = new Date();
    }

    taskStore.save(updatedTask);
    return updatedTask;
  }

  /**
   * タスクを削除
   */
  static deleteTask(id: string): boolean {
    return taskStore.delete(id);
  }

  /**
   * IDでタスクを取得
   */
  static getTaskById(id: string): Task | undefined {
    return taskStore.getById(id);
  }

  /**
   * すべてのタスクを取得
   */
  static getAllTasks(): Task[] {
    return taskStore.getAll();
  }

  /**
   * 日付でタスクをフィルター
   */
  static getTasksByDate(date: Date): Task[] {
    const targetDateStr = date.toISOString().split('T')[0];
    return taskStore.getAll().filter((task) => {
      const taskDateStr = task.date.toISOString().split('T')[0];
      return taskDateStr === targetDateStr;
    });
  }

  /**
   * カテゴリーでタスクをフィルター
   */
  static getTasksByCategory(category: string): Task[] {
    return taskStore.getAll().filter((task) => task.category === category);
  }

  /**
   * ステータスでタスクをフィルター
   */
  static getTasksByStatus(status: TaskStatus): Task[] {
    return taskStore.getAll().filter((task) => task.status === status);
  }

  /**
   * タスクを完了にする
   */
  static completeTask(id: string): Task | null {
    return this.updateTask(id, {
      status: 'completed' as TaskStatus,
      completedAt: new Date(),
    });
  }

  /**
   * タスクの完了を取り消す
   */
  static uncompleteTask(id: string): Task | null {
    const task = taskStore.getById(id);
    if (!task) return null;

    const updates: Partial<Task> = {
      status: 'pending' as TaskStatus,
    };

    // completedAtをundefinedにして削除
    const updatedTask = this.updateTask(id, updates);
    if (updatedTask) {
      delete updatedTask.completedAt;
      taskStore.save(updatedTask);
    }

    return updatedTask;
  }

  /**
   * タスクの優先度を変更
   */
  static changePriority(id: string, priority: Priority): Task | null {
    return this.updateTask(id, { priority });
  }

  /**
   * 期限切れのタスクを取得
   */
  static getOverdueTasks(): Task[] {
    const now = new Date();
    return taskStore.getAll().filter((task) => {
      if (task.status === 'completed') return false;

      const taskDateTime = new Date(task.date);
      if (task.time) {
        const [hours, minutes] = task.time.split(':').map(Number);
        taskDateTime.setHours(hours, minutes);
      }

      return taskDateTime < now;
    });
  }

  /**
   * 今日のタスクを取得
   */
  static getTodayTasks(): Task[] {
    return this.getTasksByDate(new Date());
  }

  /**
   * タスクの統計を取得
   */
  static getTaskStatistics() {
    const allTasks = taskStore.getAll();
    const todayTasks = this.getTodayTasks();

    return {
      total: allTasks.length,
      completed: allTasks.filter((t) => t.status === 'completed').length,
      pending: allTasks.filter((t) => t.status === 'pending').length,
      overdue: this.getOverdueTasks().length,
      todayTotal: todayTasks.length,
      todayCompleted: todayTasks.filter((t) => t.status === 'completed').length,
    };
  }
}
