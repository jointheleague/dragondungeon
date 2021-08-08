import { Schema, type } from "@colyseus/schema";

export abstract class Bat extends Schema {
	@type("number")
	key: number;

	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;
	
	@type("number")
	speed: number = 1;

	constructor(key: number, x: number, y: number, speed: number) {
		super()
		this.x = x;
		this.y = y;
		this.key = key;
		this.speed = speed;
	}

	abstract move(dx: number) : void;

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt((Math.pow((this.x) - (dragonX), 2)) + (Math.pow((this.y) - (dragonY), 2))) < 70) {
			return true;
		} else {
			return false
		}

	}

}

//----------------------

export class LineBat extends Bat {

	@type("number")
	maxDist: number = 10;

	@type("number")
	dist: number = 10;

	@type("number")
	angle: number = 0;

	@type("number")
	dir: number = 1;

	constructor(key: number, x: number, y: number, speed: number, maxDist: number, angle: number, ) {
		super(key, x, y, speed)
		this.maxDist = maxDist;
		this.angle = angle;
	}

	move(dx: number){
		if(this.dist > this.maxDist){
			this.dir = -1;
		}else if(this.dist < 0){
			this.dir = 1;
		}
		const dX = Math.cos(this.angle)*this.speed*this.dir;
		const dY = Math.sin(this.angle)*this.speed*this.dir;
		this.dist += ((dX)^2 + (dY)^2)^1/2;
		this.x += dX;
		this.y += dY;
	}

}

//----------------------

export class CircleBat extends Bat {

	@type("number")
	centerX: number = 1;

	@type("number")
	centerY: number = 1;

	@type("number")
	angle: number = 0;

	@type("number")
	radius: number = 0;

	constructor(key: number, x: number, y: number, speed: number, radius: number, angle: number) {
		super(key, x, y, speed)
		this.angle = angle;
		this.radius = radius;
		this.centerX = x;
		this.centerY = y;
	}

	move(dx: number){
		this.angle += this.speed;
		if(this.angle > Math.PI*2){
			this.angle -= Math.PI*2
		}else if(this.angle < -Math.PI*2){
			this.angle += Math.PI*2
		}
		this.x = this.centerX + Math.cos(this.angle)*this.radius;
		this.y = this.centerY + Math.sin(this.angle)*this.radius;
	}

}