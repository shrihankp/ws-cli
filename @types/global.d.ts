import { WebSocketServer } from 'ws';
import { MiscLogger, ServerLogger, ClientLogger } from './logger';

declare global {
  var WSS: WebSocketServer | undefined;
  var prompt: string;
  var loggers: { misc: MiscLogger, server: ServerLogger, client: ClientLogger };
}
