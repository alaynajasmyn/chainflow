import { z } from 'zod';

// Chain types
export const ChainSchema = z.enum(['ethereum', 'base', 'arbitrum', 'solana', 'polygon', 'avalanche']);
export type Chain = z.infer<typeof ChainSchema>;

// Token types
export interface Token {
  address: string;
  symbol: string;
  name: string;
  chain: Chain;
  decimals: number;
  logoURI?: string;
}

export interface TokenBalance extends Token {
  balance: string;
  balanceUsd?: number;
  price?: number;
}

// Portfolio types
export interface PortfolioPosition {
  protocol: string;
  chain: Chain;
  type: 'lending' | 'liquidity' | 'staking' | 'nft' | 'token';
  tokens: TokenBalance[];
  totalValueUsd: number;
  healthFactor?: number;
  apy?: number;
}

export interface Portfolio {
  address: string;
  positions: PortfolioPosition[];
  totalValueUsd: number;
  chainBreakdown: Record<Chain, number>;
}

// Transaction types
export const TransactionSchema = z.object({
  to: z.string(),
  value: z.string().optional(),
  data: z.string().optional(),
  chain: ChainSchema,
  gasLimit: z.string().optional()
});

export type Transaction = z.infer<typeof TransactionSchema>;

// Task types
export const TaskTypeSchema = z.enum(['swap', 'transfer', 'approve', 'nft', 'lend', 'unstake', 'custom']);
export const TaskStatusSchema = z.enum(['pending', 'verified', 'simulated', 'broadcast', 'confirmed', 'failed']);

export interface Task {
  id: string;
  type: z.infer<typeof TaskTypeSchema>;
  chain: Chain;
  status: z.infer<typeof TaskStatusSchema>;
  params: Record<string, any>;
  txHash?: string;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

// AI Surface types
export interface AlphaToken {
  rank: number;
  address: string;
  symbol: string;
  name: string;
  chain: Chain;
  price: number;
  priceChange24h: number;
  volume24h: number;
  liquidity: number;
  buyPressure: number;
  mimoScore?: number;
  signal?: 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
}

export interface WhaleAlert {
  id: string;
  chain: Chain;
  type: 'buy' | 'sell' | 'transfer';
  token?: Token;
  amountUsd: number;
  address: string;
  txHash: string;
  timestamp: Date;
}

export interface NarrativeSignal {
  topic: string;
  momentum: 'rising' | 'falling' | 'stable';
  mentions24h: number;
  sentiment: number; // -1 to 1
  topTokens: string[];
}

// Alert types
export const AlertLevelSchema = z.enum(['info', 'warning', 'critical']);
export interface Alert {
  id: string;
  level: z.infer<typeof AlertLevelSchema>;
  title: string;
  message: string;
  chain?: Chain;
  timestamp: Date;
  read: boolean;
}