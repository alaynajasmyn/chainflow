import { TrendingUp, Users, Fish, Flame, LineChart } from 'lucide-react';

const stats = [
  { label: 'Portfolio Value', value: '$12,432.00', change: '+2.4%', icon: LineChart },
  { label: 'Active Positions', value: '8', change: '+2 today', icon: TrendingUp },
  { label: 'Whale Alerts', value: '14', change: '3 high priority', icon: Fish },
  { label: 'Narrative Score', value: '73', change: 'Rising', icon: Flame },
];

const recentAlerts = [
  { id: 1, type: 'whale', message: '0x1234... swapped 10 ETH for PEPE', time: '2m ago', severity: 'warning' },
  { id: 2, type: 'narrative', message: 'AI agents narrative gaining traction', time: '15m ago', severity: 'info' },
  { id: 3, type: 'alpha', message: 'New token detected: MOODENG', time: '1h ago', severity: 'success' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Your AI-native Web3 command center</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, change, icon: Icon }) => (
          <div key={label} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-muted-foreground text-sm">{label}</span>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-sm text-green-500 mt-1">{change}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Alerts</h2>
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  alert.severity === 'warning' ? 'bg-yellow-500' :
                  alert.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Analyze Wallet', action: 'Paste any address' },
              { label: 'Track Token', action: 'Monitor any token' },
              { label: 'Build Strategy', action: 'Create workflow' },
              { label: 'Set Alert', action: 'Configure notifications' },
            ].map(({ label, action }) => (
              <button key={label} className="p-4 bg-accent rounded-lg text-left hover:bg-accent/80 transition-colors">
                <div className="font-medium text-sm">{label}</div>
                <div className="text-xs text-muted-foreground">{action}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Agent Terminal</h2>
        <div className="bg-black rounded-lg p-4 font-mono text-sm h-48 overflow-y-auto text-green-400">
          <div className="text-gray-500">// Ask me anything about Web3...</div>
          <div className="text-gray-500">// Try: "Show my portfolio on Base"</div>
        </div>
        <div className="mt-3 flex gap-2">
          <input 
            type="text" 
            placeholder="Type your command..."
            className="flex-1 bg-accent border border-border rounded-lg px-4 py-2 text-sm"
          />
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}