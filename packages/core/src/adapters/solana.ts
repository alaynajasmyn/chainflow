import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

class SolanaRouter {
  private connection: Connection;

  constructor() {
    const rpcUrl = process.env.SOL_RPC_URL || 'https://api.mainnet-beta.solana.com';
    this.connection = new Connection(rpcUrl);
  }

  async getBalance(address: string) {
    const publicKey = new PublicKey(address);
    const balance = await this.connection.getBalance(publicKey);
    return {
      address,
      balance: balance / LAMPORTS_PER_SOL,
      balanceLamports: balance.toString()
    };
  }

  async getTokenAccounts(address: string) {
    // Would parse SPL token accounts
    return { address, tokens: [] };
  }

  async getRecentTransactions(address: string, limit = 10) {
    const publicKey = new PublicKey(address);
    const signatures = await this.connection.getSignaturesForAddress(publicKey, { limit });
    return signatures;
  }

  async sendTransaction(transaction: Buffer): Promise<string> {
    // Would broadcast signed transaction
    return `sig_${Math.random().toString(36).slice(2)}`;
  }
}

export const solanaAdapter = new SolanaRouter();