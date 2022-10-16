import chalk, { ChalkFunction } from 'chalk';
import logSymbols from 'log-symbols';

export default class BaseLogger {
  readonly context: string = '';
  private readonly levels: { [k: number]: string } = {
    1: 'trace',
    2: 'info',
    3: 'success',
    5: 'error'
  };

  private readonly lvNames: { [k: string]: number } = {
    trace: 1,
    info: 2,
    success: 3,
    error: 5
  };

  private readonly lvColorFuncs: { [k: number]: ChalkFunction } = {
    1: chalk.bgRedBright,
    2: chalk.blueBright,
    3: chalk.greenBright,
    5: chalk.redBright
  };

  private readonly lvSymbols: { [k: number]: string } = {
    1: logSymbols.error,
    2: logSymbols.info,
    3: logSymbols.success,
    5: logSymbols.error
  };

  private log(levelNum: number, message: string): string {
    const now: Date = new Date(Date.now());
    const h: string = now.getHours().toString().padStart(2, '0');
    const m: string = now.getMinutes().toString().padStart(2, '0');
    const s: string = now.getSeconds().toString().padStart(2, '0');
    const ms: string = now.getMilliseconds().toString().padStart(3, '0');
    const date = `${h}:${m}:${s}.${ms}`;
    const level: string = this.levels[levelNum];
    const lvColorFunc: ChalkFunction = this.lvColorFuncs[levelNum];
    const lvSymbol: string = this.lvSymbols[levelNum];
    let logStr = '';

    chalk.reset();
    logStr += `[${chalk.cyan(date)}] `;
    logStr += `${lvSymbol} ` + lvColorFunc(level.toLocaleUpperCase()) + ' ';
    chalk.reset();
    logStr += '-> ' + chalk.magenta(this.context.toLocaleUpperCase());
    chalk.reset();
    logStr += `: ${message}`;

    return logStr;
  }

  public trace(err: Error | string): string {
    let errTrace: string;
    if (err instanceof Error) {
      errTrace = err.stack;
    } else {
      errTrace = err;
    }
    return this.log(this.lvNames.trace, errTrace);
  }

  public info(message: string): string {
    return this.log(this.lvNames.info, message);
  }

  public success(message: string): string {
    return this.log(this.lvNames.success, message);
  }

  public error(message: string): string {
    return this.log(this.lvNames.error, message);
  }
}
