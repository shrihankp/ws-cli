import BaseLogger from './BaseLogger'

export default class ServerLogger extends BaseLogger {
  readonly context: string = 'server';
}
