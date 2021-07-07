import { ArraySchema, Schema, type } from "@colyseus/schema";
import { Geometry, Maths } from ".";
import { Bar } from "./Bar";
import { Fireball } from "./Fireball";
import { IInputs } from "./IInputs";


export class Player extends Schema {
	@type([Fireball])
	fireballs = new ArraySchema < Fireball > ();

	@type("number")
	x: number = Math.random()*2000;

	@type("number")
	y: number = Math.random()*1000;

	@type("number")
	angle: number = Math.PI;

	@type("number")
	score: number = 0;

	@type("number")
	coins: number = 0;

	@type([Bar])
	bar = new Bar('', this.x, this.y);

	@type("string")
	onlineName!: string;

	@type("string")
	onlineID!: string;

	speed: number = 20;
	direction: Geometry.Vector = new Geometry.Vector(0, 0);

	activeInputs: IInputs = {
		left: false,
		up: false,
		right: false,
		down: false,
		shoot: false,
		autoshoot: false,
		angle: 0.0,
		space: false
	};

	constructor() {
		super()
	}

	inputs(i: IInputs) {
		this.activeInputs = Object.assign({}, this.activeInputs, i);
		const resDirection = new Geometry.Vector(0, 0);
		if (i.right) {
			resDirection.x += 1;
		}
		if (i.left) {
			resDirection.x -= 1;
		}
		if (i.up) {
			resDirection.y -= 1;
		}
		if (i.down) {
			resDirection.y += 1;
		}
		this.direction = resDirection;
		//this.angle = Math.atan2(i.mouseX - this.x, i.mouseY - this.y)
		this.angle = i.angle;
	}

	fireballCooldown: number = 0;
	tick(dx: number) {
		const ticks = dx / 50;
		if (this.direction.x !== 0 || this.direction.y !== 0) {
			this.move(this.direction.x, this.direction.y, this.speed * ticks)
		}
		this.fireballCooldown -= ticks;
		if (this.activeInputs.space && this.fireballCooldown <= 0) {
			this.fireballCooldown = 10;
			const fireball = new Fireball(this.x + 45 * Math.cos(this.angle), this.y + 45 * Math.sin(this.angle), this.angle, 6)
			this.fireballs.push(fireball);
		}

		for (let fireball of this.fireballs) {
			fireball.lifetime -= ticks;
			fireball.x += fireball.speed * Math.cos(fireball.angle - Math.PI);
			fireball.y += fireball.speed * Math.sin(fireball.angle - Math.PI);
			// fireball.checkHit(this.x, this.y);
		}
		for (var i = 0; i < this.fireballs.length; i++) {
			if (this.fireballs[i].lifetime <= 0) {
				this.fireballs.splice(i, 1);
			}
		}

		this.bar.x = this.x;
		this.bar.y = this.y;
	}

	move(dirX: number, dirY: number, speed: number) {
		const magnitude = Maths.normalize2D(dirX, dirY);

		const speedX = Maths.round2Digits(dirX * (speed / magnitude));
		const speedY = Maths.round2Digits(dirY * (speed / magnitude));

		this.x = this.x + speedX;
		this.y = this.y + speedY;
	}


}

