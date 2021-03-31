import { Schema, type } from "@colyseus/schema";

export class Coin extends Schema {
	@type("number")
	key: number;

	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	constructor(key: number, x: number, y: number) {
		super()
		this.x = x;
		this.y = y;
		this.key = key;
	}

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt((Math.pow((this.x) - (dragonX), 2)) + (Math.pow((this.y) - (dragonY), 2))) < 50) {
			//console.log(Math.sqrt((Math.pow((this.x-10) - (dragonX-45), 2)) - (Math.pow((this.y-10) - (dragonY-45), 2))));
			return true;
		} else {
			return false
		}

	}

}