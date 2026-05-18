'use client';

import { useState, ChangeEvent } from 'react';
import { Search, TrendingUp, FileText, ExternalLink } from 'lucide-react';

const mockResults = [
  { id: 1, title: 'AI Agents Narrative Analysis', summary: 'AI agents sector showing strong momentum with 340% increase in social mentions. Key players: ai16z, Virtuals Protocol, AIx. sentiment: bullish.', source: 'MiMo Analysis', time: '5 min ago', relevance: 94 },
  { id: 2, title: 'DeFi Liquidity Trends Q2 2024', summary: 'Lending protocols gaining TVL faster than DEXs. Aave, Morpho leading. Uniswap v4 hooks driving innovation.', source: 'ChainFlow Research', time: '1 hour ago', relevance: 87 },
  { id: 3, title: 'Memecoin Cycle Analysis', summary: 'Current cycle showing shorter duration patterns. PEPE, WOjak, PNUT clones emerging. High risk/reward dynamic.', source: 'MiMo Analysis', time: '2 hours ago', relevance: 81 },
];

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSearch = () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">X Research</h1>
        <p className="text-muted-foreground">AI-powered narrative and topic analysis</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery((e.target as HTMLInputElement).value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Ask about any Web3 topic, narrative, or trend..."
              className="w-full bg-accent border border-border rounded-lg pl-10 pr-4 py-3 text-sm"
            />
          </div>
          <button
            onClick={handleSearch}
            disabled={isAnalyzing}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {isAnalyzing ? 'Analyzing...' : 'Research'}
          </button>
        </div>
        <div className="flex gap-2 mt-3">
          {['AI Agents', 'Memecoins', 'DeFi', 'Layer2', 'NFT'].map((tag) => (
            <button key={tag} onClick={() => setQuery(tag)} className="px-3 py-1 bg-accent rounded-full text-xs hover:bg-accent/80">
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Analysis Results</h2>
        {mockResults.map((result) => (
          <div key={result.id} className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <h3 className="font-semibold">{result.title}</h3>
              </div>
              <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">{result.relevance}%</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{result.summary}</p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {result.source}
                </span>
                <span>{result.time}</span>
              </div>
              <button className="flex items-center gap-1 hover:text-primary">
                Read more <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}