import {
	Room,
	Client
} from 'colyseus';

import {
	GameState,
	Player,
	IInputs,
	Coin,
	Maths,
	Countdown,
	Fireball,
	CircleBat,
	LineSkull,
} from '../common';

import * as admin from 'firebase-admin';
import { v4 } from "uuid";

const botnames = require('./botnames.json');
const botwords = require('./wordlists/nouns.json');
const MAX_COINS_HELD = 30;

const serviceAccount = require('../config/private/adminsdk.json')

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })

export class GameRoom extends Room<GameState> {
	counter = 0;
	botTimeout = 0;
	maxClients = 15;

	redTeamIds: string[] = [];
	blueTeamIds: string[] = [];

	gameInt: NodeJS.Timeout;


	onCreate() {
		this.setState(new GameState())
		this.registerMessages();
		this.startGameLoop();
	}

	async onJoin(client: Client, options: { token: string }, _2: any) {
		const user = await admin.auth().verifyIdToken(options.token);
		console.log("creating player " + user.uid)
		const db = admin.firestore();
		let ballType = "fireball";
		let dragonSkin = "default";

		const userDoc = await db.collection(user.uid).doc("gameplay").get();
		if (userDoc.data()?.ballType) {
			ballType = userDoc.data()?.ballType;
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

		if (userDoc.data()?.dragonSkin) {
			dragonSkin = userDoc.data()?.dragonSkin;
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
		if(this.state.gamemode == 'CTC'){
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
		
	}

	registerMessages() {
		this.onMessage("input", (client: Client, message: IInputs) => {
			
			//console.log("got player input");
		})
	}

	startGameLoop() {
		this.gameInt = setInterval(() => {
		
			this.clock.tick();
			this.tick();
			this.state.debugOn = !this.state.debugOn;
			
		}, 1000 / 60);
	}

	gameOver(){
		this.clock.clear();
		clearInterval(this.gameInt);
	}

	spawnCoin() {
	}

	createCoin(x: number, y: number) {
	}

	moveBot(bot: Player, right: boolean, left: boolean, up: boolean, down: boolean) {
		
	}

	checkWalls(newX: number, newY: number, rad: number, isFireball: boolean){
	
	}

	generateBotName() {
	
	}

	tick() {
		
	}
}