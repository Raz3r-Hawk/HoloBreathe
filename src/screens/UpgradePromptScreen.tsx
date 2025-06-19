import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../App';

type UpgradePromptScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'UpgradePrompt'
>;

const UpgradePromptScreen = () => {
  const navigation = useNavigation<UpgradePromptScreenNavigationProp>();

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
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>

          <Text style={styles.title}>Trial Complete</Text>
          <Text style={styles.subtitle}>
            You've used your free trial. Subscribe to continue your breathing journey.
          </Text>

          <View style={styles.benefitsContainer}>
            <Text style={styles.benefitsTitle}>With Premium Access:</Text>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✨</Text>
              <Text style={styles.benefitText}>All 7 Advanced Protocols</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🎯</Text>
              <Text style={styles.benefitText}>Unlimited Sessions</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>🔮</Text>
              <Text style={styles.benefitText}>Enhanced Holographic Experience</Text>
            </View>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>📊</Text>
              <Text style={styles.benefitText}>Progress Tracking</Text>
            </View>
          </View>

          <View style={styles.pricingContainer}>
            <Text style={styles.price}>₹999</Text>
            <Text style={styles.period}>per month</Text>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('Subscription')}>
            <LinearGradient
              colors={['#ff00ff', '#8000ff']}
              style={styles.subscribeGradient}>
              <Text style={styles.subscribeButtonText}>
                Upgrade to Premium
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backToHomeButton}
            onPress={() => navigation.navigate('Welcome')}>
            <Text style={styles.backToHomeText}>Back to Home</Text>
          </TouchableOpacity>
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
    padding: 20,
    paddingTop: 40,
  },
  backButton: {
    fontSize: 24,
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 32,
  },
  lockIcon: {
    fontSize: 80,
    textAlign: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  benefitsContainer: {
    marginBottom: 40,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  benefitText: {
    fontSize: 16,
    color: '#ffffff90',
  },
  pricingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  price: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff00ff',
    textShadowColor: '#ff00ff40',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 10,
  },
  period: {
    fontSize: 16,
    color: '#ffffff70',
    marginTop: 4,
  },
  buttonContainer: {
    padding: 20,
    gap: 16,
  },
  subscribeButton: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  subscribeGradient: {
    paddingVertical: 18,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  backToHomeButton: {
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff30',
    borderRadius: 16,
  },
  backToHomeText: {
    fontSize: 16,
    color: '#ffffff80',
  },
});

export default UpgradePromptScreen;