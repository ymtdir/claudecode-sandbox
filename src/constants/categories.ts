/**
 * カテゴリー関連の定数定義
 */

import type { Category } from '../types/task';

// 利用可能なカテゴリー
export const CATEGORIES: Category[] = [
  '仕事',
  'プライベート',
  '家事',
  '健康',
  '学習',
];

// カテゴリー色のマッピング
export const CATEGORY_COLORS: Record<Category, string> = {
  仕事: '#4A90E2',
  プライベート: '#FF6B6B',
  家事: '#4ECDC4',
  健康: '#95E1D3',
  学習: '#FFA07A',
};

// カテゴリーアイコンのマッピング（React Native Vector Icons使用時）
export const CATEGORY_ICONS: Record<Category, string> = {
  仕事: 'briefcase',
  プライベート: 'person',
  家事: 'home',
  健康: 'heart',
  学習: 'school',
};

// デフォルトカテゴリー
export const DEFAULT_CATEGORY: Category = '仕事';
