import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated';
import { BlurView } from 'expo-blur';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';

const { width, height } = Dimensions.get('window');

interface WelcomeScreenProps {
  navigation: any;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();

  // Animation values
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const titleY = useSharedValue(50);
  const titleOpacity = useSharedValue(0);
  const subtitleY = useSharedValue(30);
  const subtitleOpacity = useSharedValue(0);
  const buttonsY = useSharedValue(40);
  const buttonsOpacity = useSharedValue(0);

  useEffect(() => {
    // Entrance animations
    logoScale.value = withTiming(1, { duration: 800 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    
    titleY.value = withDelay(300, withTiming(0, { duration: 600 }));
    titleOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    
    subtitleY.value = withDelay(600, withTiming(0, { duration: 600 }));
    subtitleOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    
    buttonsY.value = withDelay(900, withTiming(0, { duration: 600 }));
    buttonsOpacity.value = withDelay(900, withTiming(1, { duration: 600 }));

    // Breathing animation for logo
    const breathingAnimation = () => {
      logoScale.value = withSequence(
        withTiming(1.1, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      );
      setTimeout(breathingAnimation, 4000);
    };
    
    setTimeout(breathingAnimation, 2000);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: titleY.value }],
    opacity: titleOpacity.value,
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: subtitleY.value }],
    opacity: subtitleOpacity.value,
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: buttonsY.value }],
    opacity: buttonsOpacity.value,
  }));

  const handleGetStarted = () => {
    if (user) {
      navigation.navigate('ProtocolSelection');
    } else {
      navigation.navigate('Auth');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background gradient */}
      <LinearGradient
        colors={isDark 
          ? ['#0A0A0F', '#1A1A2E', '#16213E'] 
          : ['#FFFFFF', '#F8F9FA', '#E3F2FD']
        }
        style={StyleSheet.absoluteFill}
      />

      {/* Floating orbs for visual appeal */}
      <View style={styles.orbContainer}>
        <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={[styles.orb, styles.orb1]} />
        <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={[styles.orb, styles.orb2]} />
        <BlurView intensity={60} tint={isDark ? 'dark' : 'light'} style={[styles.orb, styles.orb3]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Logo */}
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <LinearGradient
            colors={['#0066FF', '#00D4AA', '#8B5CF6']}
            style={styles.logo}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.logoText}>HB</Text>
          </LinearGradient>
        </Animated.View>

        {/* Title */}
        <Animated.View style={titleAnimatedStyle}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            HoloBreathe
          </Text>
          <LinearGradient
            colors={['#0066FF', '#00D4AA']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.titleUnderline}
          />
        </Animated.View>

        {/* Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Transform your mind with guided breathing exercises
          </Text>
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            Discover inner peace, reduce stress, and enhance focus through 
            scientifically-proven breathing techniques.
          </Text>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={[styles.buttonContainer, buttonsAnimatedStyle]}>
          <Button
            title={user ? "Continue Practice" : "Get Started"}
            onPress={handleGetStarted}
            variant="primary"
            size="large"
            gradient={true}
            style={styles.primaryButton}
          />
          
          {!user && (
            <Button
              title="Already have an account? Sign In"
              onPress={() => navigation.navigate('Auth')}
              variant="ghost"
              size="medium"
              style={styles.secondaryButton}
            />
          )}
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.colors.textSecondary }]}>
          Made in India with ♥
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  orbContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  orb: {
    position: 'absolute',
    borderRadius: 100,
  },
  orb1: {
    width: 200,
    height: 200,
    top: height * 0.1,
    right: -100,
    backgroundColor: 'rgba(0, 102, 255, 0.1)',
  },
  orb2: {
    width: 150,
    height: 150,
    bottom: height * 0.2,
    left: -75,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
  },
  orb3: {
    width: 120,
    height: 120,
    top: height * 0.3,
    left: width * 0.7,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0066FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FFFFFF',
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  titleUnderline: {
    height: 4,
    borderRadius: 2,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 28,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 48,
  },
  primaryButton: {
    marginBottom: 24,
  },
  trialButton: {
    marginBottom: 32,
    borderColor: '#00D4FF',
    borderWidth: 2,
  },
  secondaryButton: {
    marginTop: 8,
  },
  footer: {
    paddingBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '500',
  },
});