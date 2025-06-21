import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const {width, height} = Dimensions.get('window');

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
        colors={['#000000', '#1a1a2e', '#16213e']}
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
              style={styles.buttonGradient}>
              <Text style={styles.trialButtonText}>Start Free Trial</Text>
              <Text style={styles.buttonSubtext}>Try one protocol free</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <LinearGradient
              colors={['#ff00ff', '#8000ff']}
              style={styles.buttonGradient}>
              <Text style={styles.subscribeButtonText}>Subscribe - ₹999/month</Text>
              <Text style={styles.buttonSubtext}>Unlock all protocols</Text>
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
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#00ffff',
    letterSpacing: 4,
    marginBottom: 12,
    textAlign: 'center',
    ...Platform.select({
      android: {
        textShadowColor: '#00ffff80',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 20,
      },
      ios: {
        shadowColor: '#00ffff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 20,
      },
    }),
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff80',
    letterSpacing: 1,
    textAlign: 'center',
  },
  cubeContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginVertical: 40,
  },
  holoCube: {
    width: 140,
    height: 140,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: '#00ffff40',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 20,
      },
      ios: {
        shadowColor: '#00ffff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.6,
        shadowRadius: 25,
      },
    }),
  },
  cubeGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cubeText: {
    fontSize: 70,
    color: '#ffffff',
    ...Platform.select({
      android: {
        textShadowColor: '#00ffff',
        textShadowOffset: {width: 0, height: 0},
        textShadowRadius: 20,
      },
      ios: {
        shadowColor: '#00ffff',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.8,
        shadowRadius: 15,
      },
    }),
  },
  descriptionContainer: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    color: '#ffffff90',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginBottom: 40,
    gap: 16,
  },
  trialButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#00ffff',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
  subscribeButton: {
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#ff00ff',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
  },
  buttonGradient: {
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  trialButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  subscribeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  buttonSubtext: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.8,
  },
  featuresContainer: {
    paddingBottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#ffffff60',
    textAlign: 'center',
  },
});

export default WelcomeScreen;