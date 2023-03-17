const http = require('http');
const WebSocket = require('ws');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('チャットサーバー');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('クライアントが接続しました');
    
    ws.on('message', (message) => {
        console.log(`受信したメッセージ: ${message}`);
        broadcast(message, ws);
    });

    ws.on('close', () => {
        console.log('クライアントが切断しました');
    });
});

function broadcast(message, sender) {
    wss.clients.forEach((client) => {
        if (client !== sender && client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
}

const port = 3000;
server.listen(port, () => {
    console.log(`サーバーがポート ${port} で起動しました`);
});
