/**
 * PrioritySelectorコンポーネント
 * タスクの優先度を選択するUIコンポーネント
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import type { Priority } from '../../types/task';
import { RadioButton } from '../common/RadioButton';

interface PrioritySelectorProps {
  priority: Priority;
  onChange: (priority: Priority) => void;
  disabled?: boolean;
}

const priorities: Array<{ value: Priority; label: string; color: string }> = [
  { value: 'low', label: '低', color: '#4ECDC4' },
  { value: 'medium', label: '中', color: '#FFD93D' },
  { value: 'high', label: '高', color: '#FF6B6B' },
];

export const PrioritySelector: React.FC<PrioritySelectorProps> = ({
  priority,
  onChange,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>優先度</Text>
      <View style={styles.radioGroup}>
        {priorities.map((item) => (
          <RadioButton
            key={item.value}
            value={item.value}
            label={item.label}
            selected={priority === item.value}
            onPress={(value) => onChange(value as Priority)}
            color={item.color}
            disabled={disabled}
            style={styles.radioButton}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  radioButton: {
    flex: 1,
  },
});
