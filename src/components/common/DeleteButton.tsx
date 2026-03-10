/**
 * DeleteButtonコンポーネント
 * タスク削除用のボタンUI
 */

import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  type ViewStyle,
  type TextStyle,
} from 'react-native';

interface DeleteButtonProps {
  onPress: () => void;
  title?: string;
  confirmTitle?: string;
  confirmMessage?: string;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({
  onPress,
  title = '削除',
  confirmTitle = '削除の確認',
  confirmMessage = '本当に削除してもよろしいですか？',
  disabled = false,
  style,
  textStyle,
}) => {
  const handlePress = () => {
    Alert.alert(
      confirmTitle,
      confirmMessage,
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '削除',
          onPress,
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text
        style={[styles.buttonText, disabled && styles.disabledText, textStyle]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#FFB3B0',
    opacity: 0.6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: '#FFEEEE',
  },
});
