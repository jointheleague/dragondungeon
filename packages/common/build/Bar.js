"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
const schema_1 = require("@colyseus/schema");
class Bar extends schema_1.Schema {
    constructor(key, x, y) {
        super();
        this.x = 1;
        this.y = 1;
        this.x = x;
        this.y = y;
        this.key = key;
    }
}
__decorate([
    schema_1.type("string")
], Bar.prototype, "key", void 0);
__decorate([
    schema_1.type("number")
], Bar.prototype, "x", void 0);
__decorate([
    schema_1.type("number")
], Bar.prototype, "y", void 0);
exports.Bar = Bar;
//# sourceMappingURL=Bar.js.map