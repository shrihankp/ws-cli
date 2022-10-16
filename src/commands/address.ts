import Vorpal from 'vorpal';
import { AddressInfo } from 'ws';

export default function (vorpal: Vorpal) {
  vorpal
    .command('address', 'Get the address of the running server in JSON (as returned by WebSocketServer.address()')
    .alias('where')
    .alias('info')
    .action(async function (this: Vorpal.CommandInstance): Promise<void> {
      if (global.WSS === undefined) {
        this.log(global.loggers.misc.error('The server is not running at the moment.'));
      } else {
        this.log(global.loggers.server.info(JSON.stringify(global.WSS.address() as AddressInfo, null, 2)));
      }
    });
}
