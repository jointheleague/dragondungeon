import { Schema, type } from "@colyseus/schema";

export class BorderFence extends Schema {
	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	constructor(key: number, x: number, y: number) {
		super()
		this.x = x;
		this.y = y;
	}

}