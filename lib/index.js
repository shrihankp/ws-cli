"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const figlet_1 = require("figlet");
const lolcatjs_1 = require("lolcatjs");
const vorpal_1 = __importDefault(require("vorpal"));
const address_1 = __importDefault(require("./commands/address"));
const clear_1 = __importDefault(require("./commands/clear"));
const send_1 = __importDefault(require("./commands/send"));
const start_1 = __importDefault(require("./commands/start"));
const stop_1 = __importDefault(require("./commands/stop"));
const ClientLogger_1 = __importDefault(require("./logger/ClientLogger"));
const MiscLogger_1 = __importDefault(require("./logger/MiscLogger"));
const ServerLogger_1 = __importDefault(require("./logger/ServerLogger"));
lolcatjs_1.options.animate = true;
lolcatjs_1.options.duration = 6;
lolcatjs_1.options.seed = Math.random() ** (Math.random() % Math.SQRT1_2);
(0, lolcatjs_1.fromString)((0, figlet_1.textSync)('WS-CLI', 'DOS Rebel'));
global.WSS = undefined;
global.loggers = {
    misc: new MiscLogger_1.default(),
    client: new ClientLogger_1.default(),
    server: new ServerLogger_1.default()
};
global.connectedClients = [];
const Main = new vorpal_1.default();
Main.use(start_1.default);
Main.use(stop_1.default);
Main.use(send_1.default);
Main.use(clear_1.default);
Main.use(address_1.default);
Main.delimiter('ws-cli $').show();
