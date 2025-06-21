import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { ProtocolCard } from '../components/breathing/ProtocolCard';
import { breathingProtocols } from '../data/breathingProtocols';

interface ProtocolSelectionScreenProps {
  navigation: any;
}

export const ProtocolSelectionScreen: React.FC<ProtocolSelectionScreenProps> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  const filteredProtocols = selectedDifficulty === 'all' 
    ? breathingProtocols 
    : breathingProtocols.filter(protocol => protocol.difficulty === selectedDifficulty);

  const handleProtocolSelect = (protocol: any) => {
    navigation.navigate('BreathingSession', { protocol });
  };

  const handleProfile = () => {
    navigation.navigate('Profile');
  };

  const handleAnalytics = () => {
    navigation.navigate('Analytics');
  };

  const difficultyButtons = [
    { key: 'all', label: 'All' },
    { key: 'beginner', label: 'Beginner' },
    { key: 'intermediate', label: 'Intermediate' },
    { key: 'advanced', label: 'Advanced' },
  ];

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
          <View style={styles.headerTop}>
            <View>
              <Text style={[styles.greeting, { color: theme.colors.textSecondary }]}>
                Welcome back,
              </Text>
              <Text style={[styles.userName, { color: theme.colors.text }]}>
                {user?.firstName || 'Practitioner'}
              </Text>
            </View>
            <View style={styles.headerButtons}>
              <Button
                title="Analytics"
                onPress={handleAnalytics}
                variant="outline"
                size="small"
                style={styles.headerButton}
              />
              <Button
                title="Profile"
                onPress={handleProfile}
                variant="outline"
                size="small"
                style={styles.headerButton}
              />
            </View>
          </View>

          <Text style={[styles.title, { color: theme.colors.text }]}>
            Choose Your{' '}
            <Text style={{ color: theme.colors.primary }}>Protocol</Text>
          </Text>
          <Text style={[styles.subtitle, { color: theme.colors.textSecondary }]}>
            Select a breathing pattern that matches your current needs
          </Text>
        </View>

        {/* Difficulty Filter */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {difficultyButtons.map((button) => (
              <Button
                key={button.key}
                title={button.label}
                onPress={() => setSelectedDifficulty(button.key as any)}
                variant={selectedDifficulty === button.key ? 'primary' : 'outline'}
                size="small"
                style={[
                  styles.filterButton,
                  selectedDifficulty === button.key && { backgroundColor: theme.colors.primary }
                ]}
              />
            ))}
          </ScrollView>
        </View>

        {/* Protocol Grid */}
        <View style={styles.protocolsContainer}>
          {filteredProtocols.map((protocol, index) => (
            <ProtocolCard
              key={protocol.id}
              protocol={protocol}
              onPress={() => handleProtocolSelect(protocol)}
              index={index}
            />
          ))}
        </View>

        {/* Quick Start Section */}
        <View style={styles.quickStartSection}>
          <Text style={[styles.quickStartTitle, { color: theme.colors.text }]}>
            Quick Start
          </Text>
          <Text style={[styles.quickStartSubtitle, { color: theme.colors.textSecondary }]}>
            Not sure which protocol to choose? Try our recommended starter
          </Text>
          <Button
            title="Start Foundation Protocol"
            onPress={() => handleProtocolSelect(breathingProtocols[0])}
            gradient
            size="large"
            style={styles.quickStartButton}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  headerButton: {
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterScroll: {
    paddingVertical: 4,
  },
  filterButton: {
    marginRight: 12,
    paddingHorizontal: 16,
  },
  protocolsContainer: {
    marginBottom: 32,
  },
  quickStartSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  quickStartTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  quickStartSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  quickStartButton: {
    minWidth: 200,
  },
});