import { PublicKey } from '@solana/web3.js';
import * as Clipboard from 'expo-clipboard';
import Toast from 'react-native-toast-message';

export const shortenAddress = (address: string, chars = 4): string => {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

export const formatNumber = (num: number, decimals = 2): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(decimals)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(decimals)}K`;
  }
  return num.toFixed(decimals);
};

export const formatCurrency = (amount: number, currency = 'SOL'): string => {
  return `${formatNumber(amount)} ${currency}`;
};

export const copyToClipboard = async (text: string, message?: string) => {
  try {
    await Clipboard.setStringAsync(text);
    Toast.show({
      type: 'success',
      text1: 'Copied!',
      text2: message || 'Copied to clipboard',
      position: 'bottom',
    });
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: 'Copy failed',
      text2: 'Unable to copy to clipboard',
      position: 'bottom',
    });
  }
};

export const validateSolanaAddress = (address: string): boolean => {
  try {
    new PublicKey(address);
    return true;
  } catch {
    return false;
  }
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const lamportsToSol = (lamports: number): number => {
  return lamports / 1000000000;
};

export const solToLamports = (sol: number): number => {
  return sol * 1000000000;
};

export const generateRandomSeed = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const parseError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.error?.message) return error.error.message;
  return 'An unknown error occurred';
};