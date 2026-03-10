/**
 * TaskAddScreen
 * タスク追加画面
 */

import { View, StyleSheet, Alert } from 'react-native';
import { useNavigate } from 'react-router-dom';
import { TaskForm } from '../../components/task/TaskForm';
import type { TaskInput } from '../../types/task';
import { TaskManager } from '../../utils/taskManager';

export function TaskAddScreen() {
  const navigate = useNavigate();

  const handleAddTask = (taskData: TaskInput) => {
    try {
      // タスクを作成
      TaskManager.createTask(taskData);

      // 成功メッセージを表示
      Alert.alert('成功', 'タスクが追加されました', [
        {
          text: 'OK',
          onPress: () => {
            // 前の画面に戻る
            navigate(-1);
          },
        },
      ]);
    } catch (error) {
      // エラーメッセージを表示
      Alert.alert('エラー', 'タスクの追加に失敗しました', [{ text: 'OK' }]);
      console.error('タスク追加エラー:', error);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <View style={styles.container}>
      <TaskForm
        onSubmit={handleAddTask}
        onCancel={handleCancel}
        submitButtonText="タスクを追加"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
