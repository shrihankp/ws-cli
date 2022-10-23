import Vorpal from 'vorpal';

export default function (vorpal: Vorpal): void {
  vorpal
    .command('send <message...>', 'Sends a message to the connected clients')
    .alias('notify')
    .alias('broadcast')
    .action(async function (this: Vorpal.CommandInstance, args: Vorpal.Args): Promise<void> {
      const message: string = args.message;
      if (global.WSS === undefined) {
        this.log(global.loggers.misc.error('The server is not running at the moment.'));
      } else if (global.connectedClients.length === 0) {
        this.log(global.loggers.server.error('No clients are connected at the moment.'));
      } else {
        for (const client of global.connectedClients) {
          const idx: number = global.connectedClients.indexOf(client);
          client.send(message, (err?: Error): void => {
            if (err) {
              this.log(global.loggers.client.error(`Error while sending messages to client ${idx + 1}.`));
              this.log(global.loggers.client.trace(err));
            } else {
              this.log(global.loggers.client.success(`Sent message to client ${idx + 1}.`));
            }
          });
        }
      }
    });
}
