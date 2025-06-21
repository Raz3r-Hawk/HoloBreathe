import React from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from '../components/ui/Button';

interface AboutScreenProps {
  navigation: any;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ navigation }) => {
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
            About HoloBreathe
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Transform your mind with guided breathing
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Our Mission
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              HoloBreathe is designed to help you discover inner peace, reduce stress, and enhance focus through scientifically-proven breathing techniques. Our app combines ancient wisdom with modern technology to provide a personalized wellness experience.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Features
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              • 7 breathing protocols with different benefits{'\n'}
              • Beautiful animated breathing guides{'\n'}
              • Session tracking and analytics{'\n'}
              • Adaptive light and dark themes{'\n'}
              • Progress monitoring and streak tracking{'\n'}
              • Personalized recommendations
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Developed By
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              Mr. Varun Mukesh Bhambhani{'\n'}
              GeeksGrow Technologies{'\n'}
              Made in India with ♥
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Contact
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              For support, feedback, or inquiries:{'\n'}
              Email: contact@geeksgrow.com{'\n'}
              Website: www.geeksgrow.com
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
              Version
            </Text>
            <Text style={[styles.sectionText, { color: theme.colors.textSecondary }]}>
              HoloBreathe v1.0.0{'\n'}
              Released: June 2025{'\n'}
              Platform: iOS & Android
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
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
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
  },
  backButton: {
    alignSelf: 'center',
    minWidth: 120,
  },
});