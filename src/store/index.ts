/**
 * Reduxストアの設定とエクスポート
 */

import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage使用
import rootReducer from './rootReducer';

// Redux Persistの設定
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth', 'settings'], // 永続化するstateを指定
  // blacklist: ['sync'], // 永続化しないstateを指定（必要に応じて）
};

// 永続化されたリデューサーの作成
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ストアの設定
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Redux Persistアクションを無視
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        // Date型のパスを無視（必要に応じて）
        ignoredPaths: ['tasks.entities', 'calendar.selectedDate'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Persistor（永続化管理用）
export const persistor = persistStore(store);

// 型定義のエクスポート
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
