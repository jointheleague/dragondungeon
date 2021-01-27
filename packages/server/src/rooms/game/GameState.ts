import {
	Schema,
	type,
	MapSchema,
	ArraySchema,
	CollectionSchema
} from '@colyseus/schema';
import {
	Geometry,
	Maths
} from '@league-toybox/common';
import {
	GameRoom
} from 'rooms/GameRoom';
import {
	v4
} from "uuid";
export interface IInputs {
	left: boolean;
	up: boolean;
	right: boolean;
	down: boolean;
	shoot: boolean;
	autoshoot: boolean;
	mouseX: number;
	mouseY: number;
	space: boolean;
}

type GameLifecycle = 'lobby' | 'deathmatch';

export class Fireball extends Schema {
	@type("number")
	x: number = 1;

	@type("number")
	y: number = 1;

	@type("string")
	id: string;

	lifetime = 40;
	angle;
	speed;
	constructor(x: number, y: number, angle: number, speed: number) {
		super()
		this.x = x;
		this.y = y;
		this.id = v4();
		this.angle = angle;
		this.speed = speed;
	}

	checkHit(dragonX: number, dragonY: number) {
		if (Math.sqrt(Math.pow(this.x - dragonX, 2) - Math.pow(this.y - dragonY, 2)) < 20) {
			console.log("HIT");
			return true;
		} else {
			return false
		}
	}

}



export class Player extends Schema {
	@type([Fireball])
	fireballs = new ArraySchema < Fireball > ();

	@type("number")
	x: number = 100;

	@type("number")
	y: number = 100;

	@type("number")
	angle: number = Math.PI;

	@type("number")
	score: number = 0;

	speed: number = 20;
	direction: Geometry.Vector = new Geometry.Vector(0, 0);

	activeInputs: IInputs = {
		left: false,
		up: false,
		right: false,
		down: false,
		shoot: false,
		autoshoot: false,
		mouseX: 0.0,
		mouseY: 0.0,
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
		this.angle = Math.atan2(this.y - i.mouseY, this.x - i.mouseX);
		this.direction = resDirection;
	}

	fireballCooldown: number = 0;
	tick(dx: number) {
		const ticks = dx / 50;
		if (this.direction.x != 0 || this.direction.y != 0) {
			this.move(this.direction.x, this.direction.y, this.speed * ticks)
		}
		this.fireballCooldown -= ticks;
		if (this.activeInputs.space && this.fireballCooldown <= 0) {
			this.fireballCooldown = 10;
			//console.log("I need to make a fireball here");
			const fireball = new Fireball(this.x + 60 * Math.cos(this.angle - (Math.PI)), this.y + 60 * Math.sin(this.angle - (Math.PI)), this.angle, 6)
			this.fireballs.push(fireball);
			//this.fireballs.forEach(element =>{console.log(element.x);});
		}

		for (let fireball of this.fireballs) {
			fireball.lifetime -= ticks;
			fireball.x += fireball.speed * Math.cos(fireball.angle - Math.PI);
			fireball.y += fireball.speed * Math.sin(fireball.angle - Math.PI);
			//fireball.checkHit(this.x, this.y);
		}
		for (var i = 0; i < this.fireballs.length; i++) {
			if (this.fireballs[i].lifetime <= 0) {
				this.fireballs.splice(i, 1);
			}
		}

		// for each fireball update based on movement

		//this.fireballs = this.fireballs.filter(fb => fb.lifetime > 0);
	}

	move(dirX: number, dirY: number, speed: number) {
		const magnitude = Maths.normalize2D(dirX, dirY);

		const speedX = Maths.round2Digits(dirX * (speed / magnitude));
		const speedY = Maths.round2Digits(dirY * (speed / magnitude));

		this.x = this.x + speedX;
		this.y = this.y + speedY;
	}


}

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
		//check if the fireball hits another dragon here
		//console.log("shoots");

		if (Math.sqrt(Math.pow(this.x - dragonX, 2) - Math.pow(this.y - dragonY, 2)) < 20) {
			console.log("HIT COIN");
			return true;
		} else {
			return false
		}

	}

}

export class GameState extends Schema {
	@type("boolean")
	first: boolean = false;

	@type({
		map: Player
	})
	players = new MapSchema < Player > ();

	@type([Coin])
	coins = new ArraySchema < Coin > ();

	constructor() {
		super();
		let coinRadius = 200;
		let coinCircleX = 250;
		let coinCircleY = 250;
		let numberOfCoins = 15;
		for (let i = 0; i < numberOfCoins; i++) {
			this.coins.push(new Coin(i, Math.cos(i) * coinRadius + coinCircleX, Math.sin(i) * coinRadius + coinCircleY));
		}

	}
}