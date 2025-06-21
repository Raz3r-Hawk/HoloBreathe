import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/Button';

interface PrivacyPolicyScreenProps {
  navigation: any;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ navigation }) => {
  const { theme, isDark } = useTheme();

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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.colors.text }]}>
            Privacy Policy
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Last updated: June 21, 2025
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Information We Collect
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              We collect information you provide directly to us, such as when you create an account, use our breathing exercises, or contact us for support. This includes your name, email address, and breathing session data.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              How We Use Your Information
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              We use the information we collect to provide, maintain, and improve our services, including personalizing your breathing experience and tracking your progress.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Information Sharing
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this privacy policy.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Data Security
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Your Rights
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              You have the right to access, update, or delete your personal information. You can also request a copy of your data or ask us to stop processing it.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Contact Us
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              If you have any questions about this Privacy Policy, please contact us at contact@geeksgrow.com
            </Text>
          </View>
        </View>

        {/* Back Button */}
        <Button
          title="Back"
          onPress={() => navigation.goBack()}
          variant="outline"
          size="large"
          style={styles.backButton}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    marginBottom: 32,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify',
  },
  backButton: {
    alignSelf: 'center',
    minWidth: 120,
  },
});