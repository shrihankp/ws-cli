"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLogger = exports.ClientLogger = void 0;
const ClientLogger_1 = __importDefault(require("./ClientLogger"));
exports.ClientLogger = ClientLogger_1.default;
const ServerLogger_1 = __importDefault(require("./ServerLogger"));
exports.ServerLogger = ServerLogger_1.default;
