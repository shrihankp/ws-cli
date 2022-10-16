"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
function default_1(vorpal) {
    vorpal
        .command('start [port]', 'Starts a WebSocket server at `port` (defaults to 8080)')
        .alias('launch')
        .action(async function (args) {
        const port = args?.port ?? 8080;
        if (global.WSS instanceof ws_1.WebSocketServer) {
            this.log(global.loggers.misc.error(`A server is already running at port ${global.WSS.address().port}`));
        }
        else if (parseInt(port) !== port || port > 65535) {
            this.log(global.loggers.misc.error(`${port.toString()} is not a valid port! Port should be a valid number between 1 and 65535, inclusive`));
        }
        else {
            global.WSS = new ws_1.WebSocketServer({ port });
            global.WSS.on('listening', () => {
                this.log(global.loggers.server.success(`WebSocket Server started at port ${global.WSS.address().port}.`));
                this.delimiter(`[::${global.WSS.address().port}] ws-cli $`);
            });
            global.WSS.on('error', (err) => {
                this.log(global.loggers.server.trace(err));
                if (!global.WSS.address()) {
                    global.WSS = undefined;
                    global.connectedClients = [];
                }
            });
            global.WSS.on('connection', (ws) => {
                global.connectedClients.push(ws);
                const idx = global.connectedClients.indexOf(ws);
                this.log(global.loggers.client.info(`A new connection was established. ID=${idx + 1}`));
                ws.on('message', (data) => {
                    this.log(global.loggers.client.info(`Message from client ${idx + 1}: ${data}`));
                });
                ws.on('error', (code, reason_) => {
                    const reason = reason_.toString() || '<no reason specified>';
                    this.log(global.loggers.client.error(`Error in client ${idx + 1}: Code=${code}; Reason=${reason}`));
                });
                ws.on('close', (code, reason) => {
                    this.log(global.loggers.client.info(`A connection (client ${idx + 1}) was closed. Code: ${code}; Reason: ${reason.toString()}`));
                    global.connectedClients.splice(idx, 1);
                });
            });
        }
    });
}
exports.default = default_1;
