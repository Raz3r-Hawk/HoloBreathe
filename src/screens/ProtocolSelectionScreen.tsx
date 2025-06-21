import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../App';
import {breathingProtocols} from '../data/breathingProtocols';

type ProtocolSelectionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProtocolSelection'>;

const ProtocolSelectionScreen = () => {
  const navigation = useNavigation<ProtocolSelectionScreenNavigationProp>();

  const handleProtocolSelect = (protocol: any) => {
    navigation.navigate('BreathingSession', {protocol});
  };

  const renderProtocolCard = ({item, index}: {item: any; index: number}) => {
    const colors = item.color === 'cyan' ? ['#00ffff', '#0080ff'] :
                  item.color === 'purple' ? ['#8000ff', '#ff00ff'] :
                  item.color === 'green' ? ['#00ff80', '#00ffff'] :
                  ['#ff8000', '#ff0080'];

    return (
      <TouchableOpacity 
        style={styles.protocolCard} 
        onPress={() => handleProtocolSelect(item)}>
        <LinearGradient colors={colors} style={styles.cardGradient}>
          <Text style={styles.protocolName}>{item.name}</Text>
          <Text style={styles.protocolPattern}>
            {item.pattern.join(' - ')} seconds
          </Text>
          <Text style={styles.protocolBenefit}>{item.benefit}</Text>
          <Text style={styles.protocolDuration}>
            {Math.floor(item.sessionDuration / 60)} minutes
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000000', '#1a1a2e', '#16213e']} style={styles.gradient}>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Your Protocol</Text>
          <Text style={styles.subtitle}>Select a breathing pattern for your session</Text>
        </View>

        <FlatList
          data={breathingProtocols}
          renderItem={renderProtocolCard}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.protocolList}
          showsVerticalScrollIndicator={false}
        />
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
  },
  header: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 40 : 20,
    paddingBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#00ffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff80',
    textAlign: 'center',
  },
  protocolList: {
    paddingBottom: 40,
  },
  protocolCard: {
    marginBottom: 16,
    borderRadius: 16,
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
  cardGradient: {
    padding: 20,
    alignItems: 'center',
  },
  protocolName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  protocolPattern: {
    fontSize: 16,
    color: '#ffffff90',
    marginBottom: 8,
    textAlign: 'center',
  },
  protocolBenefit: {
    fontSize: 14,
    color: '#ffffff70',
    marginBottom: 8,
    textAlign: 'center',
  },
  protocolDuration: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default ProtocolSelectionScreen;