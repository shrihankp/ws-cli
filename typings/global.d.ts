import { WebSocketServer } from 'ws';
import { MiscLogger, ServerLogger, ClientLogger } from './logger';

declare global {
  var WSS: WebSocketServer | undefined = undefined;
  var prompt: string                   = '';
  var loggers = {
    misc:   new MiscLogger(),
    server: new ServerLogger(),
    client: new ClientLogger()
  }
}
