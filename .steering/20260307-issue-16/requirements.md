# 要求仕様書

## Issue情報
- **Issue番号**: #16
- **タイトル**: 【Step 2】基本プロジェクト構造 - ディレクトリ構成とベースコード
- **タイプ**: enhancement, architecture

## 要求概要
UnifiedCalアプリの基本的なディレクトリ構造を構築し、開発の土台となるベースコードを実装します。アーキテクチャ設計書に基づいた標準的なReact Nativeプロジェクト構造を確立します。

## 実装要求

### 1. ディレクトリ構造の作成
```
UnifiedCal/
├── src/
│   ├── screens/              # 画面コンポーネント
│   │   ├── Calendar/
│   │   ├── TaskDetail/
│   │   ├── Statistics/
│   │   └── Settings/
│   ├── components/            # 共通UIコンポーネント
│   │   ├── common/
│   │   ├── calendar/
│   │   └── task/
│   ├── navigation/            # ナビゲーション設定
│   ├── store/                 # Redux Store（後のステップで詳細実装）
│   ├── services/              # 外部サービスとの通信
│   │   ├── api/
│   │   ├── auth/
│   │   └── notification/
│   ├── repositories/          # データアクセス層
│   ├── models/                # データモデル定義
│   ├── utils/                 # ユーティリティ関数
│   ├── hooks/                 # カスタムフック
│   ├── constants/             # 定数定義
│   └── types/                 # TypeScript型定義
├── assets/                    # 画像、フォントなど
│   ├── images/
│   ├── fonts/
│   └── icons/
├── __tests__/                 # テストファイル
└── docs/                      # 既存のドキュメント
```

### 2. 基本的な型定義
```typescript
// src/types/index.ts
export interface Task {
  id: string;
  title: string;
  category: Category;
  date: Date;
  time?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed' | 'archived';
  // ... その他のプロパティ
}

export interface Calendar {
  id: string;
  name: string;
  color: string;
  // ... その他のプロパティ
}
```

### 3. 定数ファイルの作成
```typescript
// src/constants/index.ts
export const APP_NAME = 'UnifiedCal';
export const COLORS = {
  primary: '#4A90E2',
  secondary: '#FF6B6B',
  success: '#4ECDC4',
  // ...
};
```

### 4. ユーティリティ関数の実装
- 日付フォーマット関数
- バリデーション関数
- ストレージヘルパー関数

### 5. App.tsx の基本実装
```typescript
// App.tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      {/* 後のステップでNavigationContainerを追加 */}
    </SafeAreaProvider>
  );
}
```

## 受け入れ条件

- [ ] アーキテクチャ設計書に基づいたディレクトリ構造が作成されている
- [ ] 基本的なTypeScript型定義が実装されている
- [ ] 定数ファイルが作成されている
- [ ] ユーティリティ関数が実装されている
- [ ] App.tsxが正しく設定されている
- [ ] TypeScriptのコンパイルエラーがない
- [ ] アプリが正常に起動する

## 必要な技術/ライブラリ

- TypeScript
- React Native Safe Area Context
- date-fns（日付処理用）

## 依存関係

- #15 【Step 1】開発環境セットアップが完了していること

## 成果物

- 構造化されたプロジェクトディレクトリ
- 基本的な型定義ファイル
- 定数定義ファイル
- ユーティリティ関数
- 動作するApp.tsx

## 作業開始日
2026-03-07