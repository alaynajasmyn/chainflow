'use client';

import { useState } from 'react';
import { LineChart, TrendingUp, TrendingDown, Bell } from 'lucide-react';

const mockOrders = [
  { price: 3245.67, amount: 2.5, side: 'bid', total: 8114.18 },
  { price: 3245.50, amount: 1.2, side: 'bid', total: 3894.60 },
  { price: 3245.00, amount: 0.8, side: 'bid', total: 2596.00 },
  { price: 3244.50, amount: 3.1, side: 'bid', total: 10058.10 },
  { price: 3244.00, amount: 1.5, side: 'ask', total: 4866.00 },
  { price: 3245.00, amount: 2.0, side: 'ask', total: 6490.00 },
];

const mockAdvice = {
  signal: 'buy',
  confidence: 78,
  reason: 'Buy pressure increasing. 3 large bids detected above market.',
  entry: 3244.50,
  target: 3280.00,
  stop: 3220.00,
};

export default function CopilotPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Trading Co-pilot</h1>
        <p className="text-muted-foreground">AI reads your live order book</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="font-semibold">Order Book (ETH/USDC)</h2>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live
            </div>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2 px-4">
              <span>Price</span>
              <span className="text-right">Amount</span>
              <span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {mockOrders.map((order, i) => (
                <div key={i} className={`grid grid-cols-3 text-sm px-4 py-2 rounded ${
                  order.side === 'bid' ? 'bg-green-500/5' : 'bg-red-500/5'
                }`}>
                  <span className={order.side === 'bid' ? 'text-green-500' : 'text-red-500'}>
                    {order.price.toFixed(2)}
                  </span>
                  <span className="text-right">{order.amount}</span>
                  <span className="text-right text-muted-foreground">{order.total.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`bg-card border border-border rounded-lg p-6 ${
            mockAdvice.signal === 'buy' ? 'border-green-500/50' : 'border-red-500/50'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Signal</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                mockAdvice.signal === 'buy' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'
              }`}>
                {mockAdvice.signal.toUpperCase()}
              </span>
            </div>
            <div className="text-3xl font-bold mb-2">{mockAdvice.confidence}%</div>
            <p className="text-sm text-muted-foreground mb-4">{mockAdvice.reason}</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Entry</span>
                <span className="font-medium">${mockAdvice.entry.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Target</span>
                <span className="font-medium text-green-500">${mockAdvice.target.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stop</span>
                <span className="font-medium text-red-500">${mockAdvice.stop.toFixed(2)}</span>
              </div>
            </div>
            <button className="w-full mt-4 bg-primary text-primary-foreground py-3 rounded-lg font-medium">
              Execute Trade
            </button>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Alerts
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-yellow-500">
                <TrendingUp className="h-4 w-4" />
                Large bid detected: 5 ETH at $3246
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <LineChart className="h-4 w-4" />
                Momentum rising (72%)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}