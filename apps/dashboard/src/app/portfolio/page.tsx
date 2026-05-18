'use client';

import { useState } from 'react';
import { Wallet, Plus, ExternalLink, RefreshCw, TrendingUp, TrendingDown } from 'lucide-react';

const mockPositions = [
  { protocol: 'Aave V3', chain: 'ethereum', type: 'lending', tokens: ['USDC', 'ETH'], value: 4521.89, apy: 3.2, healthFactor: 1.85 },
  { protocol: 'Uniswap V3', chain: 'ethereum', type: 'liquidity', tokens: ['ETH/USDC'], value: 2340.50, apy: 12.4 },
  { protocol: 'Aerodrome', chain: 'base', type: 'liquidity', tokens: ['cbBTC/FLOW'], value: 1890.00, apy: 8.7 },
  { protocol: 'Stader', chain: 'base', type: 'staking', tokens: ['ETHx'], value: 3100.00, apy: 4.1 },
  { protocol: 'Lido', chain: 'ethereum', type: 'staking', tokens: ['stETH'], value: 1580.00, apy: 3.8 },
];

const mockAssets = [
  { token: 'ETH', balance: 8.42, value: 27365.34, change: '+2.4%', chain: 'ethereum' },
  { token: 'cbBTC', balance: 0.52, value: 33800.00, change: '+1.8%', chain: 'base' },
  { token: 'USDC', balance: 3210.50, value: 3210.50, change: '0%', chain: 'ethereum' },
  { token: 'AERO', balance: 1200, value: 1440.00, change: '+5.2%', chain: 'base' },
];

export default function PortfolioPage() {
  const [refreshing, setRefreshing] = useState(false);

  const totalValue = mockPositions.reduce((sum, p) => sum + p.value, 0);
  const totalAssets = mockAssets.reduce((sum, a) => sum + a.value, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Hub</h1>
          <p className="text-muted-foreground">Unified DeFi positions across chains</p>
        </div>
        <button
          onClick={() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1500); }}
          className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Value</span>
          </div>
          <div className="text-3xl font-bold">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          <div className="text-sm text-green-500 mt-1">+${(totalValue * 0.024).toFixed(2)} (2.4%)</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Assets</span>
          </div>
          <div className="text-3xl font-bold">${totalAssets.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Positions</span>
          </div>
          <div className="text-3xl font-bold">{mockPositions.length}</div>
          <div className="text-sm text-muted-foreground mt-1">across 2 chains</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold">Assets</h2>
        </div>
        <div className="divide-y divide-border">
          {mockAssets.map((asset) => (
            <div key={asset.token} className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold">
                  {asset.token.slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium">{asset.token}</div>
                  <div className="text-xs text-muted-foreground capitalize">{asset.chain}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">${asset.value.toLocaleString()}</div>
                <div className={`text-xs ${asset.change.startsWith('+') ? 'text-green-500' : asset.change.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>
                  {asset.change}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h2 className="font-semibold">Active Positions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent text-xs text-muted-foreground">
              <tr>
                <th className="px-6 py-3 text-left">Protocol</th>
                <th className="px-6 py-3 text-left">Chain</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Tokens</th>
                <th className="px-6 py-3 text-right">Value</th>
                <th className="px-6 py-3 text-right">APY</th>
                <th className="px-6 py-3 text-center">Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {mockPositions.map((pos) => (
                <tr key={pos.protocol} className="hover:bg-accent/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-sm">{pos.protocol}</td>
                  <td className="px-6 py-4 text-sm capitalize">{pos.chain}</td>
                  <td className="px-6 py-4 text-sm">{pos.type}</td>
                  <td className="px-6 py-4 text-sm">{pos.tokens.join(', ')}</td>
                  <td className="px-6 py-4 text-sm text-right">${pos.value.toLocaleString()}</td>
                  <td className="px-6 py-4 text-sm text-right text-green-500">{pos.apy}%</td>
                  <td className="px-6 py-4 text-center">
                    {pos.healthFactor ? (
                      <span className={`text-xs ${pos.healthFactor > 1.5 ? 'text-green-500' : 'text-yellow-500'}`}>
                        {pos.healthFactor}x
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">-</span>
                    )}
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