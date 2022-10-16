"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(vorpal) {
    vorpal
        .command('address', 'Get the address of the running server in JSON (as returned by WebSocketServer.address()')
        .alias('where')
        .alias('info')
        .action(async function () {
        if (global.WSS === undefined) {
            this.log(global.loggers.misc.error('The server is not running at the moment.'));
        }
        else {
            this.log(global.loggers.server.info(JSON.stringify(global.WSS.address(), null, 2)));
        }
    });
}
exports.default = default_1;
