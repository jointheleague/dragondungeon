import { Schema, type } from "@colyseus/schema";

export class Coin extends Schema {
	@type("number")
	key: number;

	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	@type("number")
	size: number = 20;

	constructor(key: number, x: number, y: number) {
		super()
		this.x = x;
		this.y = y;
		this.key = key;
		var num = Math.random();
		this.size = 20;
		if(num >= .75){
			this.size += 5;
			if(num >= .95){
				this.size += 5;
				if(num >= .995){
					this.size = 100;
				}
			}
		}
	}

	public getSize(){
		return this.size;
	}

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt((Math.pow((this.x) - (dragonX), 2)) + (Math.pow((this.y) - (dragonY), 2))) < 30+this.size) {
			return true;
		} else {
			return false
		}

	}

}