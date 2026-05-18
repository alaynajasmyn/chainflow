export class ModelRouter {
  route(intent: string): { model: string; reasoning: string } {
    const lower = intent.toLowerCase();
    
    if (lower.includes('swap') || lower.includes('trade') || lower.includes('buy') || lower.includes('sell')) {
      return { model: 'claude-sonnet-4-20250514', reasoning: 'Trading task - use Sonnet for speed and precision' };
    }
    
    if (lower.includes('analyze') || lower.includes('research') || lower.includes('explain')) {
      return { model: 'claude-opus-4-20250514', reasoning: 'Deep analysis - use Opus for complex reasoning' };
    }
    
    if (lower.includes('portfolio') || lower.includes('balance') || lower.includes('position')) {
      return { model: 'claude-sonnet-4-20250514', reasoning: 'Portfolio read - use Sonnet for efficiency' };
    }
    
    if (lower.includes('nft') || lower.includes('collection') || lower.includes('floor')) {
      return { model: 'claude-sonnet-4-20250514', reasoning: 'NFT query - use Sonnet' };
    }
    
    if (lower.includes('whale') || lower.includes('large') || lower.includes('movement')) {
      return { model: 'claude-sonnet-4-20250514', reasoning: 'Whale tracking - use Sonnet' };
    }
    
    // Default
    return { model: 'claude-sonnet-4-20250514', reasoning: 'Default routing - use Sonnet' };
  }
}

export const router = new ModelRouter();