"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const log_symbols_1 = __importDefault(require("log-symbols"));
class BaseLogger {
    constructor() {
        this.context = '';
        this.levels = {
            1: 'trace',
            2: 'info',
            3: 'success',
            5: 'error'
        };
        this.lvNames = {
            trace: 1,
            info: 2,
            success: 3,
            error: 5
        };
        this.lvColorFuncs = {
            1: chalk_1.default.bgRedBright,
            2: chalk_1.default.blueBright,
            3: chalk_1.default.greenBright,
            5: chalk_1.default.redBright
        };
        this.lvSymbols = {
            1: log_symbols_1.default.error,
            2: log_symbols_1.default.info,
            3: log_symbols_1.default.success,
            5: log_symbols_1.default.error
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
        const lvSymbol = this.lvSymbols[levelNum];
        let logStr = '';
        chalk_1.default.reset();
        logStr += `[${chalk_1.default.cyan(date)}] `;
        logStr += `${lvSymbol} ` + lvColorFunc(level.toLocaleUpperCase()) + ' ';
        chalk_1.default.reset();
        logStr += '-> ' + chalk_1.default.magenta(this.context.toLocaleUpperCase());
        chalk_1.default.reset();
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
    error(message) {
        return this.log(this.lvNames.error, message);
    }
}
exports.default = BaseLogger;
