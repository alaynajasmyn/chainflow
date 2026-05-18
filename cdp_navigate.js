const http = require('http');

const wsUrl = 'ws://localhost:9222/devtools/page/AEFF9DAD0BF949CD4AAA4D6547BA1C41';
const WebSocket = require('ws');

const ws = new WebSocket(wsUrl);
ws.on('open', () => {
  ws.send(JSON.stringify({
    id: 1,
    method: 'Page.navigate',
    params: { url: 'https://vercel.com/new' }
  }));
  setTimeout(() => ws.close(), 5000);
});
ws.on('message', (data) => {
  console.log('MSG:', data.toString().substring(0, 200));
});
ws.on('error', (e) => console.log('ERR:', e.message));
