# タスクリスト: Redux状態管理の実装

## フェーズ1: 基盤構築

- [x] Redux関連パッケージのインストール
  - [x] @reduxjs/toolkitのインストール
  - [x] react-reduxのインストール
  - [x] redux-persistのインストール
  - [x] @react-native-async-storage/async-storageの代替確認（Web用）

- [x] 型定義ファイルの作成
  - [x] src/types/store.tsの作成
  - [x] src/types/task.tsの作成（既存ファイル使用）

- [x] ストア基本設定
  - [x] src/store/index.tsの作成
  - [x] src/store/rootReducer.tsの作成

## フェーズ2: Slice実装

### tasksSlice

- [x] src/store/slices/tasksSlice.tsの作成
  - [x] 初期状態の定義
  - [x] 同期アクション（selectTask, setFilter, completeTask）
  - [x] 非同期アクション（fetchTasks）
  - [x] 非同期アクション（createTask）
  - [x] 非同期アクション（updateTask）
  - [x] 非同期アクション（deleteTask）
  - [x] extraReducersの実装

### calendarSlice

- [x] src/store/slices/calendarSlice.tsの作成
  - [x] 初期状態の定義
  - [x] selectDateアクション
  - [x] changeViewModeアクション
  - [x] updateMarkedDatesアクション

### syncSlice

- [x] src/store/slices/syncSlice.tsの作成
  - [x] 初期状態の定義
  - [x] startSyncアクション
  - [x] syncSuccessアクション
  - [x] syncFailureアクション
  - [x] incrementPendingChangesアクション

## フェーズ3: セレクター実装

- [x] src/store/selectors/taskSelectors.tsの作成
  - [x] selectAllTasks
  - [x] selectTasksByDate
  - [x] selectCompletedTasks
  - [x] selectTaskCompletionRate
  - [x] selectPendingTasks

- [x] src/store/selectors/index.tsの作成（エクスポート統合）

## フェーズ4: カスタムフック

- [x] src/hooks/useAppDispatch.tsの作成
- [x] src/hooks/useAppSelector.tsの作成
- [x] src/hooks/useTasks.tsの作成（useReduxTasks.tsとして作成）
  - [x] タスク取得ロジック
  - [x] エラーハンドリング
  - [x] ローディング状態管理

## フェーズ5: 永続化設定

- [x] Redux Persist設定の更新
  - [x] persistConfigの設定
  - [x] Web用ストレージの設定（localStorage）
  - [x] ホワイトリストの設定
  - [x] persistedReducerの設定

## フェーズ6: 統合とテスト

- [x] App.tsxへのProvider統合
  - [x] Provider設定
  - [x] PersistGate設定

- [x] 動作確認
  - [x] ストアの初期化確認
  - [x] 状態更新の動作確認
  - [x] セレクターの動作確認
  - [x] 永続化の動作確認
  - [x] TypeScriptエラーのチェック

## 完了条件チェック

- [x] Redux Toolkitが正しく設定されている
- [x] ストアが初期化されている
- [x] タスクのCRUD操作がReduxで管理される
- [x] カレンダーの状態がReduxで管理される
- [x] 同期状態がReduxで管理される
- [x] セレクターが正しく動作する
- [x] 非同期アクションが動作する
- [x] 状態の永続化が動作する
- [x] TypeScriptの型が正しく設定されている

## 実装後の振り返り

**実装日**: 2026-03-16
**実装者**: Claude Code
**所要時間**: 約30分

**計画と実績の差分**:

- 既存のTask型とTaskSchema型の不整合があり、型定義の調整が必要だった
- @react-native-async-storage/async-storageの代わりにredux-persist/lib/storageを使用（Web用）
- 既存のuseTasks.tsとの競合を避けるため、useReduxTasks.tsという別名で作成

**学んだこと**:

- TypeScriptのverbatimModuleSyntax設定により、型インポートには明示的にtypeキーワードが必要
- 既存のDexieベースのデータ管理とReduxの並存が可能
- TaskSchemaとTask型の差異を適切に管理する必要性

**次回への改善提案**:

- 型定義の一元化（TaskとTaskSchemaの統合）
- DexieとReduxの使い分けガイドラインの作成
- マイグレーション戦略の検討（Dexie→Redux）
