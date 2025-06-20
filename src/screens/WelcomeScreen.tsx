import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: Math.max(24, width * 0.06),
    justifyContent: 'space-between',
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.08,
    marginBottom: height * 0.04,
  },
  title: {
    fontSize: Math.min(width * 0.12, 48),
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff80',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
    letterSpacing: width * 0.02,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Math.min(width * 0.042, 18),
    color: '#ffffff80',
    letterSpacing: 1,
    textAlign: 'center',
  },
  cubeContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  holoCube: {
    width: Math.min(width * 0.32, 128),
    height: Math.min(width * 0.32, 128),
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#00ffff40',
    overflow: 'hidden',
    shadowColor: '#00ffff',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  cubeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cubeText: {
    fontSize: Math.min(width * 0.16, 64),
    color: '#ffffff',
    textShadowColor: '#00ffff',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 15,
  },
  descriptionContainer: {
    marginBottom: height * 0.04,
    paddingHorizontal: width * 0.04,
  },
  description: {
    fontSize: Math.min(width * 0.04, 16),
    color: '#ffffff90',
    textAlign: 'center',
    lineHeight: Math.min(width * 0.06, 24),
  },
  buttonContainer: {
    marginBottom: height * 0.04,
  },
  trialButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#00ffff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  trialGradient: {
    paddingVertical: height * 0.025,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  trialButtonText: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: 'bold',
    color: '#000',
  },
  trialSubtext: {
    fontSize: Math.min(width * 0.035, 14),
    color: '#00000080',
    marginTop: 4,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#ff00ff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  subscribeGradient: {
    paddingVertical: height * 0.025,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: Math.min(width * 0.05, 20),
    fontWeight: 'bold',
    color: '#fff',
  },
  subscribeSubtext: {
    fontSize: Math.min(width * 0.035, 14),
    color: '#ffffff80',
    marginTop: 4,
  },
  featuresContainer: {
    paddingBottom: height * 0.04,
    alignItems: 'center',
  },
  featureText: {
    fontSize: Math.min(width * 0.035, 14),
    color: '#ffffff60',
    textAlign: 'center',
    marginBottom: 8,
  },
});

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleStartFreeTrial = async () => {
    await AsyncStorage.setItem('userType', 'trial');
    navigation.navigate('ProtocolSelection');
  };

  const handleSubscribe = () => {
    navigation.navigate('Subscription');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a2e', '#16213e']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>BREATHE</Text>
          <Text style={styles.subtitle}>Holographic Breathing Experience</Text>
        </View>

        {/* Holographic Cube */}
        <View style={styles.cubeContainer}>
          <View style={styles.holoCube}>
            <LinearGradient
              colors={['#00ffff40', '#ff00ff40', '#ffff0040']}
              style={styles.cubeGradient}>
              <Text style={styles.cubeText}>◊</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Description */}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            Transform your breathing with advanced holographic protocols designed
            for deep relaxation and enhanced focus.
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.trialButton} onPress={handleStartFreeTrial}>
            <LinearGradient
              colors={['#00ffff', '#0080ff']}
              style={styles.trialGradient}>
              <Text style={styles.trialButtonText}>Start Free Trial</Text>
              <Text style={styles.trialSubtext}>Try one protocol free</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <LinearGradient
              colors={['#ff00ff', '#8000ff']}
              style={styles.subscribeGradient}>
              <Text style={styles.subscribeButtonText}>Subscribe - ₹999/month</Text>
              <Text style={styles.subscribeSubtext}>Unlock all protocols</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>✨ 7 Advanced Breathing Protocols</Text>
          <Text style={styles.featureText}>🎯 Personalized Session Tracking</Text>
          <Text style={styles.featureText}>🔮 Holographic Visual Experience</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomeScreen;