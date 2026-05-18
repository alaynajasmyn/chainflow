'use client';

import { useState } from 'react';
import { Flame, TrendingUp, TrendingDown } from 'lucide-react';

const narratives = [
  { topic: 'AI Agents', momentum: 'rising', mentions24h: 4521, sentiment: 0.78, topTokens: ['AI16Z', 'VADER', 'LBOT'], change: '+34%' },
  { topic: 'Memecoins', momentum: 'rising', mentions24h: 8932, sentiment: 0.65, topTokens: ['MOODENG', 'PNUT', 'PEPE'], change: '+28%' },
  { topic: 'Liquid Restaking', momentum: 'stable', mentions24h: 1234, sentiment: 0.55, topTokens: ['EIGEN', 'RSTR', 'RPL'], change: '+5%' },
  { topic: 'Real World Assets', momentum: 'rising', mentions24h: 892, sentiment: 0.62, topTokens: ['ONDO', 'TUSD', 'USDC'], change: '+12%' },
  { topic: 'Gaming & GameFi', momentum: 'falling', mentions24h: 672, sentiment: -0.12, topTokens: ['GALA', 'IMX', 'AXS'], change: '-8%' },
];

export default function NarrativePage() {
  const [filter, setFilter] = useState<'all' | 'rising' | 'falling' | 'stable'>('all');

  const filtered = narratives.filter(n => filter === 'all' || n.momentum === filter);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Narrative Tracker</h1>
        <p className="text-muted-foreground">Heat-ranking what's moving in Web3</p>
      </div>

      <div className="flex gap-2">
        {(['all', 'rising', 'falling', 'stable'] as const).map((f) => (
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((n) => (
          <div key={n.topic} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Flame className={`h-5 w-5 ${n.momentum === 'rising' ? 'text-orange-500' : 'text-muted-foreground'}`} />
                <h3 className="font-semibold">{n.topic}</h3>
              </div>
              <span className={`text-sm ${n.momentum === 'rising' ? 'text-green-500' : n.momentum === 'falling' ? 'text-red-500' : 'text-yellow-500'}`}>
                {n.momentum === 'rising' ? <TrendingUp className="h-4 w-4" /> : n.momentum === 'falling' ? <TrendingDown className="h-4 w-4" /> : n.change}
              </span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Mentions (24h)</span>
                <span className="font-medium">{n.mentions24h.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sentiment</span>
                <span className={`font-medium ${n.sentiment > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {(n.sentiment * 100).toFixed(0)}%
                </span>
              </div>
              <div className="pt-3 border-t border-border">
                <span className="text-xs text-muted-foreground">Top Tokens</span>
                <div className="flex gap-2 mt-2">
                  {n.topTokens.map((t) => (
                    <span key={t} className="px-2 py-1 bg-accent rounded text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}