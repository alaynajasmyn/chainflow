'use client';

import { useState, ChangeEvent } from 'react';
import { Settings, Key, Bell, Globe, Shield, Save } from 'lucide-react';

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('');
  const [telegramToken, setTelegramToken] = useState('');
  const [discordWebhook, setDiscordWebhook] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Configure your ChainFlow agent</p>
      </div>

      <div className="max-w-2xl space-y-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Key className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">API Keys</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">MiMo API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey((e.target as HTMLInputElement).value)}
                placeholder="sk-..."
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
              />
              <p className="text-xs text-muted-foreground mt-1">Used for MiMo V2.5 Pro AI model</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Ethereum RPC URL</label>
              <input
                type="text"
                placeholder="https://eth.llamarpc.com"
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Base RPC URL</label>
              <input
                type="text"
                placeholder="https://base.llamarpc.com"
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Solana RPC URL</label>
              <input
                type="text"
                placeholder="https://api.mainnet-beta.solana.com"
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Bell className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Telegram Bot Token</label>
              <input
                type="password"
                value={telegramToken}
                onChange={(e) => setTelegramToken((e.target as HTMLInputElement).value)}
                placeholder="123456:ABC-DEF..."
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telegram Chat ID</label>
              <input
                type="text"
                placeholder="123456789"
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discord Webhook URL</label>
              <input
                type="text"
                value={discordWebhook}
                onChange={(e) => setDiscordWebhook((e.target as HTMLInputElement).value)}
                placeholder="https://discord.com/api/webhooks/..."
                className="w-full bg-accent border border-border rounded-lg px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div>
                <div className="font-medium text-sm">Transaction Verification</div>
                <div className="text-xs text-muted-foreground">Verify all transactions before broadcast</div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div>
                <div className="font-medium text-sm">Simulation</div>
                <div className="text-xs text-muted-foreground">Simulate before on-chain execution</div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
            <div className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div>
                <div className="font-medium text-sm">High Value Alert</div>
                <div className="text-xs text-muted-foreground">Alert for transactions &gt; 1 ETH</div>
              </div>
              <input type="checkbox" defaultChecked className="w-5 h-5" />
            </div>
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2">
          <Save className="h-4 w-4" />
          Save Settings
        </button>
      </div>
    </div>
  );
}