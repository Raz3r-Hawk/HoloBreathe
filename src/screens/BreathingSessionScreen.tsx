import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Animated,
  Platform,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../App';

type BreathingSessionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BreathingSession'>;
type BreathingSessionScreenRouteProp = RouteProp<RootStackParamList, 'BreathingSession'>;

const BreathingSessionScreen = () => {
  const navigation = useNavigation<BreathingSessionScreenNavigationProp>();
  const route = useRoute<BreathingSessionScreenRouteProp>();
  const {protocol} = route.params;

  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(protocol.pattern[0]);
  const [isActive, setIsActive] = useState(false);
  const [cycles, setCycles] = useState(0);

  const animatedValue = useRef(new Animated.Value(1)).current;
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handlePhaseComplete();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);

  const handlePhaseComplete = () => {
    const nextPhase = (currentPhase + 1) % protocol.pattern.length;
    
    if (nextPhase === 0) {
      setCycles(prev => prev + 1);
    }

    setCurrentPhase(nextPhase);
    setTimeLeft(protocol.pattern[nextPhase]);
  };

  const startSession = () => {
    setIsActive(true);
    startBreathingAnimation();
  };

  const pauseSession = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const endSession = () => {
    setIsActive(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    navigation.goBack();
  };

  const startBreathingAnimation = () => {
    const duration = protocol.pattern[currentPhase] * 1000;
    const toValue = currentPhase === 0 || currentPhase === 2 ? 1.5 : 1;

    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  const getPhaseColors = () => {
    switch (protocol.color) {
      case 'cyan': return ['#00ffff', '#0080ff'];
      case 'purple': return ['#8000ff', '#ff00ff'];
      case 'green': return ['#00ff80', '#00ffff'];
      case 'orange': return ['#ff8000', '#ff0080'];
      default: return ['#00ffff', '#0080ff'];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000000', '#1a1a2e', '#16213e']} style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.protocolName}>{protocol.name}</Text>
          <Text style={styles.currentPhase}>{protocol.phases[currentPhase]}</Text>
        </View>

        {/* Breathing Circle */}
        <View style={styles.circleContainer}>
          <Animated.View 
            style={[
              styles.breathingCircle,
              {transform: [{scale: animatedValue}]}
            ]}>
            <LinearGradient 
              colors={getPhaseColors()} 
              style={styles.circleGradient}>
              <Text style={styles.timeDisplay}>{timeLeft}</Text>
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Cycles</Text>
            <Text style={styles.statValue}>{cycles}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Phase</Text>
            <Text style={styles.statValue}>{currentPhase + 1}/4</Text>
          </View>
        </View>

        {/* Controls */}
        <View style={styles.controlsContainer}>
          {!isActive ? (
            <TouchableOpacity style={styles.startButton} onPress={startSession}>
              <LinearGradient colors={['#00ffff', '#0080ff']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Start</Text>
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.pauseButton} onPress={pauseSession}>
              <LinearGradient colors={['#ff8000', '#ff0080']} style={styles.buttonGradient}>
                <Text style={styles.buttonText}>Pause</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.endButton} onPress={endSession}>
            <LinearGradient colors={['#ff0040', '#8000ff']} style={styles.buttonGradient}>
              <Text style={styles.buttonText}>End</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 20,
  },
  protocolName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  currentPhase: {
    fontSize: 20,
    color: '#ffffff80',
    textAlign: 'center',
  },
  circleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breathingCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 20,
      },
      ios: {
        shadowColor: '#00ffff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 30,
      },
    }),
  },
  circleGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDisplay: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 16,
    color: '#ffffff60',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingBottom: 40,
  },
  startButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  pauseButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  endButton: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default BreathingSessionScreen;