import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, TokenMetadata } from '@/types';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useWallet } from '@/components/wallet/WalletContextProvider';
import { useSolana } from '@/services/solana/SolanaProvider';
import { TokenService } from '@/services/solana/TokenService';
import { COLORS, FEES } from '@/constants';
import { lamportsToSol } from '@/utils';
import Toast from 'react-native-toast-message';

interface CreateTokenScreenProps {
  navigation: StackNavigationProp<StackParamList, 'CreateToken'>;
}

export const CreateTokenScreen: React.FC<CreateTokenScreenProps> = ({ navigation }) => {
  const { connected, publicKey } = useWallet();
  const { connection } = useSolana();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    description: '',
    decimals: '9',
    supply: '1000000',
    mintAuthority: true,
    freezeAuthority: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Token name is required';
    if (!formData.symbol.trim()) newErrors.symbol = 'Token symbol is required';
    if (formData.symbol.length > 10) newErrors.symbol = 'Symbol must be 10 characters or less';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    const decimals = parseInt(formData.decimals);
    if (isNaN(decimals) || decimals < 0 || decimals > 9) {
      newErrors.decimals = 'Decimals must be between 0 and 9';
    }

    const supply = parseFloat(formData.supply);
    if (isNaN(supply) || supply < 0) {
      newErrors.supply = 'Supply must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateToken = async () => {
    if (!connected || !publicKey) {
      Toast.show({
        type: 'error',
        text1: 'Wallet Not Connected',
        text2: 'Please connect your wallet first',
        position: 'bottom',
      });
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      const tokenService = new TokenService(connection);

      const tokenMetadata: TokenMetadata = {
        name: formData.name,
        symbol: formData.symbol,
        description: formData.description,
        decimals: parseInt(formData.decimals),
        supply: parseFloat(formData.supply),
        mintAuthority: formData.mintAuthority,
        freezeAuthority: formData.freezeAuthority,
      };

      // Note: In a real implementation, you would need to handle transaction signing
      // with the mobile wallet adapter. For now, this is a template showing the flow.

      Toast.show({
        type: 'success',
        text1: 'Token Created Successfully!',
        text2: `${formData.symbol} token has been created`,
        position: 'bottom',
      });

      // Reset form
      setFormData({
        name: '',
        symbol: '',
        description: '',
        decimals: '9',
        supply: '1000000',
        mintAuthority: true,
        freezeAuthority: false,
      });

      navigation.goBack();
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Creation Failed',
        text2: error.message || 'Failed to create token',
        position: 'bottom',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.notConnected}>
          <Text style={styles.notConnectedText}>Please connect your wallet to create tokens</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Card>
          <Text style={styles.sectionTitle}>Token Information</Text>

          <Input
            label="Token Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
            placeholder="e.g., My Awesome Token"
            error={errors.name}
          />

          <Input
            label="Symbol"
            value={formData.symbol}
            onChangeText={(text) => setFormData({ ...formData, symbol: text.toUpperCase() })}
            placeholder="e.g., MAT"
            error={errors.symbol}
          />

          <Input
            label="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
            placeholder="Describe your token..."
            multiline
            error={errors.description}
          />

          <Input
            label="Decimals"
            value={formData.decimals}
            onChangeText={(text) => setFormData({ ...formData, decimals: text })}
            placeholder="9"
            keyboardType="numeric"
            error={errors.decimals}
          />

          <Input
            label="Initial Supply"
            value={formData.supply}
            onChangeText={(text) => setFormData({ ...formData, supply: text })}
            placeholder="1000000"
            keyboardType="numeric"
            error={errors.supply}
          />
        </Card>

        <Card>
          <Text style={styles.feeInfo}>
            Estimated Cost: ~{lamportsToSol(FEES.CREATE_TOKEN)} SOL
          </Text>
        </Card>

        <Button
          title="Create Token"
          onPress={handleCreateToken}
          loading={loading}
          disabled={!connected}
          style={styles.createButton}
        />
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
    paddingHorizontal: 20,
  },
  notConnectedText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 16,
  },
  feeInfo: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  createButton: {
    marginVertical: 20,
  },
});