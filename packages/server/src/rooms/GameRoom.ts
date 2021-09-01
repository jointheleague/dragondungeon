import {
	getDistance,
	getRandomInt
} from '@dragondungeon/common/build/maths';

import {
	Room,
	Client
} from 'colyseus';

import {
	GameState,
	Player,
	IInputs,
	Coin,
	CoinJar,
	Bar,
	Maths,
	Countdown,
	Fireball,
	Bat,
	CircleBat,
	LineBat,
	Skull,
	CircleSkull,
	LineSkull
} from '@dragondungeon/common';

import * as admin from 'firebase-admin';
import { v4 } from "uuid";

const botnames = require('./botnames.json');
const botwords = require('../../wordlists/nouns.json');
const MAX_COINS_HELD = 30;

export class GameRoom extends Room<GameState> {
	counter = 0;
	botTimeout = 0;
	maxClients = 15;

	redTeamIds = [];
	blueTeamIds = [];

	gameInt;


	onCreate() {
		this.setState(new GameState())
		this.registerMessages();
		this.startGameLoop();
		this.state.countdown = new Countdown(5, 0);// should be '5, 0'
		const spokes = 2;//of center rotating bats
		for(var j = 0; j < spokes; j++){
			for(var i = 0; i < 3; i++){
				this.state.bats.set(v4(), new CircleBat(this.state.bats.size, 1000, 1000, .02, 90*i + 90, (Math.PI*2/spokes)*j));
			}
		}
		this.state.skulls.set(v4(), new LineSkull(this.state.skulls.size, 320, 1000, 5, 1360, 0));
		this.state.skulls.set(v4(), new LineSkull(this.state.skulls.size, 1000, 320, 5, 1360, Math.PI/2));
	}

	async onJoin(client: Client, options: { token: string }, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);

		const db = admin.firestore();

		let ballType = "fireball";
		let dragonSkin = "default";

		const userDoc = await db.collection(user.uid).doc("gameplay").get();
		if (userDoc.data().ballType) {
			ballType = userDoc.data().ballType;
		} else {
			switch ( Math.floor( Math.random() * 5 ) ) {
				case 0:
					 ballType = "fire";
					 break;
				case 1:
					ballType = "ice";
					  break;
				case 2:
					ballType = "poison";
					break;
				case 3:
					ballType = "mud";
					break;
				case 4:
					ballType = "electric";
					break;
			}
		}

		if (userDoc.data().dragonSkin) {
			dragonSkin = userDoc.data().dragonSkin;
		} else {
			switch ( Math.floor( Math.random() * 3 ) ) {
				case 0:
					 dragonSkin = "default";
					 break;
				case 1:
					dragonSkin = "light";
					  break;
				case 2:
					dragonSkin = "gold";
					break;
			}
		}

		var teamnum;
		if(this.state.gamemode == 'coinCapture'){
			if(this.redTeamIds.length<=this.blueTeamIds.length){
				teamnum = 1;
				this.redTeamIds.push(client.id);
			} else{
				teamnum = 2;
				this.blueTeamIds.push(client.id);
			}
		} else{teamnum = 0;}
		this.state.players[client.id] = new Player(ballType, dragonSkin, teamnum);

