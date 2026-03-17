/**
 * RippleEffect Component
 * Animated ripple effect using React Native Reanimated
 */

import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface RippleEffectProps {
  trigger: boolean;
  color?: string;
  duration?: number;
  size?: number;
  x?: number;
  y?: number;
}

/**
 * Ripple effect animation component
 */
export const RippleEffect: React.FC<RippleEffectProps> = ({
  trigger,
  color = '#4ECDC4',
  duration = 600,
  size = 200,
  x = 0,
  y = 0,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => {
    const interpolatedScale = interpolate(
      scale.value,
      [0, 1],
      [0, 2],
      Extrapolate.CLAMP
    );

    return {
      transform: [{ scale: interpolatedScale }],
      opacity: opacity.value,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      position: 'absolute',
      left: x - size / 2,
      top: y - size / 2,
    };
  });

  useEffect(() => {
    if (trigger) {
      scale.value = 0;
      opacity.value = 0.8;

      scale.value = withTiming(1, { duration });
      opacity.value = withTiming(0, { duration });
    } else {
      scale.value = withTiming(0, { duration: 100 });
      opacity.value = withTiming(0, { duration: 100 });
    }
  }, [trigger, duration, scale, opacity]);

  return (
    <Animated.View
      style={[styles.ripple, animatedStyle]}
      pointerEvents="none"
    />
  );
};

const styles = StyleSheet.create({
  ripple: {
    position: 'absolute',
  },
});

export default RippleEffect;
