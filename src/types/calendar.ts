/**
 * カレンダー関連の型定義
 */

import { Task } from './task';
import { User } from './user';

// カレンダービューの種類
export enum CalendarView {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  AGENDA = 'agenda',
}

// 曜日
export enum DayOfWeek {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

// カレンダー設定
export interface CalendarSettings {
  defaultView: CalendarView;
  firstDayOfWeek: DayOfWeek;
  weekendDays: DayOfWeek[];
  workingHours: {
    start: string; // "09:00"
    end: string; // "18:00"
  };
  timeZone: string;
  showWeekNumbers: boolean;
  showLunarCalendar: boolean;
  defaultReminderMinutes: number;
  theme: CalendarTheme;
}

// カレンダーテーマ
export interface CalendarTheme {
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  weekendColor: string;
  todayColor: string;
  selectedColor: string;
  eventColors: Record<string, string>;
}

// カレンダー共有設定
export enum SharePermission {
  VIEW_ONLY = 'view_only',
  CAN_EDIT = 'can_edit',
  CAN_DELETE = 'can_delete',
  OWNER = 'owner',
}

// 共有ユーザー
export interface SharedUser {
  userId: string;
  user?: User;
  permission: SharePermission;
  sharedAt: Date;
  acceptedAt?: Date;
  isAccepted: boolean;
}

// カレンダー
export interface Calendar {
  id: string;
  name: string;
  description?: string;
  color: string;
  icon?: string;
  ownerId: string;
  owner?: User;
  sharedUsers: SharedUser[];
  settings: CalendarSettings;
  isDefault: boolean;
  isPublic: boolean;
  syncEnabled: boolean;
  externalCalendarId?: string; // Google/Outlook等の外部カレンダーID
  createdAt: Date;
  updatedAt: Date;
  syncStatus: CalendarSyncStatus;
}

// カレンダー同期ステータス
export interface CalendarSyncStatus {
  lastSyncAt?: Date;
  isSyncing: boolean;
  syncError?: string;
  provider?: 'google' | 'outlook' | 'apple' | 'other';
}

// イベント（カレンダー上のタスク表示用）
export interface CalendarEvent {
  id: string;
  calendarId: string;
  taskId?: string;
  task?: Task;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  isAllDay: boolean;
  color?: string;
  location?: string;
  attendees?: EventAttendee[];
  recurrence?: EventRecurrence;
  reminders?: EventReminder[];
  status: EventStatus;
}

// イベント参加者
export interface EventAttendee {
  userId: string;
  user?: User;
  email: string;
  name: string;
  status: 'pending' | 'accepted' | 'declined' | 'tentative';
  isOrganizer: boolean;
}

// イベントリマインダー
export interface EventReminder {
  method: 'email' | 'push' | 'sms';
  minutesBefore: number;
}

// イベントステータス
export enum EventStatus {
  CONFIRMED = 'confirmed',
  TENTATIVE = 'tentative',
  CANCELLED = 'cancelled',
}

// イベント繰り返し設定
export interface EventRecurrence {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  until?: Date;
  count?: number;
  byDay?: DayOfWeek[];
  byMonthDay?: number[];
  byMonth?: number[];
  exceptions?: Date[];
}

// カレンダー作成入力
export interface CalendarInput {
  name: string;
  description?: string;
  color: string;
  icon?: string;
  settings?: Partial<CalendarSettings>;
  isPublic?: boolean;
}

// カレンダー更新入力
export type CalendarUpdateInput = Partial<CalendarInput>;

// カレンダーフィルター
export interface CalendarFilter {
  ownerId?: string;
  isPublic?: boolean;
  sharedWith?: string;
  searchText?: string;
}

// 日付範囲
export interface DateRange {
  start: Date;
  end: Date;
}

// カレンダービューの状態
export interface CalendarViewState {
  currentView: CalendarView;
  currentDate: Date;
  selectedDate?: Date;
  selectedCalendarIds: string[];
  visibleDateRange: DateRange;
  filters: {
    categories?: string[];
    priorities?: string[];
    statuses?: string[];
    searchText?: string;
  };
}

// 月表示用のデータ
export interface MonthData {
  year: number;
  month: number;
  weeks: WeekData[];
  holidays?: Holiday[];
}

// 週表示用のデータ
export interface WeekData {
  weekNumber: number;
  days: DayData[];
}

// 日表示用のデータ
export interface DayData {
  date: Date;
  dayOfMonth: number;
  dayOfWeek: DayOfWeek;
  isToday: boolean;
  isWeekend: boolean;
  isHoliday: boolean;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
  tasks: Task[];
}

// 祝日
export interface Holiday {
  date: Date;
  name: string;
  type: 'national' | 'observance' | 'religious';
  country?: string;
}
