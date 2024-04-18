import {useRef} from 'react';
import {Animated, Easing, EasingFunction} from 'react-native';

export interface FadeOptions {
  duration?: number;
  toValue?: number;
  callback?: () => void;
}

export interface PositionOptions {
  initPosition?: number;
  targetPosition?: number;
  duration?: number;
  easing?: EasingFunction;
  callback?: () => void;
}

export const useAnimation = () => {
  const animatedOpacity = useRef(new Animated.Value(0)).current;
  const animatedPosition = useRef(new Animated.Value(0)).current;

  const fadeIn = (options?: FadeOptions) => {
    const {duration = 300, toValue = 1, callback} = options || {};

    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const fadeOut = (options?: FadeOptions) => {
    const {duration = 300, toValue = 0, callback} = options || {};

    Animated.timing(animatedOpacity, {
      toValue: toValue,
      duration: duration,
      useNativeDriver: true,
    }).start(callback);
  };

  const startMovingPosition = (options?: PositionOptions) => {
    const {
      initPosition = 0,
      targetPosition = 0,
      duration = 300,
      easing = Easing.linear,
      callback,
    } = options || {};

    animatedPosition.setValue(initPosition);
    Animated.timing(animatedPosition, {
      toValue: targetPosition,
      duration: duration,
      useNativeDriver: true,
      easing: easing,
    }).start(callback);
  };

  return {
    animatedOpacity,
    animatedPosition,
    fadeIn,
    fadeOut,
    startMovingPosition,
  };
};
