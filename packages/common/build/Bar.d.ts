import { Schema } from "@colyseus/schema";
export declare class Bar extends Schema {
    key: string;
    x: number;
    y: number;
    constructor(key: string, x: number, y: number);
}
