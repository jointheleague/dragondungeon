"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fireball = void 0;
const schema_1 = require("@colyseus/schema");
const uuid_1 = require("uuid");
class Fireball extends schema_1.Schema {
    constructor(x, y, angle, speed) {
        super();
        this.x = 1;
        this.y = 1;
        this.angle = 0;
        this.lifetime = 40;
        this.x = x;
        this.y = y;
        this.id = uuid_1.v4();
        this.angle = angle;
        this.speed = speed;
    }
    checkHit(dragonX, dragonY) {
        if (Math.sqrt(Math.pow(this.x - dragonX, 2) - Math.pow(this.y - dragonY, 2)) < 20) {
            return true;
        }
        else {
            return false;
        }
    }
}
__decorate([
    schema_1.type("number")
], Fireball.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Fireball.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Fireball.prototype, "angle", void 0);
__decorate([
    schema_1.type("string")
], Fireball.prototype, "id", void 0);
exports.Fireball = Fireball;
//# sourceMappingURL=Fireball.js.map