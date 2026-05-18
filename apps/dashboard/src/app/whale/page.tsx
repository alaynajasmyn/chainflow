'use client';

import { useState } from 'react';
import { Fish, ExternalLink, TrendingUp, TrendingDown, Filter } from 'lucide-react';

const mockAlerts = [
  { id: 1, type: 'buy', token: 'ETH', amount: '15.0', amountUsd: 48675, chain: 'ethereum', address: '0x1234...abcd', txHash: '0x5678...efgh', time: '2 min ago', action: 'Bought 15 ETH on Uniswap' },
  { id: 2, type: 'sell', token: 'USDC', amount: '50000', amountUsd: 50000, chain: 'base', address: '0x9876...wxyz', txHash: '0xabcd...ijkl', time: '8 min ago', action: 'Sold 50K USDC on Base' },
  { id: 3, type: 'transfer', token: 'cbBTC', amount: '2.5', amountUsd: 162500, chain: 'base', address: '0xface...1234', txHash: '0xdef0...mnop', time: '15 min ago', action: 'Transferred 2.5 cbBTC to Cold Wallet' },
  { id: 4, type: 'buy', token: 'APE', amount: '120000', amountUsd: 98400, chain: 'ethereum', address: '0xd34d...5678', txHash: '0x9123...qrst', time: '1 hour ago', action: 'Bought 120K APE on Coinbase' },
  { id: 5, type: 'sell', token: 'ETH', amount: '8.0', amountUsd: 25960, chain: 'arbitrum', address: '0xb0b0...9999', txHash: '0x4567...uvwx', time: '2 hours ago', action: 'Sold 8 ETH on Arbitrum' },
];

export default function WhalePage() {
  const [filter, setFilter] = useState<'all' | 'buy' | 'sell' | 'transfer'>('all');

  const filtered = mockAlerts.filter(a => filter === 'all' || a.type === filter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Whale Tracker</h1>
          <p className="text-muted-foreground">Live moves with AI commentary</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm text-muted-foreground">Live tracking</span>
        </div>
      </div>

      <div className="flex gap-2">
        {(['all', 'buy', 'sell', 'transfer'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f ? 'bg-primary text-primary-foreground' : 'bg-accent hover:bg-accent/80'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((alert) => (
          <div key={alert.id} className="bg-card border border-border rounded-lg p-5 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  alert.type === 'buy' ? 'bg-green-500/20' :
                  alert.type === 'sell' ? 'bg-red-500/20' : 'bg-blue-500/20'
                }`}>
                  <Fish className={`h-5 w-5 ${
                    alert.type === 'buy' ? 'text-green-500' :
                    alert.type === 'sell' ? 'text-red-500' : 'text-blue-500'
                  }`} />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-sm font-medium ${
                      alert.type === 'buy' ? 'text-green-500' :
                      alert.type === 'sell' ? 'text-red-500' : 'text-blue-500'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    <span className="text-sm text-muted-foreground">{alert.amount} {alert.token}</span>
                    <span className="text-sm font-medium">${alert.amountUsd.toLocaleString()}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{alert.action}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="capitalize">{alert.chain}</span>
                    <span>Wallet: {alert.address}</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
              <a
                href={`https://etherscan.io/tx/${alert.txHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}