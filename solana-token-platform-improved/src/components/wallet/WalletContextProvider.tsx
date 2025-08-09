import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { transact } from '@solana-mobile/mobile-wallet-adapter-protocol-web3js';
import { WalletContextType } from '@/types';
import { PublicKey } from '@solana/web3.js';
import Toast from 'react-native-toast-message';

interface WalletContextProviderProps {
  children: ReactNode;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletContextProvider: React.FC<WalletContextProviderProps> = ({ children }) => {
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const connect = useCallback(async () => {
    if (connecting) return;

    setConnecting(true);

    try {
      const result = await transact(async (wallet) => {
        const authorization = await wallet.authorize({
          cluster: 'devnet',
          identity: {
            name: 'Solana Token Platform',
            uri: 'https://solanatokenplatform.app',
            icon: 'favicon.ico',
          },
        });

        return {
          publicKey: authorization.accounts[0].publicKey,
          authToken: authorization.auth_token,
        };
      });

      setPublicKey(new PublicKey(result.publicKey));
      setConnected(true);

      Toast.show({
        type: 'success',
        text1: 'Wallet Connected',
        text2: 'Successfully connected to your wallet',
        position: 'bottom',
      });
    } catch (error: any) {
      console.error('Wallet connection failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Connection Failed',
        text2: 'Unable to connect to wallet',
        position: 'bottom',
      });
    } finally {
      setConnecting(false);
    }
  }, [connecting]);

  const disconnect = useCallback(async () => {
    try {
      setPublicKey(null);
      setConnected(false);

      Toast.show({
        type: 'info',
        text1: 'Wallet Disconnected',
        text2: 'Your wallet has been disconnected',
        position: 'bottom',
      });
    } catch (error) {
      console.error('Wallet disconnect failed:', error);
    }
  }, []);

  const signTransaction = useCallback(async (transaction: any) => {
    if (!connected || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await transact(async (wallet) => {
        return await wallet.signTransactions({
          transactions: [transaction],
        });
      });

      return result.signedTransactions[0];
    } catch (error) {
      console.error('Transaction signing failed:', error);
      throw error;
    }
  }, [connected, publicKey]);

  const signAllTransactions = useCallback(async (transactions: any[]) => {
    if (!connected || !publicKey) {
      throw new Error('Wallet not connected');
    }

    try {
      const result = await transact(async (wallet) => {
        return await wallet.signTransactions({
          transactions,
        });
      });

      return result.signedTransactions;
    } catch (error) {
      console.error('Transactions signing failed:', error);
      throw error;
    }
  }, [connected, publicKey]);

  const contextValue: WalletContextType = {
    publicKey,
    connected,
    connecting,
    connect,
    disconnect,
    signTransaction,
    signAllTransactions,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletContextProvider');
  }
  return context;
};