import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { COLORS } from '@/constants';
import { useWallet } from '@/components/wallet/WalletContextProvider';

export const ManageTokenScreen: React.FC = () => {
  const { connected } = useWallet();

  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notConnected}>
          <Text style={styles.notConnectedText}>Connect your wallet to manage tokens</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={styles.title}>Manage Tokens</Text>
          <Text style={styles.subtitle}>Control mint authority, freeze tokens, and more</Text>
          <Text style={styles.comingSoon}>🚧 Coming Soon</Text>
        </Card>
      </ScrollView>
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
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  notConnected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notConnectedText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  comingSoon: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.warning,
  },
});