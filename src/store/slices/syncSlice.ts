/**
 * 同期状態管理用のRedux Slice
 */

import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from '@reduxjs/toolkit';

// 同期状態の型
interface SyncState {
  isSyncing: boolean;
  lastSyncTime: string | null;
  pendingChanges: number;
  syncError: string | null;
  syncProgress: number; // 0-100のパーセンテージ
  autoSyncEnabled: boolean;
  syncInterval: number; // 分単位
  conflictResolutionMode: 'local' | 'remote' | 'merge';
}

// 初期状態
const initialState: SyncState = {
  isSyncing: false,
  lastSyncTime: null,
  pendingChanges: 0,
  syncError: null,
  syncProgress: 0,
  autoSyncEnabled: true,
  syncInterval: 15, // デフォルト15分
  conflictResolutionMode: 'merge',
};

// 非同期アクション: 同期処理
export const performSync = createAsyncThunk(
  'sync/performSync',
  async (_, { dispatch }) => {
    // 同期開始
    dispatch(startSync());

    try {
      // TODO: 実際の同期処理をここに実装
      // 1. ローカルの変更を収集
      // 2. サーバーと同期
      // 3. コンフリクト解決
      // 4. ローカルDBを更新

      // シミュレーション用の遅延
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 成功時の処理
      const syncTime = new Date().toISOString();
      dispatch(syncSuccess(syncTime));

      return { success: true, syncTime };
    } catch (error) {
      // エラー時の処理
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown sync error';
      dispatch(syncFailure(errorMessage));
      throw error;
    }
  }
);

// Sliceの定義
const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    // 同期開始
    startSync: (state) => {
      state.isSyncing = true;
      state.syncError = null;
      state.syncProgress = 0;
    },

    // 同期成功
    syncSuccess: (state, action: PayloadAction<string>) => {
      state.isSyncing = false;
      state.lastSyncTime = action.payload;
      state.pendingChanges = 0;
      state.syncProgress = 100;
    },

    // 同期失敗
    syncFailure: (state, action: PayloadAction<string>) => {
      state.isSyncing = false;
      state.syncError = action.payload;
      state.syncProgress = 0;
    },

    // ペンディング変更数を増やす
    incrementPendingChanges: (state) => {
      state.pendingChanges += 1;
    },

    // ペンディング変更数を減らす
    decrementPendingChanges: (state) => {
      if (state.pendingChanges > 0) {
        state.pendingChanges -= 1;
      }
    },

    // ペンディング変更数をリセット
    resetPendingChanges: (state) => {
      state.pendingChanges = 0;
    },

    // ペンディング変更数を設定
    setPendingChanges: (state, action: PayloadAction<number>) => {
      state.pendingChanges = action.payload;
    },

    // 同期進捗の更新
    updateSyncProgress: (state, action: PayloadAction<number>) => {
      state.syncProgress = Math.min(100, Math.max(0, action.payload));
    },

    // 自動同期の有効/無効切り替え
    toggleAutoSync: (state) => {
      state.autoSyncEnabled = !state.autoSyncEnabled;
    },

    // 自動同期の設定
    setAutoSyncEnabled: (state, action: PayloadAction<boolean>) => {
      state.autoSyncEnabled = action.payload;
    },

    // 同期間隔の設定
    setSyncInterval: (state, action: PayloadAction<number>) => {
      state.syncInterval = Math.max(1, action.payload); // 最小1分
    },

    // コンフリクト解決モードの設定
    setConflictResolutionMode: (
      state,
      action: PayloadAction<'local' | 'remote' | 'merge'>
    ) => {
      state.conflictResolutionMode = action.payload;
    },

    // エラーのクリア
    clearSyncError: (state) => {
      state.syncError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // performSync
      .addCase(performSync.pending, (state) => {
        state.isSyncing = true;
        state.syncError = null;
      })
      .addCase(performSync.fulfilled, (state, action) => {
        state.isSyncing = false;
        state.lastSyncTime = action.payload.syncTime;
        state.pendingChanges = 0;
        state.syncProgress = 100;
      })
      .addCase(performSync.rejected, (state, action) => {
        state.isSyncing = false;
        state.syncError = action.error.message || 'Sync failed';
        state.syncProgress = 0;
      });
  },
});

// アクションのエクスポート
export const {
  startSync,
  syncSuccess,
  syncFailure,
  incrementPendingChanges,
  decrementPendingChanges,
  resetPendingChanges,
  setPendingChanges,
  updateSyncProgress,
  toggleAutoSync,
  setAutoSyncEnabled,
  setSyncInterval,
  setConflictResolutionMode,
  clearSyncError,
} = syncSlice.actions;

// リデューサーのエクスポート
export default syncSlice.reducer;
