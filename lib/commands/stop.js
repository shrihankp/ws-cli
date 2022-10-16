"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(vorpal) {
    vorpal
        .command('stop', 'Stops the WebSocket server if its running.')
        .alias('halt')
        .alias('close')
        .action(async function () {
        if (global.WSS === undefined) {
            this.log(global.loggers.misc.error('The server is not running at the moment.'));
        }
        else {
            global.WSS.close((err) => {
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
exports.default = default_1;
