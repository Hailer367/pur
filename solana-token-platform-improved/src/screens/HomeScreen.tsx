import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackParamList, TabParamList } from '@/types';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { WalletConnect } from '@/components/wallet/WalletConnect';
import { useWallet } from '@/components/wallet/WalletContextProvider';
import { COLORS } from '@/constants';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'Home'>,
  StackNavigationProp<StackParamList>
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { connected } = useWallet();

  const quickActions = [
    {
      title: 'Create Token',
      description: 'Launch a new SPL token',
      icon: 'add-circle-outline',
      color: COLORS.primary,
      action: () => navigation.navigate('CreateToken'),
    },
    {
      title: 'Manage Token',
      description: 'Manage existing tokens',
      icon: 'settings-outline',
      color: COLORS.secondary,
      action: () => navigation.navigate('ManageToken'),
    },
    {
      title: 'Liquidity Pool',
      description: 'Create or manage pools',
      icon: 'water-outline',
      color: COLORS.success,
      action: () => navigation.navigate('Liquidity'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome to Solana Token Platform</Text>
          <Text style={styles.subtitle}>Your gateway to SPL token management</Text>
        </View>

        <Card style={styles.walletCard}>
          <Text style={styles.walletTitle}>Wallet Connection</Text>
          <WalletConnect />
        </Card>

        {connected && (
          <>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.actionCard}
                onPress={action.action}
                activeOpacity={0.8}
              >
                <View style={styles.actionIcon}>
                  <Icon name={action.icon} size={24} color={action.color} />
                </View>
                <View style={styles.actionContent}>
                  <Text style={styles.actionTitle}>{action.title}</Text>
                  <Text style={styles.actionDescription}>{action.description}</Text>
                </View>
                <Icon name="chevron-forward" size={20} color={COLORS.textSecondary} />
              </TouchableOpacity>
            ))}
          </>
        )}

        <Card style={styles.infoCard}>
          <Text style={styles.infoTitle}>About This Platform</Text>
          <Text style={styles.infoText}>
            This platform provides comprehensive tools for creating and managing Solana SPL tokens, 
            including liquidity pool management with Raydium integration.
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Create SPL tokens with custom metadata</Text>
            <Text style={styles.featureItem}>• Manage mint and freeze authorities</Text>
            <Text style={styles.featureItem}>• Create and manage liquidity pools</Text>
            <Text style={styles.featureItem}>• Mobile-optimized for tablets and phones</Text>
          </View>
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
  },
  header: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  walletCard: {
    alignItems: 'center',
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 16,
    marginTop: 8,
  },
  actionCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  infoCard: {
    marginTop: 20,
    marginBottom: 40,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 4,
  },
});