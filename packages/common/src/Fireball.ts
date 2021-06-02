import { Schema, type } from "@colyseus/schema";
import { v4 } from "uuid";

export class Fireball extends Schema {
	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	@type("number")
	angle: number = 0;

	@type("string")
	id: string;

	//@type("string")
	//ability: "Iceball" | "Fireball";

	lifetime = 40;
	speed;
	constructor(x: number, y: number, angle: number, speed: number) {
		super()
		this.x = x;
		this.y = y;
		this.id = v4();
		this.angle = angle;
		this.speed = speed;
		//this.ability = ability;
	}

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt(Math.pow(this.x - dragonX, 2) - Math.pow(this.y - dragonY, 2)) < 20) {
			return true;
		} else {
			return false
		}
	}

}