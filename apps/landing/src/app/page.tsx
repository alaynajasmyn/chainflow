import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Zap, Shield, Bot, LineChart, Fish, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ChainFlow - AI-native Web3 Operations Platform',
  description: 'One agent runtime to talk to any chain, reason over on-chain data, and execute transactions safely.',
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-xl font-bold">
            <span className="text-primary">Chain</span>Flow
          </div>
          <nav className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              Launch App <ArrowRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 container mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-8">
          <Zap className="h-4 w-4" />
          AI-native Web3 operations
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl mx-auto">
          Talk to chains.<br />
          <span className="text-primary">Ship without writing hex.</span>
        </h1>
        
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          Every Web3 task collapses into one conversation with an agent that has 
          typed adapters for each chain and a strict on-chain task protocol.
        </p>

        <div className="flex items-center justify-center gap-4">
          <Link 
            href="/dashboard" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-medium flex items-center gap-2"
          >
            Start Free <ArrowRight className="h-5 w-5" />
          </Link>
          <a 
            href="https://github.com/chainflow" 
            className="px-6 py-3 rounded-lg text-lg font-medium border border-border hover:bg-accent transition-colors"
          >
            View on GitHub
          </a>
        </div>

        {/* Demo Terminal */}
        <div className="mt-16 max-w-2xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-accent border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-sm text-muted-foreground ml-4">ChainFlow Terminal</span>
            </div>
            <div className="p-6 font-mono text-sm text-left">
              <div className="text-muted-foreground mb-4">
                <span className="text-green-400">$</span> Show my portfolio on Base
              </div>
              <div className="text-muted-foreground mb-4">
                Searching across Base chain...
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span>USDC</span><span>$4,231.89</span></div>
                <div className="flex justify-between"><span>cbBTC</span><span>$6,120.00</span></div>
                <div className="flex justify-between"><span>AERO</span><span>$2,080.11</span></div>
                <div className="border-t border-border pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span><span className="text-primary">$12,432.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-4">9 AI Surfaces</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Purpose-built AI modules for every Web3 workflow — from alpha hunting to whale tracking.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: TrendingUp, title: 'Alpha Hunter', desc: 'MiMo scores live trending tokens with buy pressure analysis' },
              { icon: Bot, title: 'X Research', desc: 'Narrative analysis powered by AI on any topic' },
              { icon: LineChart, title: 'Strategy Builder', desc: 'Plain English to JSON workflow — no code required' },
              { icon: Fish, title: 'Whale Tracker', desc: 'Live large transaction alerts with AI commentary' },
              { icon: Shield, title: 'Contract Explainer', desc: 'Paste any address and get instant audit results' },
              { icon: Zap, title: 'Trading Co-pilot', desc: 'AI reads your live order book and suggests trades' },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-6 bg-background rounded-xl border border-border hover:border-primary/50 transition-colors">
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocol */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-16">On-chain Task Protocol</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {['Verify', 'Simulate', 'Broadcast', 'Confirm'].map((step, i) => (
              <div key={step} className="flex items-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-bold text-xl mb-2">
                    {i + 1}
                  </div>
                  <div className="font-medium">{step}</div>
                </div>
                {i < 3 && <ArrowRight className="hidden md:block w-8 h-8 text-muted-foreground mx-4" />}
              </div>
            ))}
          </div>
          
          <p className="text-center text-muted-foreground mt-12">
            Every state mutation gates on this protocol — safe execution by design.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ship?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Start building with ChainFlow today. No signup, no keys needed for demo.
          </p>
          <Link 
            href="/dashboard" 
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg text-lg font-medium inline-flex items-center gap-2"
          >
            Launch Dashboard <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            © 2024 ChainFlow. Open source under MIT.
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/chainflow" className="hover:text-foreground">GitHub</a>
            <a href="#" className="hover:text-foreground">Docs</a>
            <a href="#" className="hover:text-foreground">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}