'use client';

import { useState } from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight, Flame } from 'lucide-react';

const mockTokens = [
  { rank: 1, symbol: 'MOODENG', name: 'Moo Deng', chain: 'ethereum', price: 0.0234, change24h: 127.4, volume24h: 2340000, liquidity: 890000, buyPressure: 78 },
  { rank: 2, symbol: 'PNUT', name: 'Peanut', chain: 'base', price: 1.23, change24h: 45.2, volume24h: 1200000, liquidity: 450000, buyPressure: 65 },
  { rank: 3, symbol: 'AI16Z', name: 'ai16z', chain: 'solana', price: 2.45, change24h: 38.9, volume24h: 890000, liquidity: 320000, buyPressure: 72 },
  { rank: 4, symbol: 'VADER', name: 'Vader Protocol', chain: 'arbitrum', price: 0.89, change24h: 22.1, volume24h: 560000, liquidity: 210000, buyPressure: 58 },
  { rank: 5, symbol: 'CHEX', name: 'ChEX', chain: 'ethereum', price: 0.045, change24h: 18.7, volume24h: 340000, liquidity: 180000, buyPressure: 61 },
];

export default function AlphaPage() {
  const [tokens] = useState(mockTokens);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Alpha Hunter</h1>
        <p className="text-muted-foreground">Real-time MiMo scored token rankings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="text-sm text-muted-foreground">Hot Tokens</span>
          </div>
          <div className="text-2xl font-bold">3</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Avg Score</span>
          </div>
          <div className="text-2xl font-bold">68.4</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">New Today</span>
          </div>
          <div className="text-2xl font-bold">12</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold">Trending Tokens</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent text-xs text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Token</th>
                <th className="px-6 py-3 text-left">Chain</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">24h %</th>
                <th className="px-6 py-3 text-right">Volume</th>
                <th className="px-6 py-3 text-right">Liquidity</th>
                <th className="px-6 py-3 text-right">Buy Pressure</th>
                <th className="px-6 py-3 text-center">Signal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tokens.map((token) => (
                <tr key={token.symbol} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 text-sm">{token.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                        {token.symbol.slice(0, 2)}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{token.symbol}</div>
                        <div className="text-xs text-muted-foreground">{token.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm capitalize">{token.chain}</td>
                  <td className="px-6 py-4 text-sm text-right">${token.price.toFixed(4)}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center gap-1 text-sm ${token.change24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {token.change24h > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                      {token.change24h.toFixed(1)}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">${(token.volume24h / 1000).toFixed(1)}K</td>
                  <td className="px-6 py-4 text-sm text-right">${(token.liquidity / 1000).toFixed(1)}K</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-accent rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${token.buyPressure}%` }}
                        />
                      </div>
                      <span className="text-sm w-8">{token.buyPressure}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-500/20 text-green-500">
                      Strong Buy
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}