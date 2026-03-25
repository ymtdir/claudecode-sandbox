# 要求定義: Redux状態管理の実装

## Issue情報

- Issue番号: #22
- タイトル: 【Step 8】Redux状態管理 - グローバル状態管理の実装
- ラベル: enhancement, architecture

## 要求内容

Redux Toolkitを使用してアプリケーション全体の状態管理を実装します。タスク、カレンダー、認証、同期状態などをグローバルに管理する仕組みを構築します。

## 実装要件

### 1. Redux Toolkitのセットアップ

- @reduxjs/toolkitとreact-reduxのインストール
- redux-persistによる状態永続化の設定
- ストアの初期化と設定

### 2. 状態管理の実装範囲

#### タスク管理 (tasksSlice)

- タスクのCRUD操作
- タスクの選択状態
- フィルタリング機能
- 非同期データフェッチ
- 楽観的更新

#### カレンダー管理 (calendarSlice)

- 選択日付の管理
- ビューモード切り替え（月/週/日）
- マークされた日付の管理

#### 同期管理 (syncSlice)

- 同期状態の追跡
- 最終同期時刻
- ペンディング変更数
- エラー状態

### 3. 技術要件

#### TypeScript統合

- 厳密な型定義
- RootStateとAppDispatchの型
- PayloadActionの型付け

#### パフォーマンス最適化

- createSelectorによるメモ化
- 正規化された状態構造
- 効率的な更新パターン

#### 永続化設定

- redux-persistによる選択的永続化
- authとsettingsのホワイトリスト化
- AsyncStorageとの統合

### 4. セレクターの実装

- selectAllTasks: 全タスク取得
- selectTasksByDate: 日付別タスク
- selectCompletedTasks: 完了タスク
- selectTaskCompletionRate: 完了率計算

### 5. カスタムフック

- useAppDispatch: 型付きディスパッチ
- useAppSelector: 型付きセレクター
- useTasks: タスク管理用統合フック

## 受け入れ条件

- [x] Redux Toolkitが正しく設定されている
- [x] ストアが初期化されている
- [x] タスクのCRUD操作がReduxで管理される
- [x] カレンダーの状態がReduxで管理される
- [x] 同期状態がReduxで管理される
- [x] セレクターが正しく動作する
- [x] 非同期アクションが動作する
- [x] 状態の永続化が動作する（Redux Persist）
- [x] TypeScriptの型が正しく設定されている

## 依存関係

- Issue #15: 開発環境セットアップ（完了）
- Issue #16: 基本プロジェクト構造（完了）
- Issue #21: ローカルデータベース実装（完了）

## 成果物

1. 設定済みのReduxストア (`src/store/index.ts`)
2. タスクSlice (`src/store/slices/tasksSlice.ts`)
3. カレンダーSlice (`src/store/slices/calendarSlice.ts`)
4. 同期Slice (`src/store/slices/syncSlice.ts`)
5. セレクター関数 (`src/store/selectors/`)
6. カスタムフック (`src/hooks/`)
7. 永続化設定

## 制約事項

- Redux Toolkitのベストプラクティスに従う
- 不変性を保証する更新パターン
- 正規化された状態構造の採用
- パフォーマンスを考慮した設計
