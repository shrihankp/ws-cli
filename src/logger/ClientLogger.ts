import BaseLogger from './BaseLogger'

export default class ClientLogger extends BaseLogger {
  readonly context: string = 'client';
}
