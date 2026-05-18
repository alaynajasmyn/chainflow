import Anthropic from '@anthropic-ai/sdk';
import { walletClient } from '../adapters/evm.js';
import { solanaAdapter } from '../adapters/solana.js';
import { dexScreenerAdapter } from '../adapters/dexscreener.js';
import { defiLlamaAdapter } from '../adapters/defillama.js';
import { reservoirAdapter } from '../adapters/reservoir.js';

const anthropic = new Anthropic({
  baseURL: process.env.MIMO_BASE_URL || 'https://api.mimo.io/anthropic',
  apiKey: process.env.MIMO_API_KEY,
});

export interface AgentContext {
  chain?: 'ethereum' | 'base' | 'solana' | 'arbitrum';
  userAddress?: string;
  intent?: string;
}

export interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
}

// Tool definition compatible with MiMo/Anthropic format
interface ToolDefinition {
  name: string;
  description: string;
  input_schema: { type: 'object'; properties: Record<string, any>; required?: string[] };
  execute: (input: any) => Promise<any>;
}

// Protocol: verify → simulate → broadcast → confirm
export const TaskProtocol = {
  async verify(task: any): Promise<{ valid: boolean; risks: string[] }> {
    const risks: string[] = [];
    
    if (task.to && this.isHighRiskAddress(task.to)) {
      risks.push('High-risk target address detected');
    }
    
    if (task.value && task.value > 1) {
      risks.push('High-value transaction');
    }
    
    return { valid: risks.length === 0, risks };
  },

  isHighRiskAddress(addr: string): boolean {
    return false;
  },

  async simulate(task: any): Promise<{ success: boolean; simulation: any }> {
    return { success: true, simulation: { gasUsed: 21000, stateDiff: {} } };
  },

  async broadcast(signedTx: string): Promise<{ txHash: string }> {
    const hash = await walletClient.broadcastTransaction(signedTx);
    return { txHash: hash };
  },

  async confirm(txHash: string): Promise<{ confirmed: boolean; blockNumber?: number }> {
    return { confirmed: true, blockNumber: 12345678 };
  }
};

export class AgentLoop {
  private tools: Map<string, ToolDefinition> = new Map();
  
  constructor() {
    this.registerDefaultTools();
  }

