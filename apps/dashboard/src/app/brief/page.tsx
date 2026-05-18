'use client';

import { useState } from 'react';
import { FileText, Sparkles, Clock } from 'lucide-react';

const mockBriefs = [
  { id: 1, title: 'Market Overview', summary: 'BTC holding $65k support. ETH/BTC ratio recovering. DeFi TVL up 4.2% in 7 days. Altcoin season index at 34/100.', time: 'Today 8:00 AM', read: false },
  { id: 2, title: 'Alpha Opportunities', summary: 'AI Agents sector showing strongest momentum. Virtuals Protocol TVL surging. Look for presale gems on Solana.', time: 'Today 8:00 AM', read: false },
  { id: 3, title: 'Risk Alerts', summary: 'Stablecoin depeg watch: None. High volatility tokens: PEPE, FLOKI. TVL declining protocols: Kenzo, Prisma.', time: 'Today 8:00 AM', read: true },
  { id: 4, title: 'Whale Movements', summary: '3 large ETH movements yesterday. 0x1234... accumulated 100 ETH over 24h. Notable: Coinbase outflows increased.', time: 'Yesterday', read: true },
];

export default function BriefPage() {
  const [selected, setSelected] = useState(mockBriefs[0]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Daily Briefer</h1>
        <p className="text-muted-foreground">MiMo writes your morning brief at 8 AM UTC</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-2">
          {mockBriefs.map((brief) => (
            <button
              key={brief.id}
              onClick={() => setSelected(brief)}
              className={`w-full text-left p-4 rounded-lg border transition-colors ${
                selected.id === brief.id ? 'bg-primary/10 border-primary' : 'bg-card border-border hover:bg-accent'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium text-sm">{brief.title}</span>
                {!brief.read && <span className="w-2 h-2 rounded-full bg-primary" />}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {brief.time}
              </div>
            </button>
          ))}
        </div>

        <div className="lg:col-span-3 bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">{selected.title}</h2>
          </div>
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">{selected.summary}</p>
          </div>
          <div className="mt-6 pt-6 border-t border-border flex gap-3">
            <button className="px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">Share</button>
            <button className="px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">Archive</button>
            <button className="px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
}