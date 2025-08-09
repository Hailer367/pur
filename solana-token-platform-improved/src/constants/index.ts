import { PublicKey } from '@solana/web3.js';

// Network configurations
export const NETWORKS = {
  devnet: {
    name: 'Devnet',
    endpoint: 'https://api.devnet.solana.com',
    explorerUrl: 'https://explorer.solana.com',
  },
  mainnet: {
    name: 'Mainnet Beta',
    endpoint: 'https://api.mainnet-beta.solana.com',
    explorerUrl: 'https://explorer.solana.com',
  },
  testnet: {
    name: 'Testnet',
    endpoint: 'https://api.testnet.solana.com',
    explorerUrl: 'https://explorer.solana.com',
  },
} as const;

// Token program IDs
export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
export const ASSOCIATED_TOKEN_PROGRAM_ID = new PublicKey('ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL');

// Raydium program IDs
export const RAYDIUM_LIQUIDITY_POOL_PROGRAM_ID = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');
export const SERUM_PROGRAM_ID = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');

// Common token addresses (devnet)
export const COMMON_TOKENS = {
  USDC: new PublicKey('4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU'), // USDC devnet
  SOL: new PublicKey('So11111111111111111111111111111111111111112'), // Wrapped SOL
};

// App colors
export const COLORS = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1f2937',
  textSecondary: '#6b7280',
  border: '#e5e7eb',
} as const;

// Transaction fees (in lamports)
export const FEES = {
  CREATE_TOKEN: 1000000, // ~0.001 SOL
  CREATE_LIQUIDITY_POOL: 5000000, // ~0.005 SOL
  ADD_LIQUIDITY: 1000000, // ~0.001 SOL
  REMOVE_LIQUIDITY: 1000000, // ~0.001 SOL
} as const;

// Storage keys
export const STORAGE_KEYS = {
  WALLET_STATE: 'wallet_state',
  CREATED_TOKENS: 'created_tokens',
  NETWORK_PREFERENCE: 'network_preference',
  USER_PREFERENCES: 'user_preferences',
} as const;