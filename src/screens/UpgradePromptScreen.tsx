import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../App';

type UpgradePromptScreenNavigationProp = StackNavigationProp<RootStackParamList, 'UpgradePrompt'>;

const UpgradePromptScreen = () => {
  const navigation = useNavigation<UpgradePromptScreenNavigationProp>();

  const handleUpgrade = () => {
    navigation.navigate('Subscription');
  };

  const handleContinueTrial = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000000', '#1a1a2e', '#16213e']} style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Unlock Premium Features</Text>
          <Text style={styles.subtitle}>Your trial session is complete. Upgrade to continue your breathing journey.</Text>
        </View>

        {/* Feature Highlights */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureCard}>
            <LinearGradient colors={['#ff00ff40', '#8000ff40']} style={styles.featureGradient}>
              <Text style={styles.featureTitle}>7 Advanced Protocols</Text>
              <Text style={styles.featureDescription}>Access all breathing techniques including Wim Hof Method and Navy SEAL training</Text>
            </LinearGradient>
          </View>

          <View style={styles.featureCard}>
            <LinearGradient colors={['#00ffff40', '#0080ff40']} style={styles.featureGradient}>
              <Text style={styles.featureTitle}>Unlimited Sessions</Text>
              <Text style={styles.featureDescription}>Practice as long as you want with personalized session tracking</Text>
            </LinearGradient>
          </View>

          <View style={styles.featureCard}>
            <LinearGradient colors={['#ff8000', '#ff0080']} style={styles.featureGradient}>
              <Text style={styles.featureTitle}>Progress Analytics</Text>
              <Text style={styles.featureDescription}>Track your breathing journey with detailed insights and statistics</Text>
            </LinearGradient>
          </View>
        </View>

        {/* Pricing */}
        <View style={styles.pricingContainer}>
          <Text style={styles.priceText}>Only ₹999/month</Text>
          <Text style={styles.priceSubtext}>Cancel anytime • Start immediately</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.upgradeButton} onPress={handleUpgrade}>
            <LinearGradient colors={['#ff00ff', '#8000ff']} style={styles.buttonGradient}>
              <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
              <Text style={styles.buttonSubtext}>Unlock full potential</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.continueButton} onPress={handleContinueTrial}>
            <View style={styles.continueButtonContent}>
              <Text style={styles.continueButtonText}>Continue Trial</Text>
            </View>
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
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 20,
  },
  featuresContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  featureCard: {
    borderRadius: 16,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 8,
      },
      ios: {
        shadowColor: '#ffffff',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
    }),
  },
  featureGradient: {
    padding: 20,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#ffffff90',
    lineHeight: 20,
  },
  pricingContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  priceText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff00ff',
    marginBottom: 4,
  },
  priceSubtext: {
    fontSize: 14,
    color: '#ffffff60',
  },
  buttonsContainer: {
    gap: 16,
  },
  upgradeButton: {
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
  continueButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00ffff40',
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  continueButtonContent: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00ffff',
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#ffffff80',
    marginTop: 4,
  },
});

export default UpgradePromptScreen;