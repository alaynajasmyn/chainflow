import axios from 'axios';

const DEFLLAMA_BASE = 'https://api.llama.fi';

export const defiLlamaAdapter = {
  async getPortfolio(address: string, chain: string) {
    try {
      const { data } = await axios.get(`${DEFLLAMA_BASE}/protocols`);
      // Simplified placeholder
      return 0;
    } catch (error) {
      return 0;
    }
  },

  async getPoolStats(poolAddress: string, chain: string) {
    try {
      const { data } = await axios.get(`${DEFLLAMA_BASE}/pool/${chain}/${poolAddress}`);
      return { success: true, stats: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch pool stats' };
    }
  },

  async getTokenPrice(tokenId: string) {
    try {
      const { data } = await axios.get(`${DEFLLAMA_BASE}/prices/current/${tokenId}`);
      return { success: true, price: data[tokenId]?.price };
    } catch (error) {
      return { success: false, error: 'Failed to fetch price' };
    }
  },

  async getTVLByChain(chain: string) {
    try {
      const { data } = await axios.get(`${DEFLLAMA_BASE}/protocols?chain=${chain}`);
      return { success: true, tvl: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch TVL' };
    }
  }
};