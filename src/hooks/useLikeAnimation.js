import { useState, useRef } from 'react';
import { Animated } from 'react-native';

export const useLikeAnimation = () => {
  const [showHeart, setShowHeart] = useState(false);
  const heartAnim = useRef(new Animated.Value(0)).current;

  const animateHeart = () => {
    setShowHeart(true);
    Animated.sequence([
      Animated.spring(heartAnim, {
        toValue: 1,
        useNativeDriver: true,
        speed: 50,
      }),
      Animated.timing(heartAnim, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        delay: 500,
      }),
    ]).start(() => {
      setShowHeart(false);
      heartAnim.setValue(0);
    });
  };

  return {
    showHeart,
    heartAnim,
    animateHeart,
  };
}; 