/**
 * バリデーション関数
 * タスクフォームの入力値を検証するユーティリティ
 */

import type {
  TaskInput,
  ValidationError,
  ValidationResult,
} from '../types/task';

/**
 * タスクのバリデーションを実行
 */
export const validateTask = (task: Partial<TaskInput>): ValidationResult => {
  const errors: ValidationError[] = [];

  // タイトルのバリデーション
  if (!task.title || task.title.trim().length === 0) {
    errors.push({
      field: 'title',
      message: 'タイトルは必須です',
    });
  } else if (task.title.length > 100) {
    errors.push({
      field: 'title',
      message: 'タイトルは100文字以内で入力してください',
    });
  }

  // 日付のバリデーション
  if (task.date) {
    const taskDate = new Date(task.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 過去の日付チェック（時間を無視して日付のみ比較）
    const taskDateOnly = new Date(taskDate);
    taskDateOnly.setHours(0, 0, 0, 0);

    if (taskDateOnly < today) {
      errors.push({
        field: 'date',
        message: '過去の日付は選択できません',
      });
    }
  }

  // 時刻のバリデーション
  if (task.time) {
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(task.time)) {
      errors.push({
        field: 'time',
        message: '時刻は HH:mm 形式で入力してください',
      });
    }
  }

  // メモのバリデーション
  if (task.note && task.note.length > 500) {
    errors.push({
      field: 'note',
      message: 'メモは500文字以内で入力してください',
    });
  }

  // 繰り返し設定のバリデーション
  if (task.repeatRule) {
    if (task.repeatRule.endDate) {
      const endDate = new Date(task.repeatRule.endDate);
      const startDate = task.date ? new Date(task.date) : new Date();

      if (endDate < startDate) {
        errors.push({
          field: 'repeatRule.endDate',
          message: '終了日は開始日より後に設定してください',
        });
      }
    }

    if (task.repeatRule.interval && task.repeatRule.interval < 1) {
      errors.push({
        field: 'repeatRule.interval',
        message: '繰り返し間隔は1以上で設定してください',
      });
    }

    if (task.repeatRule.daysOfWeek) {
      const invalidDays = task.repeatRule.daysOfWeek.filter(
        (day) => day < 0 || day > 6
      );
      if (invalidDays.length > 0) {
        errors.push({
          field: 'repeatRule.daysOfWeek',
          message: '曜日の値が不正です',
        });
      }
    }

    if (task.repeatRule.dayOfMonth) {
      if (task.repeatRule.dayOfMonth < 1 || task.repeatRule.dayOfMonth > 31) {
        errors.push({
          field: 'repeatRule.dayOfMonth',
          message: '日付は1〜31の範囲で設定してください',
        });
      }
    }
  }

  // リマインダーのバリデーション
  if (task.reminders && task.reminders.length > 0) {
    task.reminders.forEach((reminder, index) => {
      if (reminder.type === 'time') {
        if (reminder.timeOffset === undefined || reminder.timeOffset < 0) {
          errors.push({
            field: `reminders[${index}].timeOffset`,
            message: 'リマインダーの時間オフセットは0以上で設定してください',
          });
        }
      } else if (reminder.type === 'location') {
        if (!reminder.location) {
          errors.push({
            field: `reminders[${index}].location`,
            message: '位置情報リマインダーには位置情報が必要です',
          });
        } else {
          if (
            reminder.location.latitude < -90 ||
            reminder.location.latitude > 90
          ) {
            errors.push({
              field: `reminders[${index}].location.latitude`,
              message: '緯度は-90〜90の範囲で設定してください',
            });
          }
          if (
            reminder.location.longitude < -180 ||
            reminder.location.longitude > 180
          ) {
            errors.push({
              field: `reminders[${index}].location.longitude`,
              message: '経度は-180〜180の範囲で設定してください',
            });
          }
        }
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * 単一フィールドのバリデーション
 */
export const validateField = (
  fieldName: string,
  value: unknown
): ValidationError | null => {
  const partialTask = { [fieldName]: value };
  const result = validateTask(partialTask);

  const fieldError = result.errors.find((error) => error.field === fieldName);
  return fieldError || null;
};

/**
 * タイトルフィールドのバリデーション
 */
export const validateTitle = (title: string): string | null => {
  if (!title || title.trim().length === 0) {
    return 'タイトルは必須です';
  }
  if (title.length > 100) {
    return 'タイトルは100文字以内で入力してください';
  }
  return null;
};

/**
 * 日付フィールドのバリデーション
 */
export const validateDate = (date: Date): string | null => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const taskDate = new Date(date);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate < today) {
    return '過去の日付は選択できません';
  }
  return null;
};

/**
 * 時刻フィールドのバリデーション
 */
export const validateTime = (time: string): string | null => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(time)) {
    return '時刻は HH:mm 形式で入力してください';
  }
  return null;
};

/**
 * メモフィールドのバリデーション
 */
export const validateNote = (note: string): string | null => {
  if (note && note.length > 500) {
    return 'メモは500文字以内で入力してください';
  }
  return null;
};
