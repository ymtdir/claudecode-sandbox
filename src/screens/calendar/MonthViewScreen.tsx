import React, { useState, useCallback, useMemo } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from './MonthViewScreen.styles';
import {
  getTasksByDate,
  getTaskCountByDate,
  updateTaskCompletion,
  postponeTask,
} from '../../mocks/taskData';

/**
 * カレンダー月表示画面
 * UnifiedCalのメイン画面として、カレンダーとタスクリストを統合表示
 */
export const MonthViewScreen: React.FC = () => {
  // 選択中の日付（YYYY-MM-DD形式）
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  // 表示月
  const [currentMonth, setCurrentMonth] = useState<Date>(() => new Date());

  // 選択日のタスク
  const selectedDateTasks = useMemo(
    () => getTasksByDate(selectedDate),
    [selectedDate]
  );

  // タスク数マップ（将来CalendarGridで使用）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const taskCountMap = useMemo(() => getTaskCountByDate(), []);

  // 完了タスク数
  const completedCount = useMemo(
    () => selectedDateTasks.filter((task) => task.completed).length,
    [selectedDateTasks]
  );

  // 完了率
  const completionRate = useMemo(() => {
    if (selectedDateTasks.length === 0) return 0;
    return Math.round((completedCount / selectedDateTasks.length) * 100);
  }, [completedCount, selectedDateTasks.length]);

  // 日付選択ハンドラ（CalendarGridで使用予定）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleDateSelect = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  // 月変更ハンドラ
  const handleMonthChange = useCallback((direction: 'prev' | 'next') => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  }, []);

  // タスク完了ハンドラ
  const handleTaskComplete = useCallback(
    (taskId: string) => {
      const task = selectedDateTasks.find((t) => t.id === taskId);
      if (task) {
        updateTaskCompletion(taskId, !task.completed);
        // 状態を更新（実際のアプリではReduxなどで管理）
        setSelectedDate((prev) => prev); // 再レンダリングをトリガー
      }
    },
    [selectedDateTasks]
  );

  // タスク延期ハンドラ（スワイプジェスチャーで使用予定）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleTaskPostpone = useCallback((taskId: string) => {
    postponeTask(taskId);
    // 状態を更新（実際のアプリではReduxなどで管理）
    setSelectedDate((prev) => prev); // 再レンダリングをトリガー
  }, []);

  // 月のフォーマット
  const monthYearString = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth() + 1;
    return `${year}年${month}月`;
  }, [currentMonth]);

  return (
    <View style={styles.container}>
      {/* ヘッダー */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>UnifiedCal</Text>
        <View style={styles.headerIcons}>{/* アイコンプレースホルダー */}</View>
      </View>

      {/* 月選択 */}
      <View style={styles.monthSelector}>
        <TouchableOpacity onPress={() => handleMonthChange('prev')}>
          <Text style={styles.monthArrow}>{'＜'}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{monthYearString}</Text>
        <TouchableOpacity onPress={() => handleMonthChange('next')}>
          <Text style={styles.monthArrow}>{'＞'}</Text>
        </TouchableOpacity>
      </View>

      {/* カレンダーグリッド - プレースホルダー */}
      <View style={styles.calendarContainer}>
        <Text style={styles.placeholderText}>
          カレンダーグリッドがここに表示されます
        </Text>
        <Text style={styles.debugInfo}>
          選択日: {selectedDate} | タスク数: {selectedDateTasks.length}
        </Text>
      </View>

      {/* プログレスバー */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          今日のタスク ({completedCount}/{selectedDateTasks.length}完了)
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${completionRate}%` }]}
          />
        </View>
        <Text style={styles.progressPercent}>{completionRate}%</Text>
      </View>

      {/* タスクリスト */}
      <ScrollView style={styles.taskListContainer}>
        {selectedDateTasks.map((task) => (
          <TouchableOpacity
            key={task.id}
            style={styles.taskItem}
            onPress={() => handleTaskComplete(task.id)}
          >
            <View style={styles.taskCheckbox}>
              {task.completed && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  task.completed && styles.taskTitleCompleted,
                ]}
              >
                {task.title}
              </Text>
              {task.time && <Text style={styles.taskTime}>{task.time}</Text>}
            </View>
          </TouchableOpacity>
        ))}
        {selectedDateTasks.length === 0 && (
          <Text style={styles.emptyTaskText}>タスクがありません</Text>
        )}
      </ScrollView>

      {/* タスク追加ボタン */}
      <TouchableOpacity style={styles.addTaskButton}>
        <Text style={styles.addTaskButtonText}>＋ タスクを追加</Text>
      </TouchableOpacity>
    </View>
  );
};
