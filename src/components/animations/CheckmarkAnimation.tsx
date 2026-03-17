/**
 * CheckmarkAnimation Component
 * Animated checkmark using React Native Reanimated
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

interface CheckmarkAnimationProps {
  isCompleted: boolean;
  onComplete?: () => void;
  size?: number;
  color?: string;
  strokeWidth?: number;
  duration?: number;
}

/**
 * Animated checkmark component
 */
export const CheckmarkAnimation: React.FC<CheckmarkAnimationProps> = ({
  isCompleted,
  onComplete,
  size = 24,
  color = '#4ECDC4',
  strokeWidth = 2,
  duration = 300,
}) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    width: size * 0.8,
    height: size * 0.6,
    borderBottomWidth: strokeWidth,
    borderRightWidth: strokeWidth,
    borderColor: color,
    transform: [
      { rotate: '45deg' },
      { scaleX: progress.value },
      { scaleY: progress.value },
    ],
  }));

  useEffect(() => {
    if (isCompleted) {
      opacity.value = withTiming(1, { duration: 100 });
      scale.value = withTiming(1, {
        duration,
        easing: Easing.bezier(0.25, 0.46, 0.45, 0.94),
      });
      progress.value = withTiming(
        1,
        {
          duration,
          easing: Easing.out(Easing.cubic),
        },
        (finished) => {
          'worklet';
          if (finished && onComplete) {
            runOnJS(onComplete)();
          }
        }
      );
    } else {
      opacity.value = withTiming(0, { duration: 100 });
      scale.value = withTiming(0, { duration: 100 });
      progress.value = withTiming(0, { duration: 100 });
    }
  }, [isCompleted, duration, onComplete, opacity, scale, progress]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Animated.View style={[styles.checkContainer, animatedContainerStyle]}>
        <Animated.View style={animatedCheckStyle} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CheckmarkAnimation;
