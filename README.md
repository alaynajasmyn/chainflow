# ChainFlow

**AI-native Web3 operations platform** — one agent runtime to talk to any chain, reason over on-chain data, and execute transactions safely.

## What it does

Every Web3 task — explorer, DEX, portfolio tracker, risk scanner, CLI — collapses into one conversation with an agent that has typed adapters for each chain and a strict on-chain task protocol.

## Architecture

```
User Intent → Router (picks model) → Tools (typed adapters) → Protocol (verify→simulate→broadcast→confirm) → Recap
```

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Agent Runtime**: Node.js + TypeScript
- **AI Brain**: Claude API (Anthropic) with structured output
- **Chains**: Ethereum, Base, Solana, Arbitrum (via typed adapters)
- **Data**: DexScreener, DeFi Llama, OpenSea, Reservoir

## Packages

| Package | Description |
|---------|-------------|
| `packages/core` | Agent loop, model router, chain adapters |
| `packages/shared` | Shared types, utils, protocol schemas |
| `apps/landing` | Marketing site |
| `apps/dashboard` | Operator console (18 features) |
| `apps/cli` | Headless terminal interface |

## Key Features

- **9 AI surfaces**: Alpha Hunter, X Research, Narrative Tracker, Daily Briefer, Strategy Builder, Agent Swarm, Trading Co-pilot, Contract Explainer, Whale Tracker
- **Portfolio Hub**: Unified DeFi positions across chains
- **Task Automation**: Cron-driven autonomous workflows
- **On-chain Protocol**: verify → simulate → broadcast → confirm
- **Multi-sink**: Telegram, Discord, email alerts

## Quick Start

```bash
# Install dependencies
pnpm install

# Set environment variables
cp apps/dashboard/.env.example apps/dashboard/.env.local

# Start development
pnpm dev
```

## Environment Variables

```env
# AI
ANTHROPIC_API_KEY=sk-...

# Chains
ETH_RPC_URL=https://eth.llamarpc.com
BASE_RPC_URL=https://base.llamarpc.com
SOL_RPC_URL=https://api.mainnet-beta.solana.com
ARB_RPC_URL=https://arb1.arbitrum.io/rpc

# Data
DEXSCREENER_API_KEY=...
DEFLLAMA_API_KEY=...
RESERVOIR_API_KEY=...

# Sinks
TELEGRAM_BOT_TOKEN=...
TELEGRAM_CHAT_ID=...
DISCORD_WEBHOOK_URL=...
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
```

## License

MIT
