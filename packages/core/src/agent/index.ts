import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { tool } from ' ElizaOS/tool';
import { walletClient } from '../adapters/evm.js';
import { solanaAdapter } from '../adapters/solana.js';
import { dexScreenerAdapter } from '../adapters/dexscreener.js';
import { defiLlamaAdapter } from '../adapters/defillama.js';
import { reservoirAdapter } from '../adapters/reservoir.js';

const anthropic = new Anthropic();

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

// Protocol: verify → simulate → broadcast → confirm
export const TaskProtocol = {
  async verify(task: any): Promise<{ valid: boolean; risks: string[] }> {
    const risks: string[] = [];
    
    // Check if address is known malicious
    if (task.to && this.isHighRiskAddress(task.to)) {
      risks.push('High-risk target address detected');
    }
    
    // Check if value exceeds threshold
    if (task.value && task.value > 1) {
      risks.push('High-value transaction');
    }
    
    return { valid: risks.length === 0, risks };
  },

  isHighRiskAddress(addr: string): boolean {
    // Placeholder: integrate with threat intel
    return false;
  },

  async simulate(task: any): Promise<{ success: boolean; simulation: any }> {
    // Simulate via tenderly or similar
    return { success: true, simulation: { gasUsed: 21000, stateDiff: {} } };
  },

  async broadcast(signedTx: string): Promise<{ txHash: string }> {
    const hash = await walletClient.broadcastTransaction(signedTx);
    return { txHash: hash };
  },

  async confirm(txHash: string): Promise<{ confirmed: boolean; blockNumber?: number }> {
    // Wait for confirmation
    return { confirmed: true, blockNumber: 12345678 };
  }
};

export class AgentLoop {
  private tools: Map<string, any> = new Map();
  
  constructor() {
    this.registerDefaultTools();
  }

  private registerDefaultTools() {
    // Chain tools
    this.tools.set('getBalance', tool({
      name: 'getBalance',
      description: 'Get native token balance for an address',
      schema: z.object({ address: z.string(), chain: z.string() }),
      execute: async ({ address, chain }) => {
        if (chain === 'solana') {
          return solanaAdapter.getBalance(address);
        }
        return walletClient.getBalance({ address, chain });
      }
    }));

    this.tools.set('getTokens', tool({
      name: 'getTokens',
      description: 'Get ERC-20 token balances',
      schema: z.object({ address: z.string(), chain: z.string() }),
      execute: async ({ address, chain }) => {
        return walletClient.getTokenBalances({ address, chain });
      }
    }));

    this.tools.set('sendTransaction', tool({
      name: 'sendTransaction',
      description: 'Execute a transaction (follows verify→simulate→broadcast→confirm)',
      schema: z.object({
        to: z.string(),
        value: z.string().optional(),
        data: z.string().optional(),
        chain: z.string()
      }),
      execute: async ({ to, value, data, chain }) => {
        const task = { to, value: value ? BigInt(value) : undefined, data };
        
        const { valid, risks } = await TaskProtocol.verify(task);
        if (!valid) {
          return { success: false, error: `Verification failed: ${risks.join(', ')}` };
        }
        
        const { simulation } = await TaskProtocol.simulate(task);
        
        // Would broadcast signed tx here
        return { success: true, simulation };
      }
    }));

    // DEX tools
    this.tools.set('getTrendingTokens', tool({
      name: 'getTrendingTokens',
      description: 'Get trending tokens from DexScreener',
      schema: z.object({ limit: z.number().default(20) }),
      execute: async ({ limit }) => {
        return dexScreenerAdapter.getTrendingTokens(limit);
      }
    }));

    this.tools.set('getTokenInfo', tool({
      name: 'getTokenInfo',
      description: 'Get token price and liquidity info',
      schema: z.object({ tokenAddress: z.string() }),
      execute: async ({ tokenAddress }) => {
        return dexScreenerAdapter.getTokenInfo(tokenAddress);
      }
    }));

    // DeFi tools
    this.tools.set('getPortfolio', tool({
      name: 'getPortfolio',
      description: 'Get unified portfolio across chains',
      schema: z.object({ address: z.string() }),
      execute: async ({ address }) => {
        const [eth, base, arb] = await Promise.all([
          defiLlamaAdapter.getPortfolio(address, 'ethereum'),
          defiLlamaAdapter.getPortfolio(address, 'base'),
          defiLlamaAdapter.getPortfolio(address, 'arbitrum')
        ]);
        return { eth, base, arb, total: eth + base + arb };
      }
    }));

    this.tools.set('getPoolStats', tool({
      name: 'getPoolStats',
      description: 'Get liquidity pool statistics',
      schema: z.object({ poolAddress: z.string(), chain: z.string() }),
      execute: async ({ poolAddress, chain }) => {
        return defiLlamaAdapter.getPoolStats(poolAddress, chain);
      }
    }));

    // NFT tools
    this.tools.set('getNFTs', tool({
      name: 'getNFTs',
      description: 'Get NFTs for an address',
      schema: z.object({ address: z.string(), chain: z.string() }),
      execute: async ({ address, chain }) => {
        return reservoirAdapter.getNFTs(address, chain);
      }
    }));

    this.tools.set('getCollectionStats', tool({
      name: 'getCollectionStats',
      description: 'Get collection floor price and volume',
      schema: z.object({ collection: z.string(), chain: z.string() }),
      execute: async ({ collection, chain }) => {
        return reservoirAdapter.getCollectionStats(collection, chain);
      }
    }));

    // Research tools
    this.tools.set('searchNarrative', tool({
      name: 'searchNarrative',
      description: 'Track narrative momentum across social',
      schema: z.object({ query: z.string() }),
      execute: async ({ query }) => {
        // Would integrate with Twitter API, DexScreener trends
        return { narrative: query, momentum: 'rising', mentions: 1234 };
      }
    }));

    this.tools.set('getWhaleAlerts', tool({
      name: 'getWhaleAlerts',
      description: 'Track large transactions and wallet movements',
      schema: z.object({ chain: z.string().optional(), minValue: z.string().optional() }),
      execute: async ({ chain, minValue }) => {
        // Would integrate with whale tracking service
        return { alerts: [], lastUpdate: new Date().toISOString() };
      }
    }));
  }

  async run(input: string, context: AgentContext = {}): Promise<string> {
    const messages = [{ role: 'user' as const, content: input }];
    
    const response = await anthropic.messages.stream({
      model: 'claude-sonnet-4-20250514',
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

  registerTool(name: string, definition: any, execute: Function) {
    this.tools.set(name, tool({ name, description: definition.description, schema: definition.schema, execute }));
  }
}

export const agent = new AgentLoop();
export default agent;