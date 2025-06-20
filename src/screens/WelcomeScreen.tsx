import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import {RootStackParamList} from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

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
    <SafeAreaView className="flex-1 bg-black">
      <LinearGradient
        colors={['#000', '#1a1a2e', '#16213e']}
        className="flex-1 px-6 justify-between">
        
        {/* Header */}
        <View className="items-center mt-16 mb-8">
          <Text className="text-5xl font-bold text-cyan-400 tracking-widest mb-2" 
                style={{textShadowColor: '#00ffff80', textShadowOffset: {width: 0, height: 0}, textShadowRadius: 20}}>
            BREATHE
          </Text>
          <Text className="text-lg text-white/50 tracking-wide text-center">
            Holographic Breathing Experience
          </Text>
        </View>

        {/* Holographic Cube */}
        <View className="flex-1 items-center justify-center">
          <View className="w-32 h-32 rounded-3xl border-2 border-cyan-400/25 overflow-hidden"
                style={{shadowColor: '#00ffff', shadowOffset: {width: 0, height: 0}, shadowOpacity: 0.5, shadowRadius: 20, elevation: 10}}>
            <LinearGradient
              colors={['#00ffff40', '#ff00ff40', '#ffff0040']}
              className="flex-1 items-center justify-center">
              <Text className="text-6xl text-white" 
                    style={{textShadowColor: '#00ffff', textShadowOffset: {width: 0, height: 0}, textShadowRadius: 15}}>
                ◊
              </Text>
            </LinearGradient>
          </View>
        </View>

        {/* Description */}
        <View className="mb-8 px-4">
          <Text className="text-base text-white/80 text-center leading-6">
            Transform your breathing with advanced holographic protocols designed
            for deep relaxation and enhanced focus.
          </Text>
        </View>

        {/* Buttons */}
        <View className="mb-8 space-y-4">
          <TouchableOpacity onPress={handleStartFreeTrial}
                           className="rounded-2xl overflow-hidden"
                           style={{shadowColor: '#00ffff', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8}}>
            <LinearGradient
              colors={['#00ffff', '#0080ff']}
              className="py-5 px-8 items-center">
              <Text className="text-xl font-bold text-black">Start Free Trial</Text>
              <Text className="text-sm text-black/70 mt-1">Try one protocol free</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubscribe}
                           className="rounded-2xl overflow-hidden"
                           style={{shadowColor: '#ff00ff', shadowOffset: {width: 0, height: 4}, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8}}>
            <LinearGradient
              colors={['#ff00ff', '#8000ff']}
              className="py-5 px-8 items-center">
              <Text className="text-xl font-bold text-white">Subscribe - ₹999/month</Text>
              <Text className="text-sm text-white/70 mt-1">Unlock all protocols</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Features */}
        <View className="pb-8 items-center space-y-2">
          <Text className="text-sm text-white/40 text-center">✨ 7 Advanced Breathing Protocols</Text>
          <Text className="text-sm text-white/40 text-center">🎯 Personalized Session Tracking</Text>
          <Text className="text-sm text-white/40 text-center">🔮 Holographic Visual Experience</Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default WelcomeScreen;