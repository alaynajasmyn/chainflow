'use client';

import { useState } from 'react';
import { FileCode, Copy, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';

const mockAnalysis = {
  address: '0x...1234',
  name: 'Uniswap V3: Router',
  risk: 'low',
  summary: 'This is a well-known Uniswap V3 Router contract. It is widely used and audited by multiple security firms. No malicious patterns detected.',
  functions: 12,
  audited: true,
  auditFirms: ['Trail of Bits', 'OpenZeppelin', 'Certora'],
  findings: [],
};

export default function ExplainerPage() {
  const [address, setAddress] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result] = useState(mockAnalysis);

  const handleAnalyze = () => {
    if (!address.trim()) return;
    setAnalyzing(true);
    setTimeout(() => setAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contract Explainer</h1>
        <p className="text-muted-foreground">Paste any address, MiMo reads it</p>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex gap-3">
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAnalyze()}
            placeholder="Enter contract address (e.g., 0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D)"
            className="flex-1 bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
          />
          <button
            onClick={handleAnalyze}
            disabled={analyzing}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium disabled:opacity-50"
          >
            {analyzing ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <FileCode className="h-5 w-5 text-primary" />
                <h2 className="font-semibold">{result.name}</h2>
              </div>
              <div className="flex items-center gap-2">
                {result.audited && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-500 rounded text-xs">
                    <CheckCircle className="h-3 w-3" /> Audited
                  </span>
                )}
                <span className={`px-2 py-1 rounded text-xs ${
                  result.risk === 'low' ? 'bg-green-500/20 text-green-500' :
                  result.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  {result.risk} risk
                </span>
              </div>
            </div>
            <div className="bg-accent rounded-lg p-4 text-sm font-mono mb-4">
              {address || result.address}
              <button className="ml-2 text-primary hover:underline">
                <Copy className="h-4 w-4 inline" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground">{result.summary}</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Audit Reports</h3>
            <div className="space-y-2">
              {result.auditFirms.map((firm) => (
                <div key={firm} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                  <span className="text-sm">{firm}</span>
                  <a href="#" className="text-primary text-sm flex items-center gap-1">
                    View <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {result.findings.length > 0 && (
            <div className="bg-card border border-yellow-500/50 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2 text-yellow-500">
                <AlertTriangle className="h-5 w-5" />
                Security Findings
              </h3>
              <div className="space-y-2">
                {result.findings.map((f: any, i: number) => (
                  <div key={i} className="p-3 bg-accent rounded-lg text-sm">
                    <span className="font-medium">{f.title}</span>
                    <p className="text-muted-foreground mt-1">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Contract Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Functions</span>
                <span className="font-medium">{result.functions}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Network</span>
                <span className="font-medium">Ethereum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="font-medium">2 days ago</span>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Read Functions</h3>
            <div className="space-y-2 text-sm">
              {['getAmountsOut', 'quoteExactInput', 'swapExactTokensForTokens'].map((fn) => (
                <div key={fn} className="flex items-center justify-between p-2 bg-accent rounded">
                  <span className="font-mono text-xs">{fn}</span>
                  <button className="text-primary text-xs">Call</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}