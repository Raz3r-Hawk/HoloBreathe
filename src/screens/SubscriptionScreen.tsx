import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../App';

type SubscriptionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Subscription'
>;

const SubscriptionScreen = () => {
  const navigation = useNavigation<SubscriptionScreenNavigationProp>();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing (replace with actual Razorpay integration)
    try {
      // Demo: Simulate 2-second payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark subscription as active
      await AsyncStorage.setItem('hasSubscription', 'true');
      await AsyncStorage.setItem('subscriptionEndDate', 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      );
      
      Alert.alert(
        'Subscription Successful!',
        'You now have access to all breathing protocols.',
        [
          {
            text: 'Start Breathing',
            onPress: () => navigation.navigate('ProtocolSelection'),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Payment Failed', 'Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const features = [
    '7 Advanced Breathing Protocols',
    'Unlimited Session Access',
    'Progress Tracking',
    'Holographic Visual Experience',
    'Personalized Recommendations',
    'Offline Mode Support',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#000', '#1a1a2e', '#16213e']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backButton}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Premium Subscription</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Pricing Card */}
        <View style={styles.pricingCard}>
          <LinearGradient
            colors={['#ff00ff20', '#8000ff20']}
            style={styles.cardGradient}>
            
            <Text style={styles.priceAmount}>₹999</Text>
            <Text style={styles.pricePeriod}>per month</Text>
            
            <Text style={styles.priceDescription}>
              Unlock unlimited access to all breathing protocols
            </Text>
          </LinearGradient>
        </View>

        {/* Features List */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>What You Get:</Text>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.featureIcon}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        {/* Subscribe Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={handleSubscribe}
            disabled={isProcessing}>
            <LinearGradient
              colors={isProcessing ? ['#666', '#444'] : ['#ff00ff', '#8000ff']}
              style={styles.subscribeGradient}>
              {isProcessing ? (
                <View style={styles.processingContainer}>
                  <ActivityIndicator color="#ffffff" size="small" />
                  <Text style={styles.processingText}>Processing...</Text>
                </View>
              ) : (
                <Text style={styles.subscribeButtonText}>
                  Subscribe Now
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            Cancel anytime. Secure payment processing.
          </Text>
        </View>

        {/* Trial Info */}
        <View style={styles.trialInfo}>
          <Text style={styles.trialText}>
            Already used your free trial? Subscribe to continue your journey.
          </Text>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 24,
  },
  pricingCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ff00ff40',
  },
  cardGradient: {
    padding: 32,
    alignItems: 'center',
  },
  priceAmount: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff00ff',
    textShadowColor: '#ff00ff40',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  pricePeriod: {
    fontSize: 18,
    color: '#ffffff80',
    marginBottom: 16,
  },
  priceDescription: {
    fontSize: 16,
    color: '#ffffff90',
    textAlign: 'center',
    lineHeight: 22,
  },
  featuresContainer: {
    margin: 20,
    marginTop: 10,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    fontSize: 16,
    color: '#00ff00',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 16,
    color: '#ffffff90',
    flex: 1,
  },
  buttonContainer: {
    padding: 20,
    paddingTop: 10,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  subscribeGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  processingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 12,
    color: '#ffffff60',
    textAlign: 'center',
  },
  trialInfo: {
    padding: 20,
    paddingTop: 0,
  },
  trialText: {
    fontSize: 14,
    color: '#ffffff70',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default SubscriptionScreen;