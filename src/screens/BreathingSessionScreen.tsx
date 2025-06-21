import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, StatusBar, Alert, BackHandler } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { BreathingCircle } from '../components/breathing/BreathingCircle';
import { BreathingService } from '../services/breathingService';
import { BreathingProtocol } from '../types';

interface BreathingSessionScreenProps {
  navigation: any;
  route: {
    params: {
      protocol: BreathingProtocol;
    };
  };
}

export const BreathingSessionScreen: React.FC<BreathingSessionScreenProps> = ({ navigation, route }) => {
  const { theme, isDark } = useTheme();
  const { user } = useAuth();
  const { protocol } = route.params;

  const [sessionState, setSessionState] = useState({
    isActive: false,
    isPaused: false,
    currentPhaseIndex: 0,
    timeLeft: protocol.pattern[0],
    cycles: 0,
    sessionTimeElapsed: 0,
    isCompleted: false,
  });

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const sessionRef = useRef<string | null>(null);
  const startTimeRef = useRef<Date | null>(null);

  useEffect(() => {
    // Handle back button
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (sessionState.isActive && !sessionState.isPaused) {
      intervalRef.current = setInterval(() => {
        setSessionState(prev => {
          const newTimeLeft = prev.timeLeft - 1;
          const newSessionTime = prev.sessionTimeElapsed + 1;

          if (newTimeLeft <= 0) {
            // Move to next phase
            const nextPhaseIndex = (prev.currentPhaseIndex + 1) % protocol.pattern.length;
            const newCycles = nextPhaseIndex === 0 ? prev.cycles + 1 : prev.cycles;
            
            // Haptic feedback on phase change
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

            // Check if session is complete
            const isCompleted = newSessionTime >= protocol.sessionDuration;
            
            if (isCompleted) {
              return {
                ...prev,
                isActive: false,
                isCompleted: true,
                sessionTimeElapsed: newSessionTime,
                cycles: newCycles,
              };
            }

            return {
              ...prev,
              currentPhaseIndex: nextPhaseIndex,
              timeLeft: protocol.pattern[nextPhaseIndex],
              cycles: newCycles,
              sessionTimeElapsed: newSessionTime,
            };
          }

          return {
            ...prev,
            timeLeft: newTimeLeft,
            sessionTimeElapsed: newSessionTime,
          };
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionState.isActive, sessionState.isPaused, protocol]);

  useEffect(() => {
    if (sessionState.isCompleted) {
      handleSessionComplete();
    }
  }, [sessionState.isCompleted]);

  const handleBackPress = () => {
    if (sessionState.isActive) {
      Alert.alert(
        'End Session',
        'Are you sure you want to end this breathing session?',
        [
          { text: 'Continue', style: 'cancel' },
          { text: 'End Session', style: 'destructive', onPress: handleEndSession },
        ]
      );
      return true;
    }
    return false;
  };

  const startSession = async () => {
    try {
      startTimeRef.current = new Date();
      
      // Create session record if user is logged in
      if (user) {
        const sessionData = {
          userId: user.id,
          protocolId: protocol.id,
          protocolName: protocol.name,
          duration: protocol.sessionDuration,
          completedDuration: 0,
          cycles: 0,
          completed: false,
          startTime: startTimeRef.current.toISOString(),
        };
        
        const session = await BreathingService.createSession(sessionData);
        sessionRef.current = session.id;
      }

      setSessionState(prev => ({
        ...prev,
        isActive: true,
        isPaused: false,
      }));

      // Haptic feedback
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
      console.error('Failed to start session:', error);
      // Continue without session tracking for trial users
      setSessionState(prev => ({
        ...prev,
        isActive: true,
        isPaused: false,
      }));
    }
  };

  const pauseSession = () => {
    setSessionState(prev => ({
      ...prev,
      isPaused: !prev.isPaused,
    }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleEndSession = async () => {
    try {
      if (sessionRef.current && user) {
        await BreathingService.updateSession(sessionRef.current, {
          completedDuration: sessionState.sessionTimeElapsed,
          cycles: sessionState.cycles,
          completed: false,
          endTime: new Date().toISOString(),
        });
      }
    } catch (error) {
      console.error('Failed to update session:', error);
    }

    // Reset session state
    setSessionState({
      isActive: false,
      isPaused: false,
      currentPhaseIndex: 0,
      timeLeft: protocol.pattern[0],
      cycles: 0,
      sessionTimeElapsed: 0,
      isCompleted: false,
    });

    // Navigate back
    navigation.goBack();
  };

  const handleSessionComplete = async () => {
    try {
      if (sessionRef.current && user) {
        await BreathingService.updateSession(sessionRef.current, {
          completedDuration: sessionState.sessionTimeElapsed,
          cycles: sessionState.cycles,
          completed: true,
          endTime: new Date().toISOString(),
        });
      }

      // Haptic feedback
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      // Show completion alert
      Alert.alert(
        'Session Complete!',
        `Congratulations! You completed ${sessionState.cycles} breathing cycles in ${Math.floor(sessionState.sessionTimeElapsed / 60)} minutes.`,
        [
          { text: 'Continue', onPress: () => navigation.goBack() }
        ]
      );
    } catch (error) {
      console.error('Failed to complete session:', error);
      navigation.goBack();
    }
  };

  const currentPhase = protocol.phases[sessionState.currentPhaseIndex];
  const progress = sessionState.sessionTimeElapsed / protocol.sessionDuration;
  const remainingTime = protocol.sessionDuration - sessionState.sessionTimeElapsed;
  const remainingMinutes = Math.floor(remainingTime / 60);
  const remainingSeconds = remainingTime % 60;

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      {/* Background gradient */}
      <LinearGradient
        colors={[
          `${protocol.color}15`,
          theme.colors.background,
          theme.colors.background,
        ]}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.protocolName, { color: theme.colors.text }]}>
            {protocol.name}
          </Text>
          <Text style={[styles.protocolBenefit, { color: protocol.color }]}>
            {protocol.benefit}
          </Text>
        </View>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { backgroundColor: theme.colors.border }]}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: protocol.color,
                  width: `${progress * 100}%` 
                }
              ]} 
            />
          </View>
          <Text style={[styles.timeRemaining, { color: theme.colors.textSecondary }]}>
            {remainingMinutes}:{remainingSeconds.toString().padStart(2, '0')} remaining
          </Text>
        </View>

        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <BreathingCircle
            currentPhase={currentPhase}
            timeLeft={sessionState.timeLeft}
            phaseDuration={protocol.pattern[sessionState.currentPhaseIndex]}
            isActive={sessionState.isActive && !sessionState.isPaused}
            protocolColor={protocol.color}
          />
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {sessionState.cycles}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Cycles
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: theme.colors.text }]}>
              {Math.floor(sessionState.sessionTimeElapsed / 60)}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Minutes
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: protocol.color }]}>
              {currentPhase}
            </Text>
            <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
              Phase
            </Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controls}>
          {!sessionState.isActive ? (
            <Button
              title="Start Session"
              onPress={startSession}
              gradient
              size="large"
              style={styles.controlButton}
            />
          ) : (
            <View style={styles.activeControls}>
              <Button
                title={sessionState.isPaused ? 'Resume' : 'Pause'}
                onPress={pauseSession}
                variant="outline"
                size="large"
                style={styles.pauseButton}
              />
              <Button
                title="End Session"
                onPress={handleEndSession}
                variant="outline"
                size="large"
                style={styles.endButton}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  protocolName: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 4,
  },
  protocolBenefit: {
    fontSize: 16,
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 40,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeRemaining: {
    fontSize: 14,
    textAlign: 'center',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 32,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
  controls: {
    alignItems: 'center',
  },
  controlButton: {
    minWidth: 200,
  },
  activeControls: {
    flexDirection: 'row',
    gap: 16,
  },
  pauseButton: {
    flex: 1,
  },
  endButton: {
    flex: 1,
  },
});