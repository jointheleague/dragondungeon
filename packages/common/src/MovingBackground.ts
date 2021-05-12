import { Schema, type } from "@colyseus/schema";

export class MovingBackground extends Schema {
	@type("string")
	key: string;

	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	constructor(key: string, x: number, y: number) {
		super()
		this.x = x;
		this.y = y;
		this.key = key;
	}

}