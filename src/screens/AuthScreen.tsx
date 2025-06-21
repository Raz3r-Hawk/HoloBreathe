import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface AuthScreenProps {
  navigation: any;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { signIn, signUp, loading } = useAuth();
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (isLogin) {
        await signIn(formData.email, formData.password);
        navigation.navigate('ProtocolSelection');
      } else {
        await signUp(formData.email, formData.password, {
          firstName: formData.firstName,
          lastName: formData.lastName,
        });
        Alert.alert('Success', 'Account created successfully! Please check your email to verify your account.');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background gradient */}
      <LinearGradient
        colors={isDark 
          ? ['#0A0A0F', '#1A1A2E', '#16213E'] 
          : ['#FFFFFF', '#F8F9FA', '#E3F2FD']
        }
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            {isLogin 
              ? 'Sign in to continue your breathing journey' 
              : 'Join thousands on their wellness journey'
            }
          </Text>
        </View>

        {/* Form */}
        <Card glassmorphism style={styles.formCard}>
          {!isLogin && (
            <>
              <Input
                label="First Name"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChangeText={(value) => updateFormData('firstName', value)}
                error={errors.firstName}
                style={styles.input}
              />
              <Input
                label="Last Name"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChangeText={(value) => updateFormData('lastName', value)}
                error={errors.lastName}
                style={styles.input}
              />
            </>
          )}

          <Input
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChangeText={(value) => updateFormData('email', value)}
            error={errors.email}
            style={styles.input}
          />

          <Input
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChangeText={(value) => updateFormData('password', value)}
            secureTextEntry
            error={errors.password}
            style={styles.input}
          />

          {!isLogin && (
            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData('confirmPassword', value)}
              secureTextEntry
              error={errors.confirmPassword}
              style={styles.input}
            />
          )}

          <Button
            title={isLogin ? 'Sign In' : 'Create Account'}
            onPress={handleSubmit}
            disabled={loading}
            gradient
            size="large"
            style={styles.submitButton}
          />

          <Button
            title={isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
            onPress={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setFormData({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                confirmPassword: '',
              });
            }}
            variant="ghost"
            style={styles.toggleButton}
          />
        </Card>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  formCard: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
    marginBottom: 16,
  },
  toggleButton: {
    marginTop: 8,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});