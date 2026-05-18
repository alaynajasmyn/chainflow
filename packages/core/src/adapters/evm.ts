import { createPublicClient, createWalletClient, http, formatEther } from 'viem';
import { mainnet, base, arbitrum } from 'viem/chains';

const chains = { ethereum: mainnet, base, arbitrum };

type ChainName = 'ethereum' | 'base' | 'arbitrum';

class EVMRouter {
  private clients: Map<ChainName, ReturnType<typeof createPublicClient>> = new Map();
  private walletClients: Map<ChainName, ReturnType<typeof createWalletClient>> = new Map();

  constructor() {
    for (const [name, chain] of Object.entries(chains) as [ChainName, typeof mainnet][]) {
      const rpcUrl = this.getRPCUrl(name);
      this.clients.set(name, createPublicClient({
        chain,
        transport: http(rpcUrl)
      }));
      this.walletClients.set(name, createWalletClient({
        chain,
        transport: http(rpcUrl)
      }));
    }
  }

  private getRPCUrl(chain: ChainName): string {
    const urls: Record<ChainName, string> = {
      ethereum: process.env.ETH_RPC_URL || 'https://eth.llamarpc.com',
      base: process.env.BASE_RPC_URL || 'https://base.llamarpc.com',
      arbitrum: process.env.ARB_RPC_URL || 'https://arb1.arbitrum.io/rpc',
    };
    return urls[chain];
  }

  async getBalance({ address, chain }: { address: string; chain: ChainName }) {
    const client = this.clients.get(chain);
    if (!client) throw new Error(`Unknown chain: ${chain}`);
    
    const balance = await client.getBalance({ address: address as `0x${string}` });
    return {
      address,
      chain,
      balance: formatEther(balance),
      balanceWei: balance.toString()
    };
  }

  async getTokenBalances({ address, chain }: { address: string; chain: ChainName }) {
    // Placeholder: would fetch from DeFi Llama or similar
    return {
      address,
      chain,
      tokens: []
    };
  }

  async broadcastTransaction(signedTx: string): Promise<string> {
    // Placeholder: broadcast via RPC
    return `0x${Math.random().toString(16).slice(2)}`;
  }

  async getTransactionReceipt(txHash: string, chain: ChainName) {
    const client = this.clients.get(chain);
    if (!client) throw new Error(`Unknown chain: ${chain}`);
    return client.getTransactionReceipt({ hash: txHash as `0x${string}` });
  }

  async call({ to, data, chain }: { to: string; data?: string; chain: ChainName }) {
    const client = this.clients.get(chain);
    if (!client) throw new Error(`Unknown chain: ${chain}`);
    return client.call({
      to: to as `0x${string}`,
      data: data as `0x${string}` | undefined
    });
  }
}

export const walletClient = new EVMRouter();