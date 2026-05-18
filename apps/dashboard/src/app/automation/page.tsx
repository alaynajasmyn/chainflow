'use client';

import { useState } from 'react';
import { Bot, Plus, Play, Pause, Trash2, Clock, Zap } from 'lucide-react';

const mockJobs = [
  { id: '1', name: 'Daily Portfolio Report', trigger: 'cron', schedule: '0 8 * * *', lastRun: '2 hours ago', nextRun: '6 hours', status: 'active', runs: 45 },
  { id: '2', name: 'Alpha Alert - AI Agents', trigger: 'condition', condition: 'momentum > 80', lastRun: '30 min ago', nextRun: '-', status: 'active', runs: 12 },
  { id: '3', name: 'Whale Movement Alert', trigger: 'webhook', lastRun: '1 hour ago', nextRun: '-', status: 'active', runs: 89 },
  { id: '4', name: 'Weekly Strategy Review', trigger: 'cron', schedule: '0 9 * * 1', lastRun: '3 days ago', nextRun: '4 days', status: 'paused', runs: 8 },
];

export default function AutomationPage() {
  const [jobs] = useState(mockJobs);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automation</h1>
          <p className="text-muted-foreground">Cron-driven autonomous workflows</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
          <Plus className="h-4 w-4" />
          New Job
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Active Jobs</span>
          </div>
          <div className="text-3xl font-bold">{jobs.filter(j => j.status === 'active').length}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Total Runs</span>
          </div>
          <div className="text-3xl font-bold">{jobs.reduce((sum, j) => sum + j.runs, 0)}</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Bot className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Success Rate</span>
          </div>
          <div className="text-3xl font-bold">94.2%</div>
        </div>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">Avg Runtime</span>
          </div>
          <div className="text-3xl font-bold">1.2s</div>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <div key={job.id} className="bg-card border border-border rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${job.status === 'active' ? 'bg-green-500' : 'bg-yellow-500'}`} />
              <div>
                <h3 className="font-semibold">{job.name}</h3>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span>Trigger: {job.trigger}</span>
                  {job.schedule && <span>Cron: {job.schedule}</span>}
                  {job.condition && <span>Condition: {job.condition}</span>}
                </div>
                <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                  <span>Last: {job.lastRun}</span>
                  {job.nextRun !== '-' && <span>Next: in {job.nextRun}</span>}
                  <span>Runs: {job.runs}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-accent rounded">
                {job.status === 'active' ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <button className="p-2 hover:bg-accent rounded text-red-500">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}