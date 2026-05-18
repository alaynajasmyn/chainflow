'use client';

import { useState } from 'react';
import { Users, Play, Pause, RefreshCw } from 'lucide-react';

const mockAgents = [
  { id: 'planner', name: 'Planner', role: 'Breaks down complex tasks into steps', status: 'running', tasks: 24 },
  { id: 'executor', name: 'Executor', role: 'Calls tools and executes actions', status: 'running', tasks: 18 },
  { id: 'verifier', name: 'Verifier', role: 'Validates results and handles errors', status: 'idle', tasks: 0 },
];

const mockLogs = [
  { time: '12:34:56', agent: 'Planner', message: 'Decomposing task: Track whale movement on Base', level: 'info' },
  { time: '12:34:57', agent: 'Executor', message: 'Calling getWhaleAlerts with chain=base', level: 'info' },
  { time: '12:34:58', agent: 'Verifier', message: 'Result validated, 3 alerts found', level: 'success' },
];

export default function SwarmPage() {
  const [running, setRunning] = useState(true);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Agent Swarm</h1>
          <p className="text-muted-foreground">Three-agent parallel execution</p>
        </div>
        <button
          onClick={() => setRunning(!running)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
            running ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
          }`}
        >
          {running ? <><Pause className="h-4 w-4" /> Pause</> : <><Play className="h-4 w-4" /> Run</>}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {mockAgents.map((agent) => (
          <div key={agent.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">{agent.name}</h3>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${
                agent.status === 'running' ? 'bg-green-500/20 text-green-500' : 'bg-accent text-muted-foreground'
              }`}>
                {agent.status}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{agent.role}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Tasks processed:</span>
              <span className="font-medium">{agent.tasks}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-semibold">Execution Log</h2>
          <button className="p-2 hover:bg-accent rounded">
            <RefreshCw className="h-4 w-4" />
          </button>
        </div>
        <div className="font-mono text-sm">
          {mockLogs.map((log, i) => (
            <div key={i} className="px-6 py-3 border-b border-border last:border-0 flex gap-4">
              <span className="text-muted-foreground">{log.time}</span>
              <span className="text-primary">[{log.agent}]</span>
              <span className={log.level === 'success' ? 'text-green-500' : 'text-foreground'}>{log.message}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}