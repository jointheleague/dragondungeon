import { Schema, type } from "@colyseus/schema";
import { Maths } from ".";

export abstract class Skull extends Schema {
	@type("number")
	key: number;

	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;
	
	@type("number")
	speed: number = 1;

	@type("number")
	angle: number = 0;

	constructor(key: number, x: number, y: number, speed: number) {
		super()
		this.x = x;
		this.y = y;
		this.key = key;
		this.speed = speed;
	}

	abstract move() : void;

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt((Math.pow((this.x) - (dragonX), 2)) + (Math.pow((this.y) - (dragonY), 2))) < 95) {
			return true;
		} else {
			return false
		}

	}

}

//----------------------

export class LineSkull extends Skull {

	@type("number")
	maxDist: number = 10;

	@type("number")
	dist: number = 0;

	constructor(key: number, x: number, y: number, speed: number, maxDist: number, angle: number, ) {
		super(key, x, y, speed)
		this.maxDist = maxDist;
		this.angle = angle;
	}

	move(){
		if(this.dist > this.maxDist){
			this.angle += Math.PI;
			this.dist = 0;
			if(this.angle > 2*Math.PI){
				this.angle -= 2*Math.PI;
			}
		}
		const dX = Math.cos(this.angle)*this.speed;
		const dY = Math.sin(this.angle)*this.speed;
		this.dist += Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
		this.x += dX;
		this.y += dY;
	}


}

//----------------------

export class CircleSkull extends Skull {

	@type("number")
	centerX: number = 1;

	@type("number")
	centerY: number = 1;

	@type("number")
	rotAngle: number = 0;

	@type("number")
	radius: number = 0;

	constructor(key: number, x: number, y: number, speed: number, radius: number, angle: number) {
		super(key, x, y, speed)
		this.rotAngle = angle;
		this.radius = radius;
		this.centerX = x;
		this.centerY = y;
	}

	move(){
		this.rotAngle += this.speed;
		if(this.rotAngle > Math.PI*2){
			this.rotAngle -= Math.PI*2
		}else if(this.rotAngle < -Math.PI*2){
			this.rotAngle += Math.PI*2
		}
		this.x = this.centerX + Math.cos(this.rotAngle)*this.radius;
		this.y = this.centerY + Math.sin(this.rotAngle)*this.radius;
	}

}