		if (user.name == null) {
			const adjectives = require('../../wordlists/adjectives.json');
			const nouns = require('../../wordlists/nouns.json');
			const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
			const noun = nouns[Math.floor(Math.random() * nouns.length)];
			this.state.players[client.id].onlineName = `${adjective}-${noun}`.toLowerCase();
		} else {
			this.state.players[client.id].onlineName = user.name;
		}
		this.state.players[client.id].onlineID = user.uid;
	}

	onLeave(client: Client, _consent: boolean) {
		if (!this.state.players[client.sessionId]) {
			return;
		}
		this.state.players.delete(client.sessionId);
	}

	registerMessages() {
		this.onMessage("input", (client: Client, message: IInputs) => {
			this.state.players[client.sessionId].inputs(message);
			//console.log("got player input");
		})
	}

	startGameLoop() {
		this.gameInt = setInterval(() => {
			if(!this.state.gameOver){
			this.clock.tick();
			this.tick();
			}
		}, 1000 / 60);
	}

	gameOver(){
		this.clock.clear();
		clearInterval(this.gameInt);
		this.state.gameOver = true;
		this.state.players.forEach((player: Player) => {
			player.dead = true;
		});
	}

	spawnCoin() {
		var num = Math.random();
		var size = 20;
		if (num >= .75) {
			size += 5;
			if (num >= .95) {
				size += 5;
				if (num >= .995) {
					size = 100;
				}
			}
		}
		var newX;
		var newY;
		do {
			newX = Math.random() * 2000;
			newY = Math.random() * 2000;

		} while ((Maths.checkWalls(newX, newY, size) || (newX > 700 && newY > 700 && newX < 1300 && newY < 1300)) && size != 100)
		var teamNum;	
		if(this.state.gamemode == 'coinCapture'){teamNum = 1;}
		//this is temporary, change when CTC is more set up
		else{teamNum = 0;}
			this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, size, teamNum));
			//console.log(this.state.gamemode);
	}

	createCoin(x: number, y: number) {
		var rand;
		var newX;
		var newY;
		do {
			rand = getRandomInt(0, 62) / 10;
			newX = x + 100 * Math.cos(rand);
			newY = y + 100 * Math.sin(rand);
		} while (Maths.checkWalls(newX, newY, 20))
		this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, 20, 0));
		Math.random() < 0.5 ? this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, 100, 0)) : this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, 20, 0));
	}
	moveBot(bot: Player, right: boolean, left: boolean, up: boolean, down: boolean) {
		let space = Math.random() > 0.7;
		let angle = Math.random() * (Math.PI * 2);
		bot.inputs({
			left: left,
			up: up,
			right: right,
			down: down,
			shoot: false,
			autoshoot: false,
			angle: angle,
			space: space
		});
	}



	tick() {
		this.counter++;
		const dx = this.clock.deltaTime;
		this.state.countdown.elaspseTime();
		if (this.state.countdown.done) {
			this.gameOver();
		}

		for (let i = this.state.coins.size; i < this.state.players.size * 25; i++) {
			this.spawnCoin();
		}

		if (this.state.players.size < 3) {

			let ballType;
			let dragonSkin;

			switch ( Math.floor( Math.random() * 5 ) ) {
				case 0:
					 ballType = "fire";
					 break;
				case 1:
					ballType = "ice";
						break;
				case 2:
					ballType = "poison";
					break;
				case 3:
					ballType = "mud";
					break;
				case 4:
					ballType = "electric";
					break;
			}

			switch ( Math.floor( Math.random() * 3 ) ) {
				case 0:
					 dragonSkin = "default";
					 break;
				case 1:
					dragonSkin = "light";
						break;
				case 2:
					dragonSkin = "gold";
					break;
			}

			let bot = new Player(ballType, dragonSkin, 0);
			bot.isBot = true;
			let botNameRegion = botnames[Math.floor(Math.random() * botnames.length)];
			let botNameGender = Math.random() > 0.2 ? true : false;
			let botNameFirst = botNameGender ? botNameRegion.male[Math.floor(Math.random() * botNameRegion.male.length)] : botNameRegion.female[Math.floor(Math.random() * botNameRegion.female.length)];
			bot.onlineName = Math.random() > 0.6 ? botNameFirst.toLowerCase().replace(/[\u0250-\ue007]/g, '') + botwords[Math.floor(Math.random() * botwords.length)].toLowerCase() : botwords[Math.floor(Math.random() * botwords.length)].toLowerCase() + botNameFirst.toLowerCase().replace(/[\u0250-\ue007]/g, '');
			this.state.players.set(v4(), bot);
		}

		for(let bat of this.state.bats.values()){
			bat.move();
		}

		for(let skull of this.state.skulls.values()){
			skull.move();
		}


		for (let id of this.state.players.keys()) {
			if (this.state.players[id].isBot && this.botTimeout == 0) {
				const bot = this.state.players[id];
				const jar = this.state.coinJar;
				const range = 75;
				const moveRandom = ()=>{
					let yMove = Math.random() > 0.5;
							let xMove = Math.random() > 0.5;
							this.moveBot(bot, xMove, !xMove, yMove, !yMove);
				}
				if (bot.coins >= MAX_COINS_HELD/8) {
					if (Math.abs(bot.x-jar.x) < range || Math.abs(bot.y-jar.y) < range) {
						if (bot.x > jar.x + range) {
							this.moveBot(bot, false, true, false, false);
						} else if (bot.x < jar.x - range) {
							this.moveBot(bot,  true, false, false, false);
						} else if (bot.y < jar.y + range) {
							this.moveBot(bot, false, false, false, true);
						}
						else if (bot.y > jar.y + range) {
							this.moveBot(bot, false, false, true, false);
						} 
					} else {
						moveRandom();
					}
				} else {
					moveRandom();
				}
			}

			if (this.botTimeout == 0) {
				this.botTimeout = Math.floor(Math.random() * 50) + 1;
			}

			this.botTimeout--;

			this.state.players[id].tick(dx);

			for (let id2 of this.state.players.keys()) {
				for (let i = 0; i < this.state.players[id2].fireballs.length; i++) {
					if (id != id2) {
						if (this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y, this.state.players[id].team)) {
						    this.state.players[id2].hitsDealt ++;
							this.state.players[id].hitsRecived ++;
							var fireBall = this.state.players[id2].fireballs[i];
							const coinChance = .2; // the possibility of removing a coin on collision with a fireball, this is done to spread out the coins more
							const lifetimeRemove = 1; // the lifetime decreace of the fireball for every coin it removes from a dragon (as if  it is heavier)

							this.state.players[id].push(fireBall.angle - Math.PI, fireBall.speed)
							//console.log(this.state.players[id].x + "    " + this.state.players[id].y)
							if (this.state.players[id].coins > 0 && Math.random() < coinChance) {
								this.state.players[id].coins--;
								fireBall.lifetime -= lifetimeRemove;
								if (fireBall.type == "poison" && this.state.players[id2].coins < 10) {
									this.state.players[id2].coins++;
									this.state.players[id2].coinsPickedUp++;
								} else {
									this.createCoin(this.state.players[id].x, this.state.players[id].y);
								}
							}


							switch (fireBall.type) {
								case "electric":
									if (this.state.players[id2].fireballs.length < 10 && Math.random() > .9) {
										const angle = Math.random() * 6.28;
										const newX = this.state.players[id].x + 50 * Math.cos(angle);
										const newY = this.state.players[id].y + 50 * Math.sin(angle);
										if (!Maths.checkWalls(newX, newY, 22.5)) {
											this.state.players[id2].fireballs.push(new Fireball(newX, newY, angle + Math.PI, 7, "electric", 20, 0));

										}
									}
									break;
								case "mud":
									fireBall.width += 1;
									fireBall.height += 1.87;
									//fireBall.speed += .05;
									break;
								case "ice":
									this.state.players[id].deceleration = 2;
									break;
							}
						}
					}
				}

			}

			if (this.state.coinJar.checkHit(this.state.players[id].x, this.state.players[id].y, 0)) {
				// when a player has collided with the coinjar
				this.state.players[id].score += this.state.players[id].coins;// add coins to players score
				this.state.players[id].coins = 0;// remove coins
			}

			for(let cid of this.state.coins.keys()){
				if (this.state.coins[cid].checkHit(this.state.players[id].x, this.state.players[id].y, 0) && this.state.players[id].coins < 10) {
					
					var coins = this.state.players[id].coins;
					switch (this.state.coins[cid].getSize()) {
						case (20):
							coins++;
							break;
						case (25):
							coins += 2;
							break;
						case (30):
							coins += 4;
							break;
						case (100):
							this.state.players[id].score += 20;
							this.state.players[id].coinsPickedUp += 20;
							break;
					}
					this.state.players[id].coinsPickedUp += Math.min(coins, 10)-this.state.players[id].coins;
					this.state.players[id].coins = Math.min(coins,10);
					this.state.coins.delete(cid);
				}
			}

			for(let bat of this.state.bats.values()){
				if(bat.checkHit(this.state.players[id].x, this.state.players[id].y)){
					this.state.players[id].deceleration = 2 ;
					this.state.players[id].fireballCooldown += .2;
					break;
				}
			}
			
			for(let skull of this.state.skulls.values()){
				if(skull.checkHit(this.state.players[id].x, this.state.players[id].y)){
					this.state.players[id].push(skull.angle, skull.speed*1.2);
					if(Math.random() < .2 && this.state.players[id].coins > 0){
						this.state.players[id].coins --;
						if(Math.random() < .5 && this.state.players[id].score > 0){
							this.state.players[id].score --;
						}
					}
					break;
				}
			}
		}
	}
}