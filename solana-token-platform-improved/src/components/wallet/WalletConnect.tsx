import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useWallet } from './WalletContextProvider';
import { COLORS } from '@/constants';
import { shortenAddress } from '@/utils';

export const WalletConnect: React.FC = () => {
  const { publicKey, connected, connecting, connect, disconnect } = useWallet();

  if (connected && publicKey) {
    return (
      <View style={styles.container}>
        <View style={styles.walletInfo}>
          <Text style={styles.walletAddress}>
            {shortenAddress(publicKey.toBase58())}
          </Text>
          <TouchableOpacity style={styles.disconnectButton} onPress={disconnect}>
            <Text style={styles.disconnectText}>Disconnect</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.connectButton} 
      onPress={connect}
      disabled={connecting}
    >
      {connecting ? (
        <ActivityIndicator color="#ffffff" />
      ) : (
        <Text style={styles.connectText}>Connect Wallet</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  walletInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  walletAddress: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginRight: 12,
  },
  disconnectButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: COLORS.error,
    borderRadius: 6,
  },
  disconnectText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  connectButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  connectText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});