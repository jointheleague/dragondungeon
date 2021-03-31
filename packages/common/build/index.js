"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorderFence = exports.CoinJar = exports.Player = exports.Bar = exports.Coin = exports.GameState = exports.Fireball = exports.Geometry = exports.Maths = void 0;
const Maths = __importStar(require("./maths"));
exports.Maths = Maths;
const Geometry = __importStar(require("./geometry"));
exports.Geometry = Geometry;
const Fireball_1 = require("./Fireball");
Object.defineProperty(exports, "Fireball", { enumerable: true, get: function () { return Fireball_1.Fireball; } });
const GameState_1 = require("./GameState");
Object.defineProperty(exports, "GameState", { enumerable: true, get: function () { return GameState_1.GameState; } });
const Player_1 = require("./Player");
Object.defineProperty(exports, "Player", { enumerable: true, get: function () { return Player_1.Player; } });
const Coin_1 = require("./Coin");
Object.defineProperty(exports, "Coin", { enumerable: true, get: function () { return Coin_1.Coin; } });
const Bar_1 = require("./Bar");
Object.defineProperty(exports, "Bar", { enumerable: true, get: function () { return Bar_1.Bar; } });
const CoinJar_1 = require("./CoinJar");
Object.defineProperty(exports, "CoinJar", { enumerable: true, get: function () { return CoinJar_1.CoinJar; } });
const BorderFence_1 = require("./BorderFence");
Object.defineProperty(exports, "BorderFence", { enumerable: true, get: function () { return BorderFence_1.BorderFence; } });
//# sourceMappingURL=index.js.map