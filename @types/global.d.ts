/* eslint-disable no-var */
import { WebSocketServer } from 'ws';
import ClientLogger from './logger/ClientLogger';
import MiscLogger from './logger/MiscLogger';
import ServerLogger from './logger/ServerLogger';

declare global {
  var WSS: WebSocketServer | undefined;
  var loggers: { misc: MiscLogger; server: ServerLogger; client: ClientLogger };
}
