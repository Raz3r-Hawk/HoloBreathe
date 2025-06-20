import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../App';

type SubscriptionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Subscription'>;

const SubscriptionScreen = () => {
  const navigation = useNavigation<SubscriptionScreenNavigationProp>();

  const handleSubscribe = () => {
    // Handle subscription logic here
    navigation.navigate('ProtocolSelection');
  };

  const handleBackToTrial = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000000', '#1a1a2e', '#16213e']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Premium Breathing Experience</Text>
            <Text style={styles.subtitle}>Unlock the full potential of holographic breathing</Text>
          </View>

          {/* Pricing Card */}
          <View style={styles.pricingCard}>
            <LinearGradient colors={['#ff00ff', '#8000ff']} style={styles.pricingGradient}>
              <Text style={styles.priceAmount}>₹999</Text>
              <Text style={styles.pricePeriod}>per month</Text>
              <Text style={styles.priceDescription}>Full access to all breathing protocols</Text>
            </LinearGradient>
          </View>

          {/* Features List */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>What's Included</Text>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>✨</Text>
              <Text style={styles.featureText}>7 Advanced Breathing Protocols</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Personalized Session Tracking</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🔮</Text>
              <Text style={styles.featureText}>Holographic Visual Experience</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Detailed Progress Analytics</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎵</Text>
              <Text style={styles.featureText}>Ambient Audio Library</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚡</Text>
              <Text style={styles.featureText}>Unlimited Session Duration</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
              <LinearGradient colors={['#ff00ff', '#8000ff']} style={styles.buttonGradient}>
                <Text style={styles.subscribeButtonText}>Subscribe Now</Text>
                <Text style={styles.buttonSubtext}>Start your premium journey</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backButton} onPress={handleBackToTrial}>
              <LinearGradient colors={['#00ffff40', '#0080ff40']} style={styles.buttonGradient}>
                <Text style={styles.backButtonText}>Continue with Trial</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              Subscription automatically renews monthly. Cancel anytime from your account settings.
            </Text>
          </View>
        </ScrollView>
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
  },
  scrollContent: {
    paddingHorizontal: 20,
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
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    textAlign: 'center',
    lineHeight: 22,
  },
  pricingCard: {
    marginBottom: 40,
    borderRadius: 20,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 15,
      },
      ios: {
        shadowColor: '#ff00ff',
        shadowOffset: {width: 0, height: 8},
        shadowOpacity: 0.4,
        shadowRadius: 16,
      },
    }),
  },
  pricingGradient: {
    padding: 30,
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  pricePeriod: {
    fontSize: 18,
    color: '#ffffff90',
    marginBottom: 12,
  },
  priceDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 40,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 20,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  featureIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 30,
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff90',
    flex: 1,
  },
  buttonsContainer: {
    marginBottom: 30,
  },
  subscribeButton: {
    marginBottom: 16,
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
  backButton: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#00ffff40',
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00ffff',
  },
  buttonSubtext: {
    fontSize: 14,
    color: '#ffffff80',
    marginTop: 4,
  },
  termsContainer: {
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#ffffff60',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 20,
  },
});

export default SubscriptionScreen;