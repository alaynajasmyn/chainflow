'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  TrendingUp,
  Search,
  Flame,
  FileText,
  GitBranch,
  Users,
  LineChart,
  FileCode,
  Fish,
  Wallet,
  Bot,
  Settings
} from 'lucide-react';

const navItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/alpha', icon: TrendingUp, label: 'Alpha Hunter' },
  { href: '/research', icon: Search, label: 'X Research' },
  { href: '/narrative', icon: Flame, label: 'Narrative Tracker' },
  { href: '/brief', icon: FileText, label: 'Daily Briefer' },
  { href: '/strategy', icon: GitBranch, label: 'Strategy Builder' },
  { href: '/swarm', icon: Users, label: 'Agent Swarm' },
  { href: '/copilot', icon: LineChart, label: 'Trading Co-pilot' },
  { href: '/explainer', icon: FileCode, label: 'Contract Explainer' },
  { href: '/whale', icon: Fish, label: 'Whale Tracker' },
  { href: '/portfolio', icon: Wallet, label: 'Portfolio Hub' },
  { href: '/automation', icon: Bot, label: 'Automation' },
  { href: '/settings', icon: Settings, label: 'Settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <span className="text-primary">Chain</span>
          <span>Flow</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, icon: Icon, label }) => (
          <Link
            key={href}
            href={href}
            className={clsx(
              'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}