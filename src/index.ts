import { textSync } from 'figlet';
import { fromString as lolcat, options } from 'lolcatjs';
import Vorpal from 'vorpal';
import send from './commands/send';
import start from './commands/start';
import stop from './commands/stop';

options.animate = true;
options.duration = 6;
options.seed = Math.random() ** (Math.random() % Math.SQRT1_2);
lolcat(textSync('WS-CLI', 'DOS Rebel'));

const Main = new Vorpal();
Main.use(start);
Main.use(stop);
Main.use(send);

Main.delimiter('ws-cli $').show();
