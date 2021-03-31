"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameState = void 0;
const schema_1 = require("@colyseus/schema");
const Player_1 = require("./Player");
const Coin_1 = require("./Coin");
const CoinJar_1 = require("./CoinJar");
const uuid_1 = require("uuid");
const _1 = require(".");
class GameState extends schema_1.Schema {
    constructor() {
        super();
        this.first = false;
        this.players = new schema_1.MapSchema();
        this.coinJar = new CoinJar_1.CoinJar();
        this.coins = new schema_1.MapSchema();
        this.fences = new schema_1.MapSchema();
        this.debugOn = false;
        let coinRadius = 200;
        let coinCircleX = 250;
        let coinCircleY = 250;
        let numberOfCoins = 15;
        for (let i = 0; i < numberOfCoins; i++) {
            //this.coins[v4] = new Coin(i, Math.random()*2000, Math.random()*1000);
            this.coins.set(uuid_1.v4(), new Coin_1.Coin(i, Math.random() * 2000, Math.random() * 1000));
        }
    }
}
__decorate([
    schema_1.type("boolean")
], GameState.prototype, "first", void 0);
__decorate([
    schema_1.type({
        map: Player_1.Player
    })
], GameState.prototype, "players", void 0);
__decorate([
    schema_1.type(CoinJar_1.CoinJar)
], GameState.prototype, "coinJar", void 0);
__decorate([
    schema_1.type({ map: Coin_1.Coin })
], GameState.prototype, "coins", void 0);
__decorate([
    schema_1.type({ map: _1.BorderFence })
], GameState.prototype, "fences", void 0);
__decorate([
    schema_1.type("boolean")
], GameState.prototype, "debugOn", void 0);
exports.GameState = GameState;
//# sourceMappingURL=GameState.js.map