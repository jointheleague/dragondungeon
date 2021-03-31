"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const schema_1 = require("@colyseus/schema");
const _1 = require(".");
const Bar_1 = require("./Bar");
const Fireball_1 = require("./Fireball");
class Player extends schema_1.Schema {
    constructor() {
        super();
        this.fireballs = new schema_1.ArraySchema();
        this.x = Math.random() * 2000;
        this.y = Math.random() * 1000;
        this.angle = Math.PI;
        this.score = 0;
        this.coins = 0;
        this.bar = new Bar_1.Bar('', this.x, this.y);
        this.speed = 20;
        this.direction = new _1.Geometry.Vector(0, 0);
        this.activeInputs = {
            left: false,
            up: false,
            right: false,
            down: false,
            shoot: false,
            autoshoot: false,
            mouseX: 0.0,
            mouseY: 0.0,
            space: false
        };
        this.fireballCooldown = 0;
    }
    inputs(i) {
        this.activeInputs = Object.assign({}, this.activeInputs, i);
        const resDirection = new _1.Geometry.Vector(0, 0);
        if (i.right) {
            resDirection.x += 1;
        }
        if (i.left) {
            resDirection.x -= 1;
        }
        if (i.up) {
            resDirection.y -= 1;
        }
        if (i.down) {
            resDirection.y += 1;
        }
        this.angle = Math.atan2(this.y - i.mouseY, this.x - i.mouseX);
        this.direction = resDirection;
    }
    tick(dx) {
        const ticks = dx / 50;
        if (this.direction.x != 0 || this.direction.y != 0) {
            this.move(this.direction.x, this.direction.y, this.speed * ticks);
        }
        this.fireballCooldown -= ticks;
        if (this.activeInputs.space && this.fireballCooldown <= 0) {
            this.fireballCooldown = 10;
            const fireball = new Fireball_1.Fireball(this.x + 60 * Math.cos(this.angle - (Math.PI)), this.y + 60 * Math.sin(this.angle - (Math.PI)), this.angle, 6);
            this.fireballs.push(fireball);
        }
        for (let fireball of this.fireballs) {
            fireball.lifetime -= ticks;
            fireball.x += fireball.speed * Math.cos(fireball.angle - Math.PI);
            fireball.y += fireball.speed * Math.sin(fireball.angle - Math.PI);
            // fireball.checkHit(this.x, this.y);
        }
        for (var i = 0; i < this.fireballs.length; i++) {
            if (this.fireballs[i].lifetime <= 0) {
                this.fireballs.splice(i, 1);
            }
        }
        this.bar.x = this.x;
        this.bar.y = this.y;
    }
    move(dirX, dirY, speed) {
        const magnitude = _1.Maths.normalize2D(dirX, dirY);
        const speedX = _1.Maths.round2Digits(dirX * (speed / magnitude));
        const speedY = _1.Maths.round2Digits(dirY * (speed / magnitude));
        this.x = this.x + speedX;
        this.y = this.y + speedY;
    }
}
__decorate([
    schema_1.type([Fireball_1.Fireball])
], Player.prototype, "fireballs", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "y", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "angle", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "score", void 0);
__decorate([
    schema_1.type("number")
], Player.prototype, "coins", void 0);
__decorate([
    schema_1.type([Bar_1.Bar])
], Player.prototype, "bar", void 0);
exports.Player = Player;
//# sourceMappingURL=Player.js.map