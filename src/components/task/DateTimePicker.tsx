/**
 * DateTimePickerコンポーネント
 * 日付と時刻を選択するUIコンポーネント
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateTimePickerProps {
  date: Date;
  time?: string;
  onChange: (date: Date, time?: string) => void;
  disabled?: boolean;
}

export const DateTimePickerComponent: React.FC<DateTimePickerProps> = ({
  date,
  time,
  onChange,
  disabled = false,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // 日付と時刻を結合してDateオブジェクトを作成
  const getDateTime = (): Date => {
    const dateTime = new Date(date);
    if (time) {
      const [hours, minutes] = time.split(':').map(Number);
      dateTime.setHours(hours, minutes, 0, 0);
    }
    return dateTime;
  };

  // 日付の変更ハンドラー
  const handleDateChange = (_event: unknown, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(date.getHours(), date.getMinutes(), 0, 0);
      onChange(newDate, time);
    }
  };

  // 時刻の変更ハンドラー
  const handleTimeChange = (_event: unknown, selectedTime?: Date) => {
    setShowTimePicker(Platform.OS === 'ios');
    if (selectedTime) {
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
      onChange(date, timeString);
    }
  };

  // 日付をフォーマット
  const formatDate = (d: Date): string => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  };

  // 時刻をフォーマット
  const formatTime = (t?: string): string => {
    if (!t) return '設定なし';
    const [hours, minutes] = t.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>日付と時間</Text>

      <View style={styles.pickersContainer}>
        {/* 日付選択 */}
        <TouchableOpacity
          style={[styles.pickerButton, disabled && styles.disabledButton]}
          onPress={() => setShowDatePicker(true)}
          disabled={disabled}
        >
          <Text style={[styles.pickerText, disabled && styles.disabledText]}>
            📅 {formatDate(date)}
          </Text>
        </TouchableOpacity>

        {/* 時刻選択 */}
        <TouchableOpacity
          style={[styles.pickerButton, disabled && styles.disabledButton]}
          onPress={() => setShowTimePicker(true)}
          disabled={disabled}
        >
          <Text style={[styles.pickerText, disabled && styles.disabledText]}>
            🕐 {formatTime(time)}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 日付ピッカー */}
      {showDatePicker && (
        <DateTimePicker
          testID="datePicker"
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          minimumDate={new Date()}
        />
      )}

      {/* 時刻ピッカー */}
      {showTimePicker && (
        <DateTimePicker
          testID="timePicker"
          value={getDateTime()}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleTimeChange}
          is24Hour={true}
        />
      )}
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
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  pickerButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pickerText: {
    fontSize: 15,
    color: '#333333',
    textAlign: 'center',
  },
  disabledText: {
    color: '#999999',
  },
});