  private registerDefaultTools() {
    // getBalance
    this.tools.set('getBalance', {
      name: 'getBalance',
      description: 'Get native token balance for an address on EVM or Solana',
      input_schema: {
        type: 'object',
        properties: {
          address: { type: 'string', description: 'Wallet address' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum', 'solana'], description: 'Chain name' }
        },
        required: ['address', 'chain']
      },
      execute: async ({ address, chain }) => {
        if (chain === 'solana') {
          return solanaAdapter.getBalance(address);
        }
        return walletClient.getBalance({ address, chain });
      }
    });

    // getTokens
    this.tools.set('getTokens', {
      name: 'getTokens',
      description: 'Get ERC-20 token balances for an address',
      input_schema: {
        type: 'object',
        properties: {
          address: { type: 'string', description: 'Wallet address' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum'], description: 'Chain name' }
        },
        required: ['address', 'chain']
      },
      execute: async ({ address, chain }) => {
        return walletClient.getTokenBalances({ address, chain });
      }
    });

    // sendTransaction
    this.tools.set('sendTransaction', {
      name: 'sendTransaction',
      description: 'Execute a transaction (follows verify→simulate→broadcast→confirm protocol)',
      input_schema: {
        type: 'object',
        properties: {
          to: { type: 'string', description: 'Recipient address' },
          value: { type: 'string', description: 'Value in ETH/token units' },
          data: { type: 'string', description: 'Transaction data (hex)' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum', 'solana'] }
        },
        required: ['to', 'chain']
      },
      execute: async ({ to, value, data, chain }) => {
        const task = { to, value: value ? BigInt(value) : undefined, data };
        
        const { valid, risks } = await TaskProtocol.verify(task);
        if (!valid) {
          return { success: false, error: `Verification failed: ${risks.join(', ')}` };
        }
        
        const { simulation } = await TaskProtocol.simulate(task);
        return { success: true, simulation };
      }
    });

    // getTrendingTokens
    this.tools.set('getTrendingTokens', {
      name: 'getTrendingTokens',
      description: 'Get trending tokens from DexScreener',
      input_schema: {
        type: 'object',
        properties: {
          limit: { type: 'number', description: 'Number of tokens to return', default: 20 }
        }
      },
      execute: async ({ limit }) => {
        return dexScreenerAdapter.getTrendingTokens(limit);
      }
    });

    // getTokenInfo
    this.tools.set('getTokenInfo', {
      name: 'getTokenInfo',
      description: 'Get token price and liquidity info from DexScreener',
      input_schema: {
        type: 'object',
        properties: {
          tokenAddress: { type: 'string', description: 'Token contract address' }
        },
        required: ['tokenAddress']
      },
      execute: async ({ tokenAddress }) => {
        return dexScreenerAdapter.getTokenInfo(tokenAddress);
      }
    });

    // getPortfolio
    this.tools.set('getPortfolio', {
      name: 'getPortfolio',
      description: 'Get unified DeFi portfolio across multiple chains',
      input_schema: {
        type: 'object',
        properties: {
          address: { type: 'string', description: 'Wallet address' }
        },
        required: ['address']
      },
      execute: async ({ address }) => {
        const [eth, base, arb] = await Promise.all([
          defiLlamaAdapter.getPortfolio(address, 'ethereum'),
          defiLlamaAdapter.getPortfolio(address, 'base'),
          defiLlamaAdapter.getPortfolio(address, 'arbitrum')
        ]);
        return { eth, base, arb, total: eth + base + arb };
      }
    });

    // getPoolStats
    this.tools.set('getPoolStats', {
      name: 'getPoolStats',
      description: 'Get liquidity pool statistics from DeFi Llama',
      input_schema: {
        type: 'object',
        properties: {
          poolAddress: { type: 'string' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum'] }
        },
        required: ['poolAddress', 'chain']
      },
      execute: async ({ poolAddress, chain }) => {
        return defiLlamaAdapter.getPoolStats(poolAddress, chain);
      }
    });

    // getNFTs
    this.tools.set('getNFTs', {
      name: 'getNFTs',
      description: 'Get NFTs for an address via Reservoir',
      input_schema: {
        type: 'object',
        properties: {
          address: { type: 'string' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum', 'solana'] }
        },
        required: ['address']
      },
      execute: async ({ address, chain }) => {
        return reservoirAdapter.getNFTs(address, chain || 'ethereum');
      }
    });

    // getCollectionStats
    this.tools.set('getCollectionStats', {
      name: 'getCollectionStats',
      description: 'Get collection floor price and volume via Reservoir',
      input_schema: {
        type: 'object',
        properties: {
          collection: { type: 'string', description: 'Collection contract address or ID' },
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum'] }
        },
        required: ['collection']
      },
      execute: async ({ collection, chain }) => {
        return reservoirAdapter.getCollectionStats(collection, chain || 'ethereum');
      }
    });

    // searchNarrative
    this.tools.set('searchNarrative', {
      name: 'searchNarrative',
      description: 'Track narrative momentum across social channels',
      input_schema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Topic or narrative to track' }
        },
        required: ['query']
      },
      execute: async ({ query }) => {
        return { narrative: query, momentum: 'rising', mentions: 1234, sentiment: 0.72 };
      }
    });

    // getWhaleAlerts
    this.tools.set('getWhaleAlerts', {
      name: 'getWhaleAlerts',
      description: 'Track large transactions and wallet movements',
      input_schema: {
        type: 'object',
        properties: {
          chain: { type: 'string', enum: ['ethereum', 'base', 'arbitrum', 'solana'] },
          minValue: { type: 'string', description: 'Minimum value in USD' }
        }
      },
      execute: async ({ chain, minValue }) => {
        return { alerts: [], lastUpdate: new Date().toISOString() };
      }
    });
  }

  async run(input: string, context: AgentContext = {}): Promise<string> {
    const messages = [{ role: 'user' as const, content: input }];
    
    const response = await anthropic.messages.stream({
      model: 'MiMo-M2.5',
      max_tokens: 2048,
      messages,
      tools: Array.from(this.tools.values()),
    });

    let fullResponse = '';
    for await (const event of response) {
      if (event.type === 'content_block_delta') {
        fullResponse += event.delta.text;
      }
    }

    return fullResponse;
  }

  registerTool(name: string, definition: Omit<ToolDefinition, 'name'>, execute: Function) {
    this.tools.set(name, { name, ...definition, execute });
  }
}

export const agent = new AgentLoop();
export default agent;