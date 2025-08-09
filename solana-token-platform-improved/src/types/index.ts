import { PublicKey } from '@solana/web3.js';

export interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  image?: string;
  decimals: number;
  supply: number;
  mintAuthority?: boolean;
  freezeAuthority?: boolean;
}

export interface CreatedToken {
  mintAddress: string;
  name: string;
  symbol: string;
  decimals: number;
  supply: number;
  createdAt: string;
  metadata: TokenMetadata;
}

export interface WalletContextType {
  publicKey: PublicKey | null;
  connected: boolean;
  connecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  signTransaction: (transaction: any) => Promise<any>;
  signAllTransactions: (transactions: any[]) => Promise<any[]>;
}

export interface SolanaContextType {
  connection: any;
  network: 'devnet' | 'mainnet' | 'testnet';
  setNetwork: (network: 'devnet' | 'mainnet' | 'testnet') => void;
}

export interface LiquidityPoolInfo {
  poolAddress: string;
  tokenAMint: string;
  tokenBMint: string;
  tokenAAmount: number;
  tokenBAmount: number;
  lpTokenSupply: number;
  apy: number;
}

export interface TransactionStatus {
  signature?: string;
  status: 'pending' | 'confirmed' | 'failed';
  error?: string;
}

// Navigation types
export type TabParamList = {
  Home: undefined;
  Portfolio: undefined;
  Tools: undefined;
  Settings: undefined;
};

export type StackParamList = {
  Welcome: undefined;
  Main: undefined;
  CreateToken: undefined;
  ManageToken: { tokenMint?: string };
  Liquidity: { action?: 'create' | 'manage' };
};