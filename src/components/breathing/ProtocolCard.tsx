import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useTheme } from '../../contexts/ThemeContext';
import { BreathingProtocol } from '../../types';

interface ProtocolCardProps {
  protocol: BreathingProtocol;
  onPress: () => void;
  index: number;
}

export const ProtocolCard: React.FC<ProtocolCardProps> = ({ protocol, onPress, index }) => {
  const { theme, isDark } = useTheme();

  const getDifficultyColor = () => {
    switch (protocol.difficulty) {
      case 'beginner':
        return theme.colors.success;
      case 'intermediate':
        return theme.colors.warning;
      case 'advanced':
        return theme.colors.error;
      default:
        return theme.colors.primary;
    }
  };

  const getPatternText = () => {
    return protocol.pattern.join('-');
  };

  const getDurationText = () => {
    const minutes = Math.floor(protocol.sessionDuration / 60);
    return `${minutes} min`;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}
    >
      <BlurView
        intensity={isDark ? 80 : 60}
        tint={isDark ? 'dark' : 'light'}
        style={[styles.card, { borderColor: `${protocol.color}40` }]}
      >
        {/* Background gradient */}
        <LinearGradient
          colors={[
            `${protocol.color}15`,
            `${protocol.color}05`,
            'transparent'
          ]}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Content */}
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.colors.text }]}>
                {protocol.name}
              </Text>
              <View style={[styles.difficultyBadge, { backgroundColor: getDifficultyColor() }]}>
                <Text style={styles.difficultyText}>
                  {protocol.difficulty.toUpperCase()}
                </Text>
              </View>
            </View>
            <Text style={[styles.benefit, { color: protocol.color }]}>
              {protocol.benefit}
            </Text>
          </View>

          {/* Pattern and Duration */}
          <View style={styles.infoRow}>
            <View style={styles.patternContainer}>
              <Text style={[styles.patternLabel, { color: theme.colors.textSecondary }]}>
                Pattern
              </Text>
              <Text style={[styles.patternText, { color: protocol.color }]}>
                {getPatternText()}
              </Text>
            </View>
            <View style={styles.durationContainer}>
              <Text style={[styles.durationLabel, { color: theme.colors.textSecondary }]}>
                Duration
              </Text>
              <Text style={[styles.durationText, { color: theme.colors.text }]}>
                {getDurationText()}
              </Text>
            </View>
          </View>

          {/* Description */}
          <Text style={[styles.description, { color: theme.colors.textSecondary }]}>
            {protocol.description}
          </Text>

          {/* Action indicator */}
          <View style={[styles.actionIndicator, { backgroundColor: protocol.color }]}>
            <Text style={styles.actionText}>Start Practice</Text>
          </View>
        </View>
      </BlurView>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  card: {
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    overflow: 'hidden',
  },
  content: {
    zIndex: 1,
  },
  header: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    flex: 1,
  },
  difficultyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  difficultyText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  benefit: {
    fontSize: 16,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  patternContainer: {
    flex: 1,
  },
  patternLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  patternText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  durationContainer: {
    alignItems: 'flex-end',
  },
  durationLabel: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  durationText: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 16,
  },
  actionIndicator: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});