import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RootStackParamList} from '../../App';
import {breathingProtocols} from '../data/breathingProtocols';
import {BreathingProtocol} from '../types';

type ProtocolSelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProtocolSelection'
>;

const ProtocolSelectionScreen = () => {
  const navigation = useNavigation<ProtocolSelectionScreenNavigationProp>();
  const [isTrialMode, setIsTrialMode] = useState(false);
  const [hasUsedTrial, setHasUsedTrial] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const trialMode = await AsyncStorage.getItem('trialMode');
      const usedTrial = await AsyncStorage.getItem('hasUsedTrial');
      const subscription = await AsyncStorage.getItem('hasSubscription');

      setIsTrialMode(trialMode === 'true');
      setHasUsedTrial(usedTrial === 'true');
      setHasSubscription(subscription === 'true');
    } catch (error) {
      console.error('Error checking user status:', error);
    }
  };

  const handleProtocolSelect = async (protocol: BreathingProtocol) => {
    if (hasSubscription) {
      navigation.navigate('BreathingSession', {protocol});
      return;
    }

    if (isTrialMode && !hasUsedTrial) {
      await AsyncStorage.setItem('hasUsedTrial', 'true');
      navigation.navigate('BreathingSession', {protocol});
      return;
    }

    if (hasUsedTrial && !hasSubscription) {
      navigation.navigate('UpgradePrompt');
      return;
    }

    Alert.alert(
      'Subscription Required',
      'Subscribe to access all breathing protocols.',
      [
        {text: 'Cancel', style: 'cancel'},
        {text: 'Subscribe', onPress: () => navigation.navigate('Subscription')},
      ]
    );
  };

  const renderProtocolCard = ({item, index}: {item: BreathingProtocol; index: number}) => {
    const isLocked = !hasSubscription && hasUsedTrial;
    
    return (
      <TouchableOpacity
        style={[styles.protocolCard, isLocked && styles.lockedCard]}
        onPress={() => handleProtocolSelect(item)}
        disabled={isLocked && item.id !== 'foundation'}>
        <LinearGradient
          colors={isLocked ? ['#333', '#222'] : [item.color + '20', item.color + '40']}
          style={styles.cardGradient}>
          
          <View style={styles.cardHeader}>
            <Text style={[styles.protocolName, isLocked && styles.lockedText]}>
              {item.name}
            </Text>
            {isLocked && item.id !== 'foundation' && (
              <Text style={styles.lockIcon}>🔒</Text>
            )}
          </View>

          <Text style={[styles.protocolBenefit, isLocked && styles.lockedText]}>
            {item.benefit}
          </Text>

          <Text style={[styles.protocolDescription, isLocked && styles.lockedText]}>
            {item.description}
          </Text>

          <View style={styles.patternContainer}>
            <Text style={[styles.patternLabel, isLocked && styles.lockedText]}>
              Pattern: {item.pattern.join('-')} seconds
            </Text>
            <Text style={[styles.durationLabel, isLocked && styles.lockedText]}>
              {Math.floor(item.sessionDuration / 60)} minutes
            </Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000', '#1a1a2e']} style={styles.gradient}>
        
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Protocol</Text>
          <View style={styles.statusContainer}>
            {hasSubscription ? (
              <Text style={styles.premiumStatus}>Premium Active</Text>
            ) : isTrialMode && !hasUsedTrial ? (
              <Text style={styles.trialStatus}>Free Trial Available</Text>
            ) : (
              <Text style={styles.lockedStatus}>Trial Used - Subscribe for Access</Text>
            )}
          </View>
        </View>

        <FlatList
          data={breathingProtocols}
          renderItem={renderProtocolCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.protocolsList}
          showsVerticalScrollIndicator={false}
        />

        {!hasSubscription && (
          <TouchableOpacity
            style={styles.subscribeButton}
            onPress={() => navigation.navigate('Subscription')}>
            <LinearGradient
              colors={['#ff00ff', '#8000ff']}
              style={styles.subscribeGradient}>
              <Text style={styles.subscribeButtonText}>
                Unlock All Protocols - ₹999/month
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        )}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#00ffff',
    textAlign: 'center',
    marginBottom: 10,
  },
  statusContainer: {
    alignItems: 'center',
  },
  premiumStatus: {
    color: '#00ff00',
    fontSize: 14,
    fontWeight: '600',
  },
  trialStatus: {
    color: '#ffd93d',
    fontSize: 14,
    fontWeight: '600',
  },
  lockedStatus: {
    color: '#ff6b6b',
    fontSize: 14,
    fontWeight: '600',
  },
  protocolsList: {
    padding: 20,
    paddingTop: 10,
  },
  protocolCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  lockedCard: {
    opacity: 0.6,
  },
  cardGradient: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  protocolName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  lockIcon: {
    fontSize: 16,
  },
  protocolBenefit: {
    fontSize: 14,
    color: '#00ffff',
    marginBottom: 6,
    fontWeight: '600',
  },
  protocolDescription: {
    fontSize: 13,
    color: '#ffffff90',
    marginBottom: 12,
    lineHeight: 18,
  },
  patternContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  patternLabel: {
    fontSize: 12,
    color: '#ffffff70',
  },
  durationLabel: {
    fontSize: 12,
    color: '#ffffff70',
  },
  lockedText: {
    color: '#666',
  },
  subscribeButton: {
    margin: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  subscribeGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  subscribeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProtocolSelectionScreen;