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

		const db = admin.firestore();
		}




	onLeave(client: Client, _consent: boolean) {
		
	}

	registerMessages() {
		this.onMessage("input", (client: Client, message: IInputs) => {
			
			console.log("got player input");
		})
	}

	startGameLoop() {
		this.gameInt = setInterval(() => {
		
			this.clock.tick();
			this.tick();
			
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