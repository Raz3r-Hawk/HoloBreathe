import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {StatusBar} from 'react-native';

// Import screens
import WelcomeScreen from './screens/WelcomeScreen';
import ProtocolSelectionScreen from './screens/ProtocolSelectionScreen';
import BreathingSessionScreen from './screens/BreathingSessionScreen';
import SubscriptionScreen from './screens/SubscriptionScreen';
import UpgradePromptScreen from './screens/UpgradePromptScreen';

export type RootStackParamList = {
  Welcome: undefined;
  ProtocolSelection: undefined;
  BreathingSession: {protocol: any};
  Subscription: undefined;
  UpgradePrompt: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" translucent />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{
            headerShown: false,
            cardStyle: {backgroundColor: '#000'},
            gestureEnabled: true,
            animationEnabled: true,
          }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="ProtocolSelection" component={ProtocolSelectionScreen} />
          <Stack.Screen name="BreathingSession" component={BreathingSessionScreen} />
          <Stack.Screen name="Subscription" component={SubscriptionScreen} />
          <Stack.Screen name="UpgradePrompt" component={UpgradePromptScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;