import { Connection, PublicKey, Keypair, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import {
  createMint,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  setAuthority,
  AuthorityType,
  createAssociatedTokenAccountInstruction,
  getAssociatedTokenAddress,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { TokenMetadata } from '@/types';
import { parseError } from '@/utils';

export class TokenService {
  constructor(private connection: Connection) {}

  async createToken(
    payer: Keypair,
    tokenMetadata: TokenMetadata,
    signTransaction: (transaction: Transaction) => Promise<Transaction>
  ) {
    try {
      // Create mint keypair
      const mintKeypair = Keypair.generate();

      // Create mint account
      const mintAddress = await createMint(
        this.connection,
        payer,
        payer.publicKey,
        tokenMetadata.freezeAuthority ? payer.publicKey : null,
        tokenMetadata.decimals,
        mintKeypair
      );

      // Create associated token account for the payer
      const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        this.connection,
        payer,
        mintAddress,
        payer.publicKey
      );

      // Mint initial supply
      if (tokenMetadata.supply > 0) {
        await mintTo(
          this.connection,
          payer,
          mintAddress,
          associatedTokenAccount.address,
          payer,
          tokenMetadata.supply * Math.pow(10, tokenMetadata.decimals)
        );
      }

      // Revoke mint authority if requested
      if (!tokenMetadata.mintAuthority) {
        await setAuthority(
          this.connection,
          payer,
          mintAddress,
          payer,
          AuthorityType.MintTokens,
          null
        );
      }

      return {
        mintAddress: mintAddress.toBase58(),
        associatedTokenAccount: associatedTokenAccount.address.toBase58(),
      };
    } catch (error) {
      throw new Error(`Token creation failed: ${parseError(error)}`);
    }
  }

  async mintMoreTokens(
    payer: Keypair,
    mintAddress: string,
    destinationAddress: string,
    amount: number,
    decimals: number
  ) {
    try {
      const mint = new PublicKey(mintAddress);
      const destination = new PublicKey(destinationAddress);

      await mintTo(
        this.connection,
        payer,
        mint,
        destination,
        payer,
        amount * Math.pow(10, decimals)
      );

      return true;
    } catch (error) {
      throw new Error(`Minting failed: ${parseError(error)}`);
    }
  }

  async revokeAuthority(
    payer: Keypair,
    mintAddress: string,
    authorityType: AuthorityType
  ) {
    try {
      const mint = new PublicKey(mintAddress);

      await setAuthority(
        this.connection,
        payer,
        mint,
        payer,
        authorityType,
        null
      );

      return true;
    } catch (error) {
      throw new Error(`Authority revocation failed: ${parseError(error)}`);
    }
  }

  async getTokenInfo(mintAddress: string) {
    try {
      const mint = new PublicKey(mintAddress);
      const mintInfo = await this.connection.getParsedAccountInfo(mint);

      if (mintInfo.value?.data && 'parsed' in mintInfo.value.data) {
        const parsedData = mintInfo.value.data.parsed.info;
        return {
          decimals: parsedData.decimals,
          supply: parsedData.supply,
          mintAuthority: parsedData.mintAuthority,
          freezeAuthority: parsedData.freezeAuthority,
        };
      }

      throw new Error('Invalid token mint address');
    } catch (error) {
      throw new Error(`Failed to get token info: ${parseError(error)}`);
    }
  }
}