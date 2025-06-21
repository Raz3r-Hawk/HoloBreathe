import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../contexts/ThemeContext';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  blur?: boolean;
  glassmorphism?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  style, 
  blur = false, 
  glassmorphism = false 
}) => {
  const { theme, isDark } = useTheme();

  const getCardStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.lg,
      padding: theme.spacing.lg,
    };

    if (glassmorphism) {
      return {
        ...baseStyle,
        backgroundColor: isDark 
          ? 'rgba(255, 255, 255, 0.05)' 
          : 'rgba(255, 255, 255, 0.8)',
        borderWidth: 1,
        borderColor: isDark 
          ? 'rgba(255, 255, 255, 0.1)' 
          : 'rgba(0, 0, 0, 0.1)',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: theme.colors.surface,
      shadowColor: isDark ? '#000000' : '#000000',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
      elevation: 8,
    };
  };

  if (blur) {
    return (
      <BlurView
        intensity={isDark ? 80 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={[getCardStyle(), style]}
      >
        {children}
      </BlurView>
    );
  }

  return (
    <View style={[getCardStyle(), style]}>
      {children}
    </View>
  );
};