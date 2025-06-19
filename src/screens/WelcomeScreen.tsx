import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const {width, height} = Dimensions.get('window');

const WelcomeScreen = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleStartFreeTrial = async () => {
    try {
      await AsyncStorage.setItem('trialMode', 'true');
      navigation.navigate('ProtocolSelection');
    } catch (error) {
      console.error('Error setting trial mode:', error);
    }
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

        {/* Holographic Cube Placeholder */}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    textShadowColor: '#00ffff80',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 20,
    letterSpacing: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    marginTop: 8,
    letterSpacing: 2,
  },
  cubeContainer: {
    alignItems: 'center',
    marginVertical: 40,
  },
  holoCube: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#00ffff40',
    overflow: 'hidden',
  },
  cubeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cubeText: {
    fontSize: 60,
    color: '#ffffff',
    textShadowColor: '#00ffff',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: '#ffffff90',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    gap: 16,
    marginBottom: 40,
  },
  trialButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  trialGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  trialButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  trialSubtext: {
    fontSize: 14,
    color: '#00000080',
    marginTop: 4,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeGradient: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subscribeSubtext: {
    fontSize: 14,
    color: '#ffffff80',
    marginTop: 4,
  },
  featuresContainer: {
    gap: 12,
    alignItems: 'center',
  },
  featureText: {
    fontSize: 14,
    color: '#ffffff60',
    textAlign: 'center',
  },
});

export default WelcomeScreen;