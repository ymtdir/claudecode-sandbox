/**
 * ReminderSettingsコンポーネント
 * リマインダー設定のUIコンポーネント（基本UIのみ）
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Reminder } from '../../types/task';

interface ReminderSettingsProps {
  reminders: Partial<Reminder>[];
  onChange: (reminders: Partial<Reminder>[]) => void;
  disabled?: boolean;
}

const timeOptions = [
  { value: 0, label: '時刻通り' },
  { value: 5, label: '5分前' },
  { value: 10, label: '10分前' },
  { value: 15, label: '15分前' },
  { value: 30, label: '30分前' },
  { value: 60, label: '1時間前' },
];

export const ReminderSettings: React.FC<ReminderSettingsProps> = ({
  reminders,
  onChange,
  disabled = false,
}) => {
  const [selectedTime, setSelectedTime] = useState(10); // デフォルト10分前

  const handleTimeChange = (timeOffset: number) => {
    setSelectedTime(timeOffset);
    // リマインダーを更新
    const newReminder: Partial<Reminder> = {
      type: 'time',
      timeOffset,
      isActive: true,
    };
    onChange([newReminder]);
  };

  const currentReminder = reminders.length > 0 ? reminders[0] : null;
  const currentTimeOffset = currentReminder?.timeOffset ?? selectedTime;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>リマインダー</Text>
      <View style={styles.optionsContainer}>
        {timeOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.optionButton,
              currentTimeOffset === option.value && styles.selectedOption,
              disabled && styles.disabledOption,
            ]}
            onPress={() => handleTimeChange(option.value)}
            disabled={disabled}
          >
            <Text
              style={[
                styles.optionText,
                currentTimeOffset === option.value && styles.selectedText,
                disabled && styles.disabledText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.note}>
        ※ 位置情報ベースのリマインダーは今後実装予定です
      </Text>
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
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    backgroundColor: '#4A90E2',
    borderColor: '#4A90E2',
  },
  disabledOption: {
    opacity: 0.5,
  },
  optionText: {
    fontSize: 14,
    color: '#333333',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  disabledText: {
    color: '#999999',
  },
  note: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
    marginTop: 8,
  },
});
