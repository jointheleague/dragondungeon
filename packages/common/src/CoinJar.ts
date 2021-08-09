import { Schema, type } from "@colyseus/schema";

export class CoinJar extends Schema {

	@type("number")
	x: number = 0;

	@type("number")
	y: number = 0;

	constructor(x: number = 1000, y: number = 1000) {
		super()
		this.x = x;
		this.y = y;
	}

	checkHit(dragonX: number, dragonY: number) {
		
		if (Math.sqrt(Math.pow(this.x - dragonX, 2) + Math.pow(this.y - dragonY, 2)) < 95) {
			return true;
		} else {
			return false
		}
	}

}