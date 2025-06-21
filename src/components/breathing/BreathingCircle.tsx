import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface BreathingCircleProps {
  currentPhase: string;
  timeLeft: number;
  phaseDuration: number;
  isActive: boolean;
  protocolColor: string;
}

const { width: screenWidth } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(screenWidth * 0.7, 300);

export const BreathingCircle: React.FC<BreathingCircleProps> = ({
  currentPhase,
  timeLeft,
  phaseDuration,
  isActive,
  protocolColor,
}) => {
  const { theme, isDark } = useTheme();
  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0.6);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (!isActive) return;

    const progress = 1 - (timeLeft / phaseDuration);
    
    // Different animations for different phases
    switch (currentPhase.toLowerCase()) {
      case 'inhale':
        scale.value = withTiming(1.2, {
          duration: phaseDuration * 1000,
          easing: Easing.out(Easing.cubic),
        });
        opacity.value = withTiming(1, {
          duration: phaseDuration * 1000,
          easing: Easing.out(Easing.cubic),
        });
        break;
      case 'hold':
        scale.value = withTiming(1.2, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        opacity.value = withTiming(0.9, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        break;
      case 'exhale':
        scale.value = withTiming(0.8, {
          duration: phaseDuration * 1000,
          easing: Easing.out(Easing.cubic),
        });
        opacity.value = withTiming(0.6, {
          duration: phaseDuration * 1000,
          easing: Easing.out(Easing.cubic),
        });
        break;
      case 'rest':
        scale.value = withTiming(0.8, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        opacity.value = withTiming(0.4, {
          duration: 300,
          easing: Easing.out(Easing.cubic),
        });
        break;
    }

    // Continuous rotation
    rotation.value = withTiming(rotation.value + 360, {
      duration: phaseDuration * 1000,
      easing: Easing.linear,
    });
  }, [currentPhase, timeLeft, phaseDuration, isActive]);

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
      opacity: opacity.value,
    };
  });

  const animatedInnerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(scale.value, [0.8, 1.2], [1, 0.8]) }],
    };
  });

  const getGradientColors = () => {
    if (isDark) {
      return [protocolColor, `${protocolColor}80`, `${protocolColor}40`];
    }
    return [protocolColor, `${protocolColor}CC`, `${protocolColor}60`];
  };

  return (
    <View style={styles.container}>
      {/* Outer breathing circle */}
      <Animated.View style={[styles.outerCircle, animatedCircleStyle]}>
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradientCircle}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
      </Animated.View>

      {/* Inner content */}
      <Animated.View style={[styles.innerContent, animatedInnerStyle]}>
        <View style={[styles.innerCircle, { backgroundColor: theme.colors.surface }]}>
          <Text style={[styles.phaseText, { color: protocolColor }]}>
            {currentPhase}
          </Text>
          <Text style={[styles.timeText, { color: theme.colors.text }]}>
            {timeLeft}
          </Text>
        </View>
      </Animated.View>

      {/* Decorative rings */}
      <View style={[styles.ring, styles.ring1, { borderColor: `${protocolColor}20` }]} />
      <View style={[styles.ring, styles.ring2, { borderColor: `${protocolColor}10` }]} />
      <View style={[styles.ring, styles.ring3, { borderColor: `${protocolColor}05` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  outerCircle: {
    position: 'absolute',
    width: CIRCLE_SIZE * 0.8,
    height: CIRCLE_SIZE * 0.8,
    borderRadius: CIRCLE_SIZE * 0.4,
  },
  gradientCircle: {
    flex: 1,
    borderRadius: CIRCLE_SIZE * 0.4,
  },
  innerContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerCircle: {
    width: CIRCLE_SIZE * 0.5,
    height: CIRCLE_SIZE * 0.5,
    borderRadius: CIRCLE_SIZE * 0.25,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  phaseText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  timeText: {
    fontSize: 32,
    fontWeight: '300',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1,
    borderRadius: CIRCLE_SIZE * 0.5,
  },
  ring1: {
    width: CIRCLE_SIZE * 0.9,
    height: CIRCLE_SIZE * 0.9,
  },
  ring2: {
    width: CIRCLE_SIZE * 1.0,
    height: CIRCLE_SIZE * 1.0,
  },
  ring3: {
    width: CIRCLE_SIZE * 1.1,
    height: CIRCLE_SIZE * 1.1,
  },
});