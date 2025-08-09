import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '@/types';
import { Button } from '@/components/ui/Button';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { useWallet } from '@/components/wallet/WalletContextProvider';
import { COLORS } from '@/constants';

interface WelcomeScreenProps {
  navigation: StackNavigationProp<StackParamList, 'Welcome'>;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
  const { connected } = useWallet();

  const handleGetStarted = () => {
    if (connected) {
      navigation.navigate('Main');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Solana Token Platform</Text>
          <Text style={styles.subtitle}>
            Create, manage, and trade SPL tokens with ease
          </Text>
        </View>

        <View style={styles.features}>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>🪙 Create Tokens</Text>
            <Text style={styles.featureText}>Launch your SPL tokens in seconds</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>⚡ Manage Authority</Text>
            <Text style={styles.featureText}>Control mint and freeze permissions</Text>
          </View>
          <View style={styles.feature}>
            <Text style={styles.featureTitle}>💧 Liquidity Pools</Text>
            <Text style={styles.featureText}>Create and manage Raydium pools</Text>
          </View>
        </View>

        <View style={styles.wallet}>
          <WalletConnect />
          {connected && (
            <Button
              title="Get Started"
              onPress={handleGetStarted}
              style={styles.getStartedButton}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  features: {
    marginBottom: 48,
  },
  feature: {
    marginBottom: 24,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  wallet: {
    alignItems: 'center',
  },
  getStartedButton: {
    marginTop: 24,
    width: '100%',
  },
});