"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = require("chalk");
const chalk = new chalk_1.Chalk();
class BaseLogger {
    constructor() {
        this.context = '';
        this.levels = {
            1: 'trace',
            2: 'info',
            3: 'success',
            4: 'warn',
            5: 'error',
            6: 'fatal'
        };
        this.lvNames = {
            trace: 1,
            info: 2,
            success: 3,
            warn: 4,
            error: 5,
            fatal: 6
        };
        this.lvColorFuncs = {
            1: chalk.bgRedBright,
            2: chalk.blueBright,
            3: chalk.greenBright,
            4: chalk.yellow,
            5: chalk.redBright,
            6: chalk.red
        };
    }
    log(levelNum, message) {
        const now = new Date(Date.now());
        const h = now.getHours().toString().padStart(2, '0');
        const m = now.getMinutes().toString().padStart(2, '0');
        const s = now.getSeconds().toString().padStart(2, '0');
        const ms = now.getMilliseconds().toString().padStart(3, '0');
        const date = `${h}:${m}:${s}.${ms}`;
        const level = this.levels[levelNum];
        const lvColorFunc = this.lvColorFuncs[levelNum];
        let logStr = '';
        chalk.reset();
        logStr += `[${date}] `;
        logStr += lvColorFunc(level.toLocaleUpperCase()) + ' ';
        chalk.reset();
        logStr += '-> ' + chalk.magenta(this.context.toLocaleUpperCase());
        chalk.reset();
        logStr += `: ${message}`;
        return logStr;
    }
    trace(err) {
        let errTrace;
        if (err instanceof Error) {
            errTrace = err.stack;
        }
        else {
            errTrace = err;
        }
        return this.log(this.lvNames.trace, errTrace);
    }
    info(message) {
        return this.log(this.lvNames.info, message);
    }
    success(message) {
        return this.log(this.lvNames.success, message);
    }
    warn(message) {
        return this.log(this.lvNames.warn, message);
    }
    error(message) {
        return this.log(this.lvNames.error, message);
    }
    fatal(message) {
        return this.log(this.lvNames.fatal, message);
    }
}
exports.default = BaseLogger;
