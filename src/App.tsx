import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { AuthScreen } from './screens/AuthScreen';
import { ProtocolSelectionScreen } from './screens/ProtocolSelectionScreen';
import { BreathingSessionScreen } from './screens/BreathingSessionScreen';
import { PrivacyPolicyScreen } from './screens/PrivacyPolicyScreen';
import { AboutScreen } from './screens/AboutScreen';
import { ProfileScreen } from './screens/ProfileScreen';

export type RootStackParamList = {
  Welcome: undefined;
  Auth: undefined;
  ProtocolSelection: undefined;
  BreathingSession: { protocol: any };
  Profile: undefined;
  Analytics: undefined;
  PrivacyPolicy: undefined;
  About: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
              headerShown: false,
              cardStyle: { backgroundColor: 'transparent' },
              cardStyleInterpolator: ({ current, layouts }) => {
                return {
                  cardStyle: {
                    transform: [
                      {
                        translateX: current.progress.interpolate({
                          inputRange: [0, 1],
                          outputRange: [layouts.screen.width, 0],
                        }),
                      },
                    ],
                  },
                };
              },
            }}
          >
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="ProtocolSelection" component={ProtocolSelectionScreen} />
            <Stack.Screen name="BreathingSession" component={BreathingSessionScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
            <Stack.Screen name="About" component={AboutScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}