import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Connection, clusterApiUrl } from '@solana/web3.js';
import { SolanaContextType } from '@/types';
import { NETWORKS } from '@/constants';

interface SolanaProviderProps {
  children: ReactNode;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export const SolanaProvider: React.FC<SolanaProviderProps> = ({ children }) => {
  const [network, setNetwork] = useState<'devnet' | 'mainnet' | 'testnet'>('devnet');

  const connection = new Connection(
    process.env.EXPO_PUBLIC_RPC_ENDPOINT || NETWORKS[network].endpoint,
    'confirmed'
  );

  const contextValue: SolanaContextType = {
    connection,
    network,
    setNetwork,
  };

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
};

export const useSolana = (): SolanaContextType => {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error('useSolana must be used within SolanaProvider');
  }
  return context;
};