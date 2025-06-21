import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  multiline?: boolean;
  numberOfLines?: number;
}

export const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  style,
  inputStyle,
  multiline = false,
  numberOfLines = 1,
}) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const getInputContainerStyle = (): ViewStyle => ({
    borderWidth: 2,
    borderColor: error 
      ? theme.colors.error 
      : isFocused 
        ? theme.colors.primary 
        : theme.colors.border,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  });

  const getInputStyle = (): TextStyle => ({
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.text,
    minHeight: multiline ? numberOfLines * 20 : undefined,
  });

  const getLabelStyle = (): TextStyle => ({
    fontSize: theme.typography.caption.fontSize,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  });

  const getErrorStyle = (): TextStyle => ({
    fontSize: theme.typography.caption.fontSize,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  });

  return (
    <View style={style}>
      {label && <Text style={getLabelStyle()}>{label}</Text>}
      <View style={getInputContainerStyle()}>
        <TextInput
          style={[getInputStyle(), inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          multiline={multiline}
          numberOfLines={numberOfLines}
        />
      </View>
      {error && <Text style={getErrorStyle()}>{error}</Text>}
    </View>
  );
};