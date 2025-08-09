import 'react-native-get-random-values';
import { Buffer } from 'buffer';
global.Buffer = Buffer;

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

// Providers
import { WalletContextProvider } from '@/components/wallet/WalletContextProvider';
import { SolanaProvider } from '@/services/solana/SolanaProvider';

// Screens
import { TabNavigator } from '@/navigation/TabNavigator';
import { WelcomeScreen } from '@/screens/WelcomeScreen';
import { CreateTokenScreen } from '@/screens/CreateTokenScreen';
import { ManageTokenScreen } from '@/screens/ManageTokenScreen';
import { LiquidityScreen } from '@/screens/LiquidityScreen';

// Types
export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  CreateToken: undefined;
  ManageToken: undefined;
  Liquidity: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <SolanaProvider>
        <WalletContextProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="Welcome"
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#6366f1',
                },
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Main"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CreateToken"
                component={CreateTokenScreen}
                options={{ title: 'Create SPL Token' }}
              />
              <Stack.Screen
                name="ManageToken"
                component={ManageTokenScreen}
                options={{ title: 'Manage Token' }}
              />
              <Stack.Screen
                name="Liquidity"
                component={LiquidityScreen}
                options={{ title: 'Liquidity Pool' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
          <Toast />
          <StatusBar style="light" />
        </WalletContextProvider>
      </SolanaProvider>
    </SafeAreaProvider>
  );
}