"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(vorpal) {
    vorpal
        .command('clear', 'Clears the screen')
        .alias('cls')
        .action(async function () {
        console.clear();
    });
}
exports.default = default_1;
