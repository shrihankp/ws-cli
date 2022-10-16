import { textSync } from 'figlet';
import { fromString as lolcat, options } from 'lolcatjs';
import Vorpal from 'vorpal';
import address from './commands/address';
import clear from './commands/clear';
import send from './commands/send';
import start from './commands/start';
import stop from './commands/stop';
import ClientLogger from './logger/ClientLogger';
import MiscLogger from './logger/MiscLogger';
import ServerLogger from './logger/ServerLogger';

options.animate = true;
options.duration = 6;
options.seed = Math.random() ** (Math.random() % Math.SQRT1_2);
lolcat(textSync('WS-CLI', 'DOS Rebel'));

global.WSS = undefined;
global.loggers = {
  misc: new MiscLogger(),
  client: new ClientLogger(),
  server: new ServerLogger()
};

const Main = new Vorpal();
Main.use(start);
Main.use(stop);
Main.use(send);
Main.use(clear);
Main.use(address);

Main.delimiter('ws-cli $').show();
