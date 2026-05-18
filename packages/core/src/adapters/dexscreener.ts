import axios from 'axios';

const DEXSCREENER_BASE = 'https://api.dexscreener.com';

export const dexScreenerAdapter = {
  async getTrendingTokens(limit = 20) {
    try {
      const { data } = await axios.get(`${DEXSCREENER_BASE}/tokens/featured`);
      return {
        success: true,
        tokens: (data.pairs || []).slice(0, limit).map((pair: any) => ({
          address: pair.baseToken?.address,
          symbol: pair.baseToken?.symbol,
          name: pair.baseToken?.name,
          chain: pair.chainId,
          price: pair.priceUsd,
          liquidity: pair.liquidity?.usd,
          volume24h: pair.volume?.h24,
          change24h: pair.priceChange?.h24,
          txCount: pair.txns?.h24?.total
        }))
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch trending tokens' };
    }
  },

  async getTokenInfo(tokenAddress: string) {
    try {
      const { data } = await axios.get(`${DEXSCREENER_BASE}/tokens/v1/${tokenAddress}`);
      const pair = data.pairs?.[0];
      if (!pair) return { success: false, error: 'Token not found' };
      
      return {
        success: true,
        token: {
          address: tokenAddress,
          symbol: pair.baseToken?.symbol,
          name: pair.baseToken?.name,
          chain: pair.chainId,
          price: pair.priceUsd,
          liquidity: pair.liquidity?.usd,
          volume24h: pair.volume?.h24,
          marketCap: pair.marketCap,
          buyers: pair.txns?.h24?.buys,
          sellers: pair.txns?.h24?.sells
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch token info' };
    }
  },

  async getRecentTrades(tokenAddress: string) {
    try {
      const { data } = await axios.get(`${DEXSCREENER_BASE}/orders/v1/${tokenAddress}`);
      return { success: true, trades: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch trades' };
    }
  },

  async getPairsByChain(chain: string) {
    try {
      const { data } = await axios.get(`${DEXSCREENER_BASE}/pairs/v1/${chain}`);
      return { success: true, pairs: data };
    } catch (error) {
      return { success: false, error: 'Failed to fetch pairs' };
    }
  }
};