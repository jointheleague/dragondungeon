import { Schema } from "@colyseus/schema";
export declare class Fireball extends Schema {
    x: number;
    y: number;
    id: string;
    lifetime: number;
    angle: number;
    speed: number;
    constructor(x: number, y: number, angle: number, speed: number);
    checkHit(dragonX: number, dragonY: number): boolean;
}
