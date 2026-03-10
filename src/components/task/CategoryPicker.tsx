/**
 * CategoryPickerコンポーネント
 * タスクのカテゴリーを選択するUIコンポーネント
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import type { Category } from '../../types/task';
import { CATEGORIES, CATEGORY_COLORS } from '../../constants/categories';
import { Chip } from '../common/Chip';

interface CategoryPickerProps {
  selected?: Category;
  onSelect: (category: Category) => void;
  disabled?: boolean;
}

export const CategoryPicker: React.FC<CategoryPickerProps> = ({
  selected,
  onSelect,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>カテゴリー</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.chipsContainer}>
          {CATEGORIES.map((category) => (
            <Chip
              key={category}
              label={category}
              selected={selected === category}
              onPress={() => onSelect(category)}
              color={CATEGORY_COLORS[category]}
              disabled={disabled}
            />
          ))}
        </View>
      </ScrollView>
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
  scrollView: {
    flexGrow: 0,
  },
  chipsContainer: {
    flexDirection: 'row',
    paddingRight: 16,
  },
});
