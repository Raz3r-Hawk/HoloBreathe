import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  gradient?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  gradient = false,
}) => {
  const { theme, isDark } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      ...getSizeStyle(),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: gradient ? 'transparent' : theme.colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: theme.colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontWeight: '600',
      ...getSizeTextStyle(),
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          color: gradient ? '#FFFFFF' : '#FFFFFF',
        };
      case 'secondary':
        return {
          ...baseStyle,
          color: '#FFFFFF',
        };
      case 'outline':
        return {
          ...baseStyle,
          color: theme.colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          color: theme.colors.text,
        };
      default:
        return baseStyle;
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'small':
        return { paddingHorizontal: 16, paddingVertical: 8 };
      case 'medium':
        return { paddingHorizontal: 24, paddingVertical: 12 };
      case 'large':
        return { paddingHorizontal: 32, paddingVertical: 16 };
      default:
        return { paddingHorizontal: 24, paddingVertical: 12 };
    }
  };

  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case 'small':
        return { fontSize: 14 };
      case 'medium':
        return { fontSize: 16 };
      case 'large':
        return { fontSize: 18 };
      default:
        return { fontSize: 16 };
    }
  };

  const buttonStyle = [getButtonStyle(), style];
  const combinedTextStyle = [getTextStyle(), textStyle];

  if (gradient && variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[buttonStyle, { opacity: disabled ? 0.6 : 1 }]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isDark ? ['#0066FF', '#00D4AA'] : ['#0066FF', '#8B5CF6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[StyleSheet.absoluteFill, { borderRadius: theme.borderRadius.md }]}
        />
        <Text style={combinedTextStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, { opacity: disabled ? 0.6 : 1 }]}
      activeOpacity={0.8}
    >
      <Text style={combinedTextStyle}>{title}</Text>
    </TouchableOpacity>
  );
};