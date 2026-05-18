#!/usr/bin/env node
import { agent } from '@chainflow/core';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const prompt = () => {
  rl.question('\n[ChainFlow] > ', async (input) => {
    if (!input.trim()) {
      prompt();
      return;
    }

    if (input === 'exit' || input === 'quit') {
      console.log('Goodbye!');
      rl.close();
      return;
    }

    console.log('\n[Thinking...]\n');
    
    try {
      const response = await agent.run(input);
      console.log(response);
    } catch (error) {
      console.error('[Error]', error instanceof Error ? error.message : 'Unknown error');
    }
    
    prompt();
  });
};

console.log(`
╔═══════════════════════════════════════════╗
║           ChainFlow CLI v0.1.0            ║
║     AI-native Web3 operations platform     ║
╚═══════════════════════════════════════════╝

Type your command in plain English.
Examples:
  - "Show my portfolio on Ethereum"
  - "What's trending on Base?"
  - "Track whale movements on Solana"
  - "Analyze contract 0x1234..."
  - "Send 0.1 ETH to 0xabcd..."

Type 'exit' to quit.
`);

prompt();