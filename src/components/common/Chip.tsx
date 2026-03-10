/**
 * Chipコンポーネント
 * カテゴリー選択などで使用するチップUI
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface ChipProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  color?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  selected = false,
  onPress,
  color = '#4A90E2',
  disabled = false,
  style,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.chip,
        selected && { backgroundColor: color },
        selected && styles.selectedChip,
        disabled && styles.disabledChip,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.label,
          selected && styles.selectedLabel,
          disabled && styles.disabledLabel,
          textStyle,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChip: {
    borderColor: 'transparent',
  },
  disabledChip: {
    opacity: 0.5,
  },
  label: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '500',
  },
  selectedLabel: {
    color: '#FFFFFF',
  },
  disabledLabel: {
    color: '#999999',
  },
});
