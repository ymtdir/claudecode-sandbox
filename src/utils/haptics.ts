/**
 * 振動フィードバックサービス
 * react-native-haptic-feedbackを使用した触覚フィードバック
 */

import HapticFeedback from 'react-native-haptic-feedback';

/**
 * 振動フィードバックのタイプ定義
 */
export const HapticType = {
  // インパクト系
  LIGHT_IMPACT: 'impactLight',
  MEDIUM_IMPACT: 'impactMedium',
  HEAVY_IMPACT: 'impactHeavy',
  RIGID_IMPACT: 'rigid',
  SOFT_IMPACT: 'soft',

  // 通知系
  SUCCESS: 'notificationSuccess',
  WARNING: 'notificationWarning',
  ERROR: 'notificationError',

  // 選択系
  SELECTION: 'selection',
  CLOCK_TICK: 'clockTick',
  KEYBOARD_TAP: 'keyboardTap',
  KEYBOARD_PRESS: 'keyboardPress',
  KEYBOARD_RELEASE: 'keyboardRelease',
} as const;

export type HapticType = (typeof HapticType)[keyof typeof HapticType];

/**
 * 振動フィードバックの設定オプション
 */
interface HapticOptions {
  enableVibrateFallback?: boolean;
  ignoreAndroidSystemSettings?: boolean;
}

/**
 * デフォルトの振動設定
 */
const defaultOptions: HapticOptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false,
};

/**
 * 振動フィードバックサービスクラス
 */
class HapticsService {
  /**
   * タスク完了時の振動フィードバック
   */
  taskComplete(): void {
    try {
      HapticFeedback.trigger(HapticType.SUCCESS, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * タスクスワイプ時の振動フィードバック
   */
  taskSwipe(): void {
    try {
      HapticFeedback.trigger(HapticType.LIGHT_IMPACT, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * エラー時の振動フィードバック
   */
  error(): void {
    try {
      HapticFeedback.trigger(HapticType.ERROR, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * タスク選択時の振動フィードバック
   */
  taskSelect(): void {
    try {
      HapticFeedback.trigger(HapticType.SELECTION, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * タスクドラッグ開始時の振動フィードバック
   */
  dragStart(): void {
    try {
      HapticFeedback.trigger(HapticType.MEDIUM_IMPACT, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * タスクドロップ時の振動フィードバック
   */
  dragEnd(): void {
    try {
      HapticFeedback.trigger(HapticType.SOFT_IMPACT, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * ボタンタップ時の振動フィードバック
   */
  buttonTap(): void {
    try {
      HapticFeedback.trigger(HapticType.KEYBOARD_TAP, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * 警告時の振動フィードバック
   */
  warning(): void {
    try {
      HapticFeedback.trigger(HapticType.WARNING, defaultOptions);
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * カスタム振動フィードバック
   * @param type 振動のタイプ
   * @param options オプション設定
   */
  custom(type: HapticType, options?: HapticOptions): void {
    try {
      HapticFeedback.trigger(type, { ...defaultOptions, ...options });
    } catch (error) {
      console.warn('Haptic feedback not available:', error);
    }
  }

  /**
   * 振動フィードバックが利用可能かチェック
   * @returns 利用可能な場合はtrue
   */
  isAvailable(): boolean {
    return true;
  }

  /**
   * 振動パターンを実行（連続振動）
   * @param pattern 振動パターンの配列
   * @param delay パターン間の遅延（ミリ秒）
   */
  async playPattern(pattern: HapticType[], delay: number = 100): Promise<void> {
    for (const type of pattern) {
      this.custom(type);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  /**
   * 成功パターン（連続振動）
   */
  async successPattern(): Promise<void> {
    await this.playPattern(
      [HapticType.LIGHT_IMPACT, HapticType.MEDIUM_IMPACT, HapticType.SUCCESS],
      150
    );
  }

  /**
   * 失敗パターン（連続振動）
   */
  async failurePattern(): Promise<void> {
    await this.playPattern(
      [HapticType.HEAVY_IMPACT, HapticType.WARNING, HapticType.ERROR],
      200
    );
  }
}

// シングルトンインスタンスをエクスポート
export const hapticFeedback = new HapticsService();

// デフォルトエクスポート
export default hapticFeedback;

// 個別の関数もエクスポート（互換性のため）
export const {
  taskComplete,
  taskSwipe,
  error,
  taskSelect,
  dragStart,
  dragEnd,
  buttonTap,
  warning,
  custom,
  isAvailable,
  playPattern,
  successPattern,
  failurePattern,
} = hapticFeedback;
