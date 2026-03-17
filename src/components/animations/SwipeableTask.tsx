/**
 * SwipeableTask Component
 * Swipeable task item using React Native Reanimated and Gesture Handler
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = 100;

interface SwipeableTaskProps extends PropsWithChildren {
  onComplete?: () => void;
  onPostpone?: () => void;
  onSwipeStart?: () => void;
  onSwipeEnd?: () => void;
  completeThreshold?: number;
  postponeThreshold?: number;
}

/**
 * Swipeable task component with gesture handling
 */
export const SwipeableTask: React.FC<SwipeableTaskProps> = ({
  children,
  onComplete,
  onPostpone,
  onSwipeStart,
  onSwipeEnd,
  completeThreshold = SWIPE_THRESHOLD,
  postponeThreshold = -SWIPE_THRESHOLD,
}) => {
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const startX = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      'worklet';
      startX.value = translateX.value;
      if (onSwipeStart) {
        runOnJS(onSwipeStart)();
      }
    })
    .onUpdate((event) => {
      'worklet';
      translateX.value = event.translationX;

      // Update opacity based on swipe distance
      const distance = Math.abs(event.translationX);
      opacity.value = interpolate(
        distance,
        [0, SCREEN_WIDTH / 2],
        [1, 0.3],
        Extrapolate.CLAMP
      );
    })
    .onEnd(() => {
      'worklet';
      if (translateX.value > completeThreshold) {
        // Right swipe - complete task
        translateX.value = withSpring(SCREEN_WIDTH, {}, (finished) => {
          'worklet';
          if (finished && onComplete) {
            runOnJS(onComplete)();
          }
        });
        opacity.value = withSpring(0);
      } else if (translateX.value < postponeThreshold) {
        // Left swipe - postpone task
        translateX.value = withSpring(-SCREEN_WIDTH, {}, (finished) => {
          'worklet';
          if (finished && onPostpone) {
            runOnJS(onPostpone)();
          }
        });
        opacity.value = withSpring(0);
      } else {
        // Spring back to original position
        translateX.value = withSpring(0);
        opacity.value = withSpring(1);
      }

      if (onSwipeEnd) {
        runOnJS(onSwipeEnd)();
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value,
  }));

  const leftActionStyle = useAnimatedStyle(() => {
    const actionOpacity = interpolate(
      translateX.value,
      [0, completeThreshold],
      [0, 1],
      Extrapolate.CLAMP
    );
    return {
      opacity: actionOpacity,
    };
  });

  const rightActionStyle = useAnimatedStyle(() => {
    const actionOpacity = interpolate(
      translateX.value,
      [postponeThreshold, 0],
      [1, 0],
      Extrapolate.CLAMP
    );
    return {
      opacity: actionOpacity,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.actionsContainer}>
        <Animated.View style={[styles.leftAction, leftActionStyle]}>
          <Text style={styles.actionText}>Complete</Text>
        </Animated.View>
        <Animated.View style={[styles.rightAction, rightActionStyle]}>
          <Text style={styles.actionText}>Postpone</Text>
        </Animated.View>
      </View>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.taskContainer, animatedStyle]}>
          {children}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  taskContainer: {
    backgroundColor: 'white',
    minHeight: 60,
    justifyContent: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  actionsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftAction: {
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    flex: 1,
  },
  rightAction: {
    backgroundColor: '#FF6B6B',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
    flex: 1,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SwipeableTask;
