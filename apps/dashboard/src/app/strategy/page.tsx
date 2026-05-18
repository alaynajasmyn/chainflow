'use client';

import { useState, ChangeEvent } from 'react';
import { GitBranch, Play, Copy, ArrowRight } from 'lucide-react';

const mockWorkflows = [
  { id: '1', name: 'DCA to ETH', description: 'Buy $100 ETH every Monday at 9 AM', trigger: 'Schedule', status: 'active', runs: 12 },
  { id: '2', name: 'Alpha Alert', description: 'Notify when AI Agents momentum > 80', trigger: 'Narrative', status: 'active', runs: 3 },
  { id: '3', name: 'Whale Alert', description: 'Alert when whale moves > 10 ETH', trigger: 'On-chain', status: 'paused', runs: 8 },
];

export default function StrategyPage() {
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [plainEnglish, setPlainEnglish] = useState('');

  const handleGenerate = () => {
    // Would call MiMo to generate JSON workflow
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Strategy Builder</h1>
          <p className="text-muted-foreground">Plain English → JSON workflow</p>
        </div>
        <button onClick={() => setView(view === 'list' ? 'editor' : 'list')} className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
          {view === 'list' ? 'New Strategy' : 'View List'}
        </button>
      </div>

      {view === 'editor' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <GitBranch className="h-4 w-4" />
              Strategy Builder
            </h3>
            <textarea
              value={plainEnglish}
              onChange={(e) => setPlainEnglish((e.target as HTMLTextAreaElement).value)}
              placeholder="Describe your strategy in plain English...
              
Example: Every Monday at 9 AM, check if AI Agents momentum is above 70. If yes, buy $100 of ETH using drip.xyz on Base. Send me a Telegram notification with the result."
              className="w-full h-64 bg-accent border border-border rounded-lg p-4 text-sm resize-none"
            />
            <button onClick={handleGenerate} className="mt-4 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium flex items-center gap-2">
              Generate Workflow <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4">Generated JSON</h3>
            <pre className="bg-accent rounded-lg p-4 text-sm font-mono overflow-auto h-64">
{`{
  "name": "Weekly ETH DCA",
  "trigger": {
    "type": "schedule",
    "cron": "0 9 * * 1"
  },
  "conditions": [
    {
      "type": "narrative",
      "metric": "momentum",
      "symbol": "AI Agents",
      "operator": ">",
      "value": 70
    }
  ],
  "actions": [
    {
      "type": "swap",
      "protocol": "drip.xyz",
      "chain": "base",
      "amount": "100",
      "from": "USDC",
      "to": "ETH"
    },
    {
      "type": "notify",
      "channel": "telegram",
      "message": "DCA executed: {{result}}"
    }
  ]
}`}
            </pre>
            <div className="mt-4 flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-accent rounded-lg text-sm hover:bg-accent/80">
                <Copy className="h-4 w-4" /> Copy JSON
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600">
                <Play className="h-4 w-4" /> Deploy
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {mockWorkflows.map((wf) => (
            <div key={wf.id} className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-3 h-3 rounded-full ${wf.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <div>
                  <h3 className="font-semibold">{wf.name}</h3>
                  <p className="text-sm text-muted-foreground">{wf.description}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>Trigger: {wf.trigger}</span>
                    <span>Runs: {wf.runs}</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-accent rounded text-sm hover:bg-accent/80">Edit</button>
                <button className="px-3 py-1 bg-accent rounded text-sm hover:bg-accent/80">
                  {wf.status === 'active' ? 'Pause' : 'Resume'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}