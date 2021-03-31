import { Schema, type } from "@colyseus/schema";

export class CoinJar extends Schema {

	@type("number")
	x: number = 0;

	@type("number")
	y: number = 0;

	constructor(x: number = 1000, y: number = 500) {
		super()
		this.x = x;
		this.y = y;
	}

	checkHit(dragonX: number, dragonY: number) {
		if (this.x-50 < dragonX+45 && this.x+50 > dragonX-45 && this.y-50 < dragonY+45 && this.y+50 > dragonY-45 ){
			return true;
		} else {
			return false
		}

	}

}