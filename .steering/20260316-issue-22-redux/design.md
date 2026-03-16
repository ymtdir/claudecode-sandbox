# 設計: Redux状態管理の実装

## アーキテクチャ概要

```
┌─────────────────────────────────────┐
│         React Components            │
├─────────────────────────────────────┤
│      Custom Hooks (useTasks等)      │
├─────────────────────────────────────┤
│         Redux Selectors             │
├─────────────────────────────────────┤
│      Redux Store (RTK)              │
│  ┌─────────┬──────────┬─────────┐  │
│  │ tasks   │calendar  │  sync    │  │
│  │ slice   │ slice    │  slice   │  │
│  └─────────┴──────────┴─────────┘  │
├─────────────────────────────────────┤
│      Redux Persist Layer            │
├─────────────────────────────────────┤
│      AsyncStorage (永続化)          │
└─────────────────────────────────────┘
```

## ディレクトリ構造

```
src/
├── store/
│   ├── index.ts              # ストア設定とエクスポート
│   ├── rootReducer.ts        # ルートリデューサー
│   ├── slices/
│   │   ├── tasksSlice.ts     # タスク状態管理
│   │   ├── calendarSlice.ts  # カレンダー状態管理
│   │   └── syncSlice.ts      # 同期状態管理
│   └── selectors/
│       ├── taskSelectors.ts  # タスク関連セレクター
│       └── index.ts          # セレクターエクスポート
├── hooks/
│   ├── useAppDispatch.ts     # 型付きディスパッチ
│   ├── useAppSelector.ts     # 型付きセレクター
│   └── useTasks.ts           # タスク管理フック
└── types/
    ├── store.ts              # ストア関連の型定義
    └── task.ts               # タスクの型定義
```

## 状態構造の設計

### 正規化された状態構造

```typescript
interface StoreState {
  tasks: {
    entities: Record<string, Task>;  // 正規化
    ids: string[];                   // 順序管理
    selectedId: string | null;
    filter: TaskFilter;
    loading: boolean;
    error: string | null;
  };
  calendar: {
    selectedDate: string;
    viewMode: 'month' | 'week' | 'day';
    markedDates: Record<string, MarkerInfo>;
  };
  sync: {
    isSyncing: boolean;
    lastSyncTime: string | null;
    pendingChanges: number;
    syncError: string | null;
  };
}
```

## 実装方針

### フェーズ1: 基盤構築
1. パッケージインストール
2. ストア基本設定
3. 型定義の作成

### フェーズ2: Slice実装
1. tasksSliceの実装
   - 同期アクション
   - 非同期アクション（createAsyncThunk）
   - エラーハンドリング
2. calendarSliceの実装
3. syncSliceの実装

### フェーズ3: セレクター実装
1. 基本セレクター
2. メモ化セレクター（createSelector）
3. 派生データの計算

### フェーズ4: カスタムフック
1. 型付きフック
2. useTasks統合フック
3. エラーハンドリング

### フェーズ5: 永続化設定
1. redux-persist設定
2. ホワイトリスト設定
3. マイグレーション対応

### フェーズ6: 統合とテスト
1. Provider設定
2. 動作確認
3. パフォーマンス確認

## パフォーマンス最適化

### メモ化戦略
- createSelectorによる派生データのメモ化
- shallowEqualによる再レンダリング防止
- バッチ更新の活用

### 正規化の利点
- 更新の効率化
- データの一貫性
- メモリ使用量の最適化

## エラーハンドリング

### 非同期処理
```typescript
createAsyncThunk(
  'tasks/fetch',
  async (_, { rejectWithValue }) => {
    try {
      return await TaskRepository.findAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
```

### エラー状態の管理
- loading/error状態の一元管理
- ユーザーフレンドリーなエラーメッセージ
- リトライ機能の実装

## セキュリティ考慮事項

- 機密情報を状態に保存しない
- 永続化対象の選択的設定
- XSS対策（サニタイズ）

## テスト戦略

- Slice単体テスト
- セレクターテスト
- 統合テスト（フック）
- E2Eテスト（状態遷移）