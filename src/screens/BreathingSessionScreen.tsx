import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  Animated,
} from 'react-native';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../App';
import {BreathingProtocol, BreathingSessionState} from '../types';

type BreathingSessionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'BreathingSession'
>;

type BreathingSessionScreenRouteProp = RouteProp<
  RootStackParamList,
  'BreathingSession'
>;

const {width, height} = Dimensions.get('window');

const BreathingSessionScreen = () => {
  const navigation = useNavigation<BreathingSessionScreenNavigationProp>();
  const route = useRoute<BreathingSessionScreenRouteProp>();
  const {protocol} = route.params;

  const [sessionState, setSessionState] = useState<BreathingSessionState>({
    isActive: false,
    isPaused: false,
    currentPhase: 0,
    phaseTimeLeft: protocol.pattern[0],
    sessionTimeElapsed: 0,
    cycles: 0,
  });

  const breathingAnimation = useRef(new Animated.Value(0.5)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (sessionState.isActive && !sessionState.isPaused) {
      startTimer();
      startBreathingAnimation();
    } else {
      stopTimer();
      stopBreathingAnimation();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [sessionState.isActive, sessionState.isPaused]);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setSessionState(prevState => {
        const newTimeLeft = prevState.phaseTimeLeft - 1;
        
        if (newTimeLeft <= 0) {
          const nextPhase = (prevState.currentPhase + 1) % protocol.pattern.length;
          const newCycles = nextPhase === 0 ? prevState.cycles + 1 : prevState.cycles;
          
          return {
            ...prevState,
            currentPhase: nextPhase,
            phaseTimeLeft: protocol.pattern[nextPhase],
            sessionTimeElapsed: prevState.sessionTimeElapsed + 1,
            cycles: newCycles,
          };
        }
        
        return {
          ...prevState,
          phaseTimeLeft: newTimeLeft,
          sessionTimeElapsed: prevState.sessionTimeElapsed + 1,
        };
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startBreathingAnimation = () => {
    const animateBreathing = () => {
      const currentPhase = protocol.phases[sessionState.currentPhase];
      const targetValue = currentPhase === 'Inhale' ? 1 : 0.3;
      const duration = protocol.pattern[sessionState.currentPhase] * 1000;

      Animated.timing(breathingAnimation, {
        toValue: targetValue,
        duration: duration,
        useNativeDriver: false,
      }).start(() => {
        if (sessionState.isActive && !sessionState.isPaused) {
          animateBreathing();
        }
      });
    };
    animateBreathing();
  };

  const stopBreathingAnimation = () => {
    breathingAnimation.stopAnimation();
  };

  const toggleSession = () => {
    setSessionState(prevState => ({
      ...prevState,
      isActive: !prevState.isActive,
      isPaused: false,
    }));
  };

  const togglePause = () => {
    setSessionState(prevState => ({
      ...prevState,
      isPaused: !prevState.isPaused,
    }));
  };

  const endSession = () => {
    setSessionState({
      isActive: false,
      isPaused: false,
      currentPhase: 0,
      phaseTimeLeft: protocol.pattern[0],
      sessionTimeElapsed: 0,
      cycles: 0,
    });
    navigation.goBack();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentPhase = protocol.phases[sessionState.currentPhase];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a2e', protocol.color + '20']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.protocolTitle}>{protocol.name}</Text>
          <TouchableOpacity onPress={endSession}>
            <Text style={styles.endButton}>End</Text>
          </TouchableOpacity>
        </View>

        {/* Session Stats */}
        <View style={styles.statsContainer}>
          <Text style={styles.timeElapsed}>
            {formatTime(sessionState.sessionTimeElapsed)}
          </Text>
          <Text style={styles.cyclesCount}>
            Cycles: {sessionState.cycles}
          </Text>
        </View>

        {/* Breathing Circle */}
        <View style={styles.breathingContainer}>
          <Animated.View
            style={[
              styles.breathingCircle,
              {
                transform: [{
                  scale: breathingAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1.2],
                  }),
                }],
                opacity: breathingAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.6, 1],
                }),
              },
            ]}>
            <LinearGradient
              colors={[protocol.color + '40', protocol.color + '80']}
              style={styles.circleGradient}>
              <Text style={styles.phaseText}>{currentPhase}</Text>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Phase Info */}
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>{currentPhase}</Text>
          <Text style={styles.phaseTimer}>
            {sessionState.phaseTimeLeft}
          </Text>
          <Text style={styles.phaseInstruction}>
            {currentPhase === 'Inhale' && 'Breathe in slowly and deeply'}
            {currentPhase === 'Hold' && 'Hold your breath gently'}
            {currentPhase === 'Exhale' && 'Breathe out completely'}
            {currentPhase === 'Rest' && 'Relax and prepare'}
            {currentPhase === 'Pause' && 'Brief pause before continuing'}
            {currentPhase === 'Switch' && 'Quick transition'}
          </Text>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {!sessionState.isActive ? (
            <TouchableOpacity style={styles.startButton} onPress={toggleSession}>
              <LinearGradient
                colors={['#00ffff', '#0080ff']}
                style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Start Session</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <View style={styles.activeControls}>
              <TouchableOpacity style={styles.pauseButton} onPress={togglePause}>
                <Text style={styles.controlButtonText}>
                  {sessionState.isPaused ? 'Resume' : 'Pause'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.stopButton} onPress={toggleSession}>
                <Text style={styles.controlButtonText}>Stop</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    fontSize: 24,
    color: '#ffffff',
  },
  protocolTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  endButton: {
    fontSize: 16,
    color: '#ff6b6b',
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  timeElapsed: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
  },
  cyclesCount: {
    fontSize: 16,
    color: '#ffffff70',
  },
  breathingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40,
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
  },
  circleGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  phaseContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  phaseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  phaseTimer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 12,
  },
  phaseInstruction: {
    fontSize: 16,
    color: '#ffffff80',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  controlsContainer: {
    padding: 20,
  },
  startButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  activeControls: {
    flexDirection: 'row',
    gap: 12,
  },
  pauseButton: {
    flex: 1,
    backgroundColor: '#444',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  stopButton: {
    flex: 1,
    backgroundColor: '#ff6b6b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  controlButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default BreathingSessionScreen;