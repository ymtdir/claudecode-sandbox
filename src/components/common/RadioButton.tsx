/**
 * RadioButtonコンポーネント
 * 優先度選択などで使用するラジオボタンUI
 */

import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface RadioButtonProps {
  value: string;
  label: string;
  selected: boolean;
  onPress: (value: string) => void;
  disabled?: boolean;
  color?: string;
  style?: ViewStyle;
  labelStyle?: TextStyle;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  value,
  label,
  selected,
  onPress,
  disabled = false,
  color = '#4A90E2',
  style,
  labelStyle,
}) => {
  const handlePress = () => {
    if (!disabled) {
      onPress(value);
    }
  };

  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      <View style={styles.radioContainer}>
        <View
          style={[
            styles.radioOuter,
            selected && { borderColor: color },
            disabled && styles.disabledBorder,
          ]}
        >
          {selected && (
            <View
              style={[
                styles.radioInner,
                { backgroundColor: color },
                disabled && styles.disabledInner,
              ]}
            />
          )}
        </View>
      </View>
      <Text style={[styles.label, disabled && styles.disabledText, labelStyle]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  disabled: {
    opacity: 0.5,
  },
  radioContainer: {
    marginRight: 12,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  disabledBorder: {
    borderColor: '#E0E0E0',
  },
  disabledInner: {
    backgroundColor: '#999999',
  },
  label: {
    fontSize: 16,
    color: '#333333',
  },
  disabledText: {
    color: '#999999',
  },
});
