import Vorpal from 'vorpal';

export default function (vorpal: Vorpal): void {
  vorpal
    .command('stop', 'Stops the WebSocket server if its running.')
    .alias('halt')
    .alias('close')
    .action(async function (this: Vorpal.CommandInstance): Promise<void> {
      if (global.WSS === undefined) {
        this.log(global.loggers.misc.error('The server is not running at the moment.'));
      } else {
        global.WSS.close((err: Error) => {
          if (err) {
            this.log(global.loggers.server.error(`Something wicked happened while stopping the server.`));
            this.log(global.loggers.server.trace(err));
            return;
          }
          this.log(global.loggers.server.success('Successfully stopped the WebSocket server.'));
          this.delimiter('ws-cli $');
          global.WSS = undefined;
          global.connectedClients = [];
        });
      }
    });
}
