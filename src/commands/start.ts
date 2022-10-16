import Vorpal from 'vorpal';
import { AddressInfo, RawData, WebSocket, WebSocketServer } from 'ws';

export default function (vorpal: Vorpal): void {
  vorpal
    .command('start [port]', 'Starts a WebSocket server at `port` (defaults to 8080)')
    .alias('launch')
    .action(async function (this: Vorpal.CommandInstance, args: Vorpal.Args): Promise<void> {
      const port = args?.port ?? 8080;
      if (global.WSS instanceof WebSocketServer) {
        this.log(
          global.loggers.misc.error(`A server is already running at port ${(global.WSS.address() as AddressInfo).port}`)
        );
      } else if (parseInt(port) !== port || port > 65535) {
        this.log(
          global.loggers.misc.error(
            `${port.toString()} is not a valid port! Port should be a valid number between 1 and 65535, inclusive`
          )
        );
      } else {
        global.WSS = new WebSocketServer({ port });
        global.WSS.on('listening', () => {
          this.log(
            global.loggers.server.success(
              `WebSocket Server started at port ${(global.WSS.address() as AddressInfo).port}.`
            )
          );
          this.delimiter(`[::${(global.WSS.address() as AddressInfo).port}] ws-cli $`);
        });
        global.WSS.on('error', (err: Error): void => {
          this.log(global.loggers.server.trace(err));
          if (!global.WSS.address()) {
            global.WSS = undefined;
            global.connectedClients = [];
          }
        });
        global.WSS.on('connection', (ws: WebSocket) => {
          global.connectedClients.push(ws);
          const idx: number = global.connectedClients.indexOf(ws);
          this.log(global.loggers.client.info(`A new connection was established. ID=${idx + 1}`));
          ws.on('message', (data: RawData) => {
            this.log(global.loggers.client.info(`Message from client ${idx + 1}: ${data}`));
          });
          ws.on('error', (code: number, reason_: Buffer) => {
            const reason = reason_.toString() || '<no reason specified>';
            this.log(global.loggers.client.error(`Error in client ${idx + 1}: Code=${code}; Reason=${reason}`));
          });
          ws.on('close', (code: number, reason: Buffer) => {
            this.log(
              global.loggers.client.info(
                `A connection (client ${idx + 1}) was closed. Code: ${code}; Reason: ${reason.toString()}`
              )
            );
            global.connectedClients.splice(idx, 1);
          });
        });
      }
    });
}
