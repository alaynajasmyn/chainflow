import axios from 'axios';

const RESERVOIR_BASE = 'https://api.reservoir.tools';

export const reservoirAdapter = {
  async getNFTs(address: string, chain = 'ethereum') {
    try {
      const { data } = await axios.get(`${RESERVOIR_BASE}/users/${address}/tokens/v6`, {
        headers: process.env.RESERVOIR_API_KEY ? { 'x-api-key': process.env.RESERVOIR_API_KEY } : {}
      });
      return { success: true, nfts: data.tokens || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch NFTs' };
    }
  },

  async getCollectionStats(collection: string, chain = 'ethereum') {
    try {
      const { data } = await axios.get(`${RESERVOIR_BASE}/collections/v5/${collection}`, {
        headers: process.env.RESERVOIR_API_KEY ? { 'x-api-key': process.env.RESERVOIR_API_KEY } : {}
      });
      const collection = data.collection;
      return {
        success: true,
        stats: {
          id: collection?.id,
          name: collection?.name,
          floorPrice: collection?.floorAsk?.price?.amount?.usd,
          volume24h: collection?.volume?.['1day'],
          volume7d: collection?.volume?.['7day'],
          sales24h: collection?.sales?.['1day'],
          ownerCount: collection?.ownerCount,
          totalSupply: collection?.tokenCount
        }
      };
    } catch (error) {
      return { success: false, error: 'Failed to fetch collection stats' };
    }
  },

  async getFloorOrders(collection: string, chain = 'ethereum') {
    try {
      const { data } = await axios.get(`${RESERVOIR_BASE}/orders/v5`, {
        params: { collection, side: 'sell', limit: 20 },
        headers: process.env.RESERVOIR_API_KEY ? { 'x-api-key': process.env.RESERVOIR_API_KEY } : {}
      });
      return { success: true, orders: data.orders || [] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch floor orders' };
    }
  },

  async getTokenDetails(collection: string, tokenId: string, chain = 'ethereum') {
    try {
      const { data } = await axios.get(`${RESERVOIR_BASE}/tokens/v6`, {
        params: { collection, token: tokenId },
        headers: process.env.RESERVOIR_API_KEY ? { 'x-api-key': process.env.RESERVOIR_API_KEY } : {}
      });
      return { success: true, token: data.tokens?.[0] };
    } catch (error) {
      return { success: false, error: 'Failed to fetch token details' };
    }
  }
};