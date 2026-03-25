# 設計書

## アーキテクチャ概要

コンポーネント駆動開発（Component-Driven Development）を採用し、Atomic Designパターンに基づいた階層構造で実装します。

```
screens/
  └── Task/
      ├── TaskAddScreen.tsx    # タスク追加画面
      └── TaskEditScreen.tsx   # タスク編集画面

components/
  └── task/
      ├── TaskForm.tsx         # タスクフォーム（organisms）
      ├── CategoryPicker.tsx   # カテゴリー選択（molecules）
      ├── PrioritySelector.tsx # 優先度選択（molecules）
      └── ReminderSettings.tsx # リマインダー設定（molecules）

utils/
  ├── validation.ts            # バリデーションロジック
  └── taskManager.ts          # タスク管理ユーティリティ

types/
  └── task.ts                 # タスク関連の型定義
```

## コンポーネント設計

### 1. TaskAddScreen

**責務**:

- タスク追加画面の表示
- TaskFormコンポーネントの管理
- タスク保存処理のハンドリング

**実装の要点**:

- ScrollViewでフォーム全体をラップ
- キーボード表示時の挙動を考慮

### 2. TaskEditScreen

**責務**:

- 既存タスクデータの取得と表示
- 更新処理のハンドリング
- 削除処理のハンドリング

**実装の要点**:

- route.paramsからtaskIdを取得
- 削除確認ダイアログの実装

### 3. TaskForm

**責務**:

- フォーム全体のレイアウト管理
- 各入力コンポーネントの状態管理
- バリデーション処理
- submit処理

**実装の要点**:

- React Hook Formを使用
- 初期値の設定（新規/編集モード対応）

### 4. CategoryPicker

**責務**:

- カテゴリーの選択UI提供
- 選択状態の管理

**実装の要点**:

- Chip UIでカテゴリーを表示
- 単一選択のみ許可

### 5. PrioritySelector

**責務**:

- 優先度の選択UI提供
- 3段階（低/中/高）の選択

**実装の要点**:

- RadioButton UIを使用
- デフォルトは「中」

## データフロー

### タスク追加フロー

```
1. ユーザーがタスク追加画面を開く
2. TaskFormコンポーネントが初期状態で表示
3. 必要項目を入力
4. バリデーション実行
5. TaskManagerでタスクオブジェクト生成
6. メモリ内ストレージに保存
7. 画面遷移またはフィードバック表示
```

### タスク編集フロー

```
1. タスクIDを受け取ってTaskEditScreenを表示
2. TaskManagerから既存タスクデータを取得
3. TaskFormに初期値として設定
4. 編集内容の入力
5. バリデーション実行
6. TaskManagerで更新処理
7. メモリ内ストレージを更新
```

## エラーハンドリング戦略

### バリデーションエラー

```typescript
interface ValidationError {
  field: string;
  message: string;
}
```

### エラーハンドリングパターン

- フィールドレベルのエラー表示（入力フィールドの下）
- フォームレベルのエラー表示（トーストまたはアラート）

## テスト戦略

### ユニットテスト

- validateTask関数のテスト
- TaskManagerクラスのメソッドテスト

### 統合テスト

- タスク追加フローのE2Eテスト
- タスク編集・削除フローのE2Eテスト

## 依存ライブラリ

```json
{
  "dependencies": {
    "react-hook-form": "^7.51.0",
    "@react-native-community/datetimepicker": "^8.0.0",
    "uuid": "^9.0.1",
    "date-fns": "^3.0.0"
  }
}
```

## ディレクトリ構造

```
src/
├── screens/
│   └── Task/
│       ├── TaskAddScreen.tsx
│       └── TaskEditScreen.tsx
├── components/
│   ├── task/
│   │   ├── TaskForm.tsx
│   │   ├── CategoryPicker.tsx
│   │   ├── PrioritySelector.tsx
│   │   └── ReminderSettings.tsx
│   └── common/
│       ├── Chip.tsx
│       └── RadioButton.tsx
├── utils/
│   ├── validation.ts
│   └── taskManager.ts
├── types/
│   └── task.ts
└── constants/
    └── categories.ts
```

## 実装の順序

1. 型定義とインターフェースの作成
2. 基本コンポーネント（Chip、RadioButton）の実装
3. TaskManagerクラスの実装
4. バリデーション関数の実装
5. タスク関連コンポーネント（CategoryPicker、PrioritySelector）の実装
6. TaskFormコンポーネントの実装
7. TaskAddScreen、TaskEditScreenの実装
8. テストの作成

## セキュリティ考慮事項

- XSS対策: ユーザー入力値の適切なエスケープ
- データ検証: クライアント側・サーバー側両方でのバリデーション

## パフォーマンス考慮事項

- React.memoを使用したコンポーネントの最適化
- useCallbackによる関数の再生成防止
- 大量タスク表示時の仮想スクロール（将来的な拡張）

## 将来の拡張性

- タスクのタグ機能追加を考慮した設計
- 添付ファイル機能の追加を想定
- 音声入力によるタスク追加機能の拡張余地
