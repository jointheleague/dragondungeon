import {
	getRandomInt
} from '@dragoncoin/common/build/maths';

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
	Fireball
} from '@dragoncoin/common';

import * as admin from 'firebase-admin';
import { v4 } from "uuid";

const admin_sdk_key = require('../../top_secret/adminsdk.json');
const botnames = require('./botnames.json');

admin.initializeApp({
  credential: admin.credential.cert(admin_sdk_key)
});

export class GameRoom extends Room < GameState > {
	counter = 0;
	botTimeout = 0;
	maxClients: 10

	onCreate() {
		this.setState(new GameState())
		this.registerMessages();
		this.startGameLoop();
		this.state.countdown = new Countdown(5, 0);
	}

	async onJoin(client: Client, options: {token: string}, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);
		var s = "";
		switch(Math.floor(Math.random()*5)){
            case 0:
             	s = "fire";
             	break;
            case 1:
             	s = "ice";
              	break;
            case 2:
        		s = "poison";
            	break;
            case 3:
            	s = "mud";
            	break;
			case 4:
				s = "electricity";
				break;
          }
		this.state.players[client.id] = new Player(s);
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
		setInterval(() => {
			this.clock.tick();
			this.tick();
		}, 1000 / 60);
		
	}
	
	cancelGameLoop() {
		this.clock.clear()
	}

	spawnCoin(){
		var num = Math.random();
		var size = 20;
		if(num >= .75){
			size += 5;
			if(num >= .95){
				size += 5;
				if(num >= .995){
					size = 100;
				}
			}
		}
		var newX;
		var newY;
		do {
			newX = Math.random() * 2000;
			newY = Math.random() * 2000;
		}while(Maths.checkWalls(newX, newY, size) || (newX > 700 && newY > 700 && newX < 1300 && newY < 1300))
		this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, size));
	
	}

	createCoin(x: number, y: number){
		var rand;
		var newX;
		var newY;
		do {
			rand = getRandomInt(0, 62) / 10;
			newX = x + 100 * Math.cos(rand);
			newY = y + 100 * Math.sin(rand);
		}while(Maths.checkWalls(newX, newY, 20))
		this.state.coins.set(v4(), new Coin(this.state.coins.size, newX, newY, 20));
	}

	tick() {
		this.counter++;
		const dx = this.clock.deltaTime;
		this.state.countdown.elaspseTime();

		if (this.state.countdown.done) {
			this.state.players.forEach((player: Player) => {
				player.gameOver = true;
			});
		}

		for (let i = this.state.coins.size; i < this.state.players.size * 5; i++) {
			this.spawnCoin();
		}

		if (this.state.players.size < 6) {
			let bot = new Player("Fire");
			bot.isBot = true;
			let botNameRegion = botnames[Math.floor(Math.random() * botnames.length)];
			let botNameGender = Math.random() > 0.5 ? true : false;
			let botNameFirst = botNameGender ? botNameRegion.male[Math.floor(Math.random() * botNameRegion.male.length)] : botNameRegion.female[Math.floor(Math.random() * botNameRegion.female.length)];
			let botNameLast = botNameRegion.surnames[Math.floor(Math.random() * botNameRegion.surnames.length)];
			switch (Math.floor(Math.random() * 5)) {
				case 0:
					bot.onlineName = botNameFirst.toLowerCase();
					break;
				case 1:
					bot.onlineName = botNameFirst.toLowerCase() + botNameLast.toLowerCase();
					break;
				case 2:
					bot.onlineName = botNameFirst.toLowerCase() + botNameFirst;
					break;
				case 3:
					bot.onlineName = botNameLast + "1";
					break;
				case 4:
					bot.onlineName = botNameFirst + "1";
					break; 
			}
			this.state.players.set(v4(), bot);
		}
		

		for (let id of this.state.players.keys()) {
			if (this.state.players[id].isBot && this.botTimeout == 0) {
				let botDir = Math.floor(Math.random() * 4);
				switch(botDir) {
					case 0:
						this.state.players[id].inputs({
							up: true,
							down: false,
						});
						break;
					case 1:
						this.state.players[id].inputs({
							up: false,
							down: true,
							space: true,
						});
						break;
					case 2:
						this.state.players[id].inputs({
							left: true,
							right: false,
						});
						break;
					case 3:
						this.state.players[id].inputs({
							left: false,
							right: true,
						});
						break;
					}
				}
			
			if (this.botTimeout == 0) {
				this.botTimeout = Math.floor(Math.random() * 20) + 1;
			}

			this.botTimeout--;

			this.state.players[id].tick(dx);

			for (let id2 of this.state.players.keys()) {
				for (let i = 0; i < this.state.players[id2].fireballs.length; i++) {
					if (id != id2) {
						if (this.state.players[id2].fireballs[i].checkHit(this.state.players[id].x, this.state.players[id].y)) {
						    var fireBall = this.state.players[id2].fireballs[i];
							const coinChance = .2; // the possibility of removing a coin on collision with a fireball, this is done to spread out the coins more
							const lifetimeRemove = 1; // the lifetime decreace of the fireball for every coin it removes from a dragon (as if  it is heavier)

							const oldX = this.state.players[id].x;
							const oldY = this.state.players[id].y;
							const newX = oldX + (fireBall.speed * Math.cos(fireBall.angle - Math.PI));
							const newY = oldY + (fireBall.speed * Math.sin(fireBall.angle - Math.PI));

							if(!Maths.checkWalls(oldX, newY, 45)){
								this.state.players[id].y = newY;
							}
							if(!Maths.checkWalls(newX, oldY, 45)){
								this.state.players[id].x = newX;
							}
							//console.log(this.state.players[id].x + "    " + this.state.players[id].y)
							if (this.state.players[id].coins > 0 && Math.random() < coinChance) {
								this.state.players[id].coins --;
								fireBall.lifetime -= lifetimeRemove;
								if(fireBall.type == "poison" && this.state.players[id2].coins < 10){
									this.state.players[id2].coins ++;
								}else{
									this.createCoin(this.state.players[id].x,this.state.players[id].y);
								}
							}


							switch (fireBall.type) {
								case "electricity":
									if(this.state.players[id2].fireballs.length < 10 &&  Math.random() > .9){
										const angle = Math.random() * 6.28;
										const newX = this.state.players[id].x + 50 * Math.cos(angle);
										const newY = this.state.players[id].y + 50 * Math.sin(angle);
										if(!Maths.checkWalls(newX, newY, 22.5)){
											this.state.players[id2].fireballs.push(new Fireball(newX, newY, angle + Math.PI, 7, "electricity", 20));
											
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
				
				if(this.state.coinJar.checkHit(this.state.players[id].x, this.state.players[id].y)){
					// when a player has collided with the coinjar
					this.state.players[id].score += this.state.players[id].coins;// add coins to players score
					this.state.players[id].coins = 0;// remove coins
				}

				for(let cid of this.state.coins.keys()){
					if (this.state.coins[cid].checkHit(this.state.players[id].x, this.state.players[id].y) == true && this.state.players[id].coins < 10) {
						var coins = this.state.players[id].coins;
						switch(this.state.coins[cid].getSize()){
							case (20):
								coins ++;
								break;
							case (25):
								coins += 2;
								break;
							case (30):
								coins += 4;
								break;
							case (100):
								this.state.players[id].score += 50;
								break;
						}
						this.state.players[id].coins = Math.min(coins,10);
						this.state.coins.delete(cid);
					}
				}

				if(this.state.players[id].x < 0){
					this.state.players[id].x = 0;
				} else if(this.state.players[id].x > 2000){
					this.state.players[id].x = 2000;
				}

				if(this.state.players[id].y < 0){
					this.state.players[id].y = 0;
				} else if(this.state.players[id].y > 2000){
					this.state.players[id].y = 2000;
				}
				
			}
			// console.log(id + "  " + this.state.players[id].score);
		}
	}
}