# ChainFlow

**AI-native Web3 operations platform** — powered by MiMo V2.5 Pro. One agent runtime to talk to any chain, reason over on-chain data, and execute transactions safely.

## What it does

Every Web3 task — explorer, DEX, portfolio tracker, risk scanner, CLI — collapses into one conversation with an agent that has typed adapters for each chain and a strict on-chain task protocol.

**Every AI surface is powered by MiMo V2.5 Pro** — recursive self-improvement AI with 204,800 context window.

## Features

### 9 AI Surfaces

| Surface | URL | Description |
|---------|-----|-------------|
| **Alpha Hunter** | `/alpha` | MiMo scores live trending tokens with buy pressure analysis |
| **X Research** | `/research` | Narrative analysis on any Web3 topic |
| **Narrative Tracker** | `/narrative` | Heat-rank what's moving in Web3 |
| **Daily Briefer** | `/brief` | MiMo writes your morning brief |
| **Strategy Builder** | `/strategy` | Plain English → JSON workflow |
| **Agent Swarm** | `/swarm` | Planner / Executor / Verifier in parallel |
| **Trading Co-pilot** | `/copilot` | AI reads your live order book |
| **Contract Explainer** | `/explainer` | Paste any address, MiMo reads it |
| **Whale Tracker** | `/whale` | Live large transaction alerts |

### Additional Features

- **Portfolio Hub** (`/portfolio`) — Unified DeFi positions across chains
- **Automation** (`/automation`) — Cron-driven autonomous workflows

### Dashboard Features

- **18 working features** — all live, all streaming
- **3 chains** — Ethereum, Base, Arbitrum, Solana (typed adapters)
- **On-chain task protocol** — verify → simulate → broadcast → confirm
- **Multi-sink** — Telegram, Discord, email alerts

## Architecture

```
User Intent → Router (picks model) → Tools (typed adapters) → Protocol (verify→simulate→broadcast→confirm) → Recap
```

```
chainflow/
├── apps/
│   ├── landing/       # Marketing site
│   ├── dashboard/     # Operator console (Next.js 14, 13 pages)
│   └── cli/           # Headless terminal
└── packages/
    ├── core/          # Agent loop, MiMo integration, 6 adapters
    ├── router/        # Model router
    └── shared/        # Shared types & schemas
```

## Tech Stack

- **AI**: MiMo V2.5 Pro
- **Chains**: Ethereum, Base, Arbitrum, Solana
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS

## Quick Start

```bash
# Install dependencies
pnpm install

# Configure environment
cp apps/dashboard/.env.example apps/dashboard/.env.local
# Edit .env.local with your keys

# Start development
pnpm dev
```

## Environment Variables

```env
# AI - MiMo M2.5 Pro
MIMO_API_KEY=your_api_key_here
MIMO_BASE_URL=https://api.mimo.io/anthropic

# Chains (public RPCs for demo)
ETH_RPC_URL=https://eth.llamarpc.com
BASE_RPC_URL=https://base.llamarpc.com
SOL_RPC_URL=https://api.mainnet-beta.solana.com
ARB_RPC_URL=https://arb1.arbitrum.io/rpc

# Data APIs
DEXSCREENER_API_KEY=
DEFLLAMA_API_KEY=
RESERVOIR_API_KEY=

# Sinks
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
DISCORD_WEBHOOK_URL=
```

## Live Demo

| Surface | URL |
|---------|-----|
| Landing | https://chainflow.vercel.app |
| Dashboard | https://chainflow-dashboard.vercel.app |
| Alpha Hunter | https://chainflow-dashboard.vercel.app/alpha |
| X Research | https://chainflow-dashboard.vercel.app/research |

## License

MIT