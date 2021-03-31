"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const schema_1 = require("@colyseus/schema");
class Coin extends schema_1.Schema {
    constructor(key, x, y) {
        super();
        this.x = 1;
        this.y = 1;
        this.x = x;
        this.y = y;
        this.key = key;
    }
    checkHit(dragonX, dragonY) {
        if (Math.sqrt((Math.pow((this.x) - (dragonX), 2)) + (Math.pow((this.y) - (dragonY), 2))) < 50) {
            //console.log(Math.sqrt((Math.pow((this.x-10) - (dragonX-45), 2)) - (Math.pow((this.y-10) - (dragonY-45), 2))));
            return true;
        }
        else {
            return false;
        }
    }
}
__decorate([
    schema_1.type("number")
], Coin.prototype, "key", void 0);
__decorate([
    schema_1.type("number")
], Coin.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Coin.prototype, "y", void 0);
exports.Coin = Coin;
//# sourceMappingURL=Coin.js.map