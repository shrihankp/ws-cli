"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseLogger_1 = __importDefault(require("./BaseLogger"));
class MiscLogger extends BaseLogger_1.default {
    constructor() {
        super(...arguments);
        this.context = 'misc';
    }
}
exports.default = MiscLogger;
