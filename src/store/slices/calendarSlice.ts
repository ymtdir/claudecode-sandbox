/**
 * カレンダー管理用のRedux Slice
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CalendarViewMode, MarkerInfo } from '../../types/store';

// カレンダーの状態型
interface CalendarState {
  selectedDate: string; // YYYY-MM-DD形式
  viewMode: CalendarViewMode;
  markedDates: Record<string, MarkerInfo>;
  currentMonth: string; // YYYY-MM形式
  isLoading: boolean;
}

// 初期状態
const initialState: CalendarState = {
  selectedDate: new Date().toISOString().split('T')[0],
  viewMode: 'month',
  markedDates: {},
  currentMonth: new Date().toISOString().slice(0, 7),
  isLoading: false,
};

// Sliceの定義
const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    // 日付選択
    selectDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },

    // ビューモード変更
    changeViewMode: (state, action: PayloadAction<CalendarViewMode>) => {
      state.viewMode = action.payload;
    },

    // マークされた日付の更新
    updateMarkedDates: (
      state,
      action: PayloadAction<Record<string, MarkerInfo>>
    ) => {
      state.markedDates = action.payload;
    },

    // 単一日付のマーク更新
    updateSingleMarkedDate: (
      state,
      action: PayloadAction<{ date: string; info: MarkerInfo }>
    ) => {
      state.markedDates[action.payload.date] = action.payload.info;
    },

    // マークされた日付のクリア
    clearMarkedDates: (state) => {
      state.markedDates = {};
    },

    // 現在の月を変更
    changeCurrentMonth: (state, action: PayloadAction<string>) => {
      state.currentMonth = action.payload;
    },

    // 次の月へ移動
    goToNextMonth: (state) => {
      const [year, month] = state.currentMonth.split('-').map(Number);
      const nextMonth = month === 12 ? 1 : month + 1;
      const nextYear = month === 12 ? year + 1 : year;
      state.currentMonth = `${nextYear}-${String(nextMonth).padStart(2, '0')}`;
    },

    // 前の月へ移動
    goToPreviousMonth: (state) => {
      const [year, month] = state.currentMonth.split('-').map(Number);
      const prevMonth = month === 1 ? 12 : month - 1;
      const prevYear = month === 1 ? year - 1 : year;
      state.currentMonth = `${prevYear}-${String(prevMonth).padStart(2, '0')}`;
    },

    // 今日の日付へ移動
    goToToday: (state) => {
      const today = new Date();
      state.selectedDate = today.toISOString().split('T')[0];
      state.currentMonth = today.toISOString().slice(0, 7);
    },

    // 週の開始日を設定（日曜日または月曜日）
    setWeekStartsOn: () => {
      // 0: 日曜日, 1: 月曜日
      // この値は別の設定スライスで管理することも可能
      // ここではカレンダーに関連する設定として保持
    },

    // ローディング状態の設定
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// アクションのエクスポート
export const {
  selectDate,
  changeViewMode,
  updateMarkedDates,
  updateSingleMarkedDate,
  clearMarkedDates,
  changeCurrentMonth,
  goToNextMonth,
  goToPreviousMonth,
  goToToday,
  setWeekStartsOn,
  setLoading,
} = calendarSlice.actions;

// リデューサーのエクスポート
export default calendarSlice.reducer;
