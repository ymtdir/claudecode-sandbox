/**
 * 日付関連のユーティリティ関数
 */

import {
  format,
  parse,
  addDays,
  subDays,
  isToday,
  isTomorrow,
  isYesterday,
  isPast,
  isFuture,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isValid,
} from 'date-fns';
import { ja, enUS, zhCN, ko } from 'date-fns/locale';

// ロケールのマッピング
const locales = {
  ja: ja,
  en: enUS,
  zh: zhCN,
  ko: ko,
} as const;

type LocaleKey = keyof typeof locales;

/**
 * 日付をフォーマットする
 */
export function formatDate(
  date: Date | string | number,
  formatStr = 'yyyy-MM-dd',
  localeKey: LocaleKey = 'ja'
): string {
  try {
    const d =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date;
    if (!isValid(d)) {
      return '';
    }
    return format(d, formatStr, { locale: locales[localeKey] });
  } catch (error) {
    console.error('Date formatting error:', error);
    return '';
  }
}

/**
 * 文字列を日付に変換する
 */
export function parseDate(
  dateString: string,
  formatStr = 'yyyy-MM-dd',
  localeKey: LocaleKey = 'ja'
): Date | null {
  try {
    const date = parse(dateString, formatStr, new Date(), {
      locale: locales[localeKey],
    });
    return isValid(date) ? date : null;
  } catch (error) {
    console.error('Date parsing error:', error);
    return null;
  }
}

/**
 * 相対時間を取得する（3時間前、明日など）
 */
export function getRelativeTime(
  date: Date | string | number,
  baseDate: Date = new Date(),
  localeKey: LocaleKey = 'ja'
): string {
  try {
    const d =
      typeof date === 'string' || typeof date === 'number'
        ? new Date(date)
        : date;
    if (!isValid(d)) {
      return '';
    }

    // 今日、明日、昨日のチェック
    if (isToday(d)) {
      return localeKey === 'ja' ? '今日' : 'Today';
    }
    if (isTomorrow(d)) {
      return localeKey === 'ja' ? '明日' : 'Tomorrow';
    }
    if (isYesterday(d)) {
      return localeKey === 'ja' ? '昨日' : 'Yesterday';
    }

    // 時間差を計算
    const minutesDiff = Math.abs(differenceInMinutes(d, baseDate));
    const hoursDiff = Math.abs(differenceInHours(d, baseDate));
    const daysDiff = Math.abs(differenceInDays(d, baseDate));

    const isPastDate = isPast(d);
    const suffix =
      localeKey === 'ja'
        ? isPastDate
          ? '前'
          : '後'
        : isPastDate
          ? ' ago'
          : ' later';

    // 相対時間の文字列を生成
    if (minutesDiff < 60) {
      const unit =
        localeKey === 'ja' ? '分' : minutesDiff === 1 ? ' minute' : ' minutes';
      return localeKey === 'ja'
        ? `${minutesDiff}${unit}${suffix}`
        : `${minutesDiff}${unit}${suffix}`;
    }

    if (hoursDiff < 24) {
      const unit =
        localeKey === 'ja' ? '時間' : hoursDiff === 1 ? ' hour' : ' hours';
      return localeKey === 'ja'
        ? `${hoursDiff}${unit}${suffix}`
        : `${hoursDiff}${unit}${suffix}`;
    }

    if (daysDiff < 30) {
      const unit =
        localeKey === 'ja' ? '日' : daysDiff === 1 ? ' day' : ' days';
      return localeKey === 'ja'
        ? `${daysDiff}${unit}${suffix}`
        : `${daysDiff}${unit}${suffix}`;
    }

    // 30日以上の場合は通常の日付表示
    return formatDate(d, 'yyyy/MM/dd', localeKey);
  } catch (error) {
    console.error('Relative time calculation error:', error);
    return '';
  }
}

/**
 * 日付に日数を加算する
 */
export function addDaysToDate(
  date: Date | string | number,
  days: number
): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return addDays(d, days);
}

/**
 * 日付から日数を減算する
 */
export function subtractDaysFromDate(
  date: Date | string | number,
  days: number
): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return subDays(d, days);
}

/**
 * 日付が過去かどうかを判定
 */
export function isDateInPast(date: Date | string | number): boolean {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return isPast(d);
}

/**
 * 日付が未来かどうかを判定
 */
export function isDateInFuture(date: Date | string | number): boolean {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return isFuture(d);
}

/**
 * 時刻文字列をフォーマット（HH:mm形式）
 */
export function formatTime(
  date: Date | string | number,
  use24Hour = true
): string {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return formatDate(d, use24Hour ? 'HH:mm' : 'h:mm a');
}

/**
 * 日付と時刻を結合
 */
export function combineDateAndTime(date: Date, timeString: string): Date {
  const [hours, minutes] = timeString.split(':').map(Number);
  const combined = new Date(date);
  combined.setHours(hours, minutes, 0, 0);
  return combined;
}

/**
 * 期間の日数を計算
 */
export function getDaysBetween(
  startDate: Date | string | number,
  endDate: Date | string | number
): number {
  const start =
    typeof startDate === 'string' || typeof startDate === 'number'
      ? new Date(startDate)
      : startDate;
  const end =
    typeof endDate === 'string' || typeof endDate === 'number'
      ? new Date(endDate)
      : endDate;
  return differenceInDays(end, start);
}

/**
 * 週の開始日を取得
 */
export function getStartOfWeek(
  date: Date | string | number,
  weekStartsOn: 0 | 1 = 1
): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return startOfWeek(d, { weekStartsOn });
}

/**
 * 週の終了日を取得
 */
export function getEndOfWeek(
  date: Date | string | number,
  weekStartsOn: 0 | 1 = 1
): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return endOfWeek(d, { weekStartsOn });
}

/**
 * 月の開始日を取得
 */
export function getStartOfMonth(date: Date | string | number): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return startOfMonth(d);
}

/**
 * 月の終了日を取得
 */
export function getEndOfMonth(date: Date | string | number): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return endOfMonth(d);
}

/**
 * 日の開始時刻を取得
 */
export function getStartOfDay(date: Date | string | number): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return startOfDay(d);
}

/**
 * 日の終了時刻を取得
 */
export function getEndOfDay(date: Date | string | number): Date {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return endOfDay(d);
}

/**
 * 日付が同じ日かどうかを判定
 */
export function isSameDay(
  date1: Date | string | number,
  date2: Date | string | number
): boolean {
  const d1 =
    typeof date1 === 'string' || typeof date1 === 'number'
      ? new Date(date1)
      : date1;
  const d2 =
    typeof date2 === 'string' || typeof date2 === 'number'
      ? new Date(date2)
      : date2;
  return d1.toDateString() === d2.toDateString();
}

/**
 * ISO文字列を日付に変換
 */
export function parseISODate(isoString: string): Date | null {
  try {
    const date = new Date(isoString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

/**
 * 日付をISO文字列に変換
 */
export function toISODateString(date: Date | string | number): string {
  const d =
    typeof date === 'string' || typeof date === 'number'
      ? new Date(date)
      : date;
  return d.toISOString();
}
