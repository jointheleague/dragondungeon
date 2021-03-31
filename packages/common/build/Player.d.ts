import { ArraySchema, Schema } from "@colyseus/schema";
import { Geometry } from ".";
import { Bar } from "./Bar";
import { Fireball } from "./Fireball";
import { IInputs } from "./IInputs";
export declare class Player extends Schema {
    fireballs: ArraySchema<Fireball>;
    x: number;
    y: number;
    angle: number;
    score: number;
    coins: number;
    bar: Bar;
    speed: number;
    direction: Geometry.Vector;
    activeInputs: IInputs;
    constructor();
    inputs(i: IInputs): void;
    fireballCooldown: number;
    tick(dx: number): void;
    move(dirX: number, dirY: number, speed: number): void;
}
