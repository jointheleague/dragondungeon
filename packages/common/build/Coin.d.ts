import { Schema } from "@colyseus/schema";
export declare class Coin extends Schema {
    key: number;
    x: number;
    y: number;
    constructor(key: number, x: number, y: number);
    checkHit(dragonX: number, dragonY: number): boolean;
}
