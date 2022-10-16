"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(vorpal) {
    vorpal
        .command('send [message]', 'Sends a message to the connected clients')
        .alias('notify')
        .alias('broadcast')
        .action(async function (args) {
        const message = args.message;
        if (global.WSS === undefined) {
            this.log(global.loggers.misc.error('The server is not running at the moment.'));
        }
        else if (global.connectedClients.length === 0) {
            this.log(global.loggers.server.error('No clients are connected at the moment.'));
        }
        else {
            for (const client of global.connectedClients) {
                const idx = global.connectedClients.indexOf(client);
                client.send(message, (err) => {
                    if (err) {
                        this.log(global.loggers.client.error(`Error while sending messages to client ${idx + 1}.`));
                        this.log(global.loggers.client.trace(err));
                    }
                    else {
                        this.log(global.loggers.client.info(`Sent message to client ${idx + 1}`));
                    }
                });
            }
        }
    });
}
exports.default = default_1;
