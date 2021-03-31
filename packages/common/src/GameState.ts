import {
	Schema,
	type,
	MapSchema,
	ArraySchema
} from '@colyseus/schema';

import { Player } from './Player';
import { Coin } from './Coin';
import { CoinJar } from './CoinJar';
import { v4 } from "uuid";
export class GameState extends Schema {
	@type("boolean")
	first: boolean = false;

	@type({
		map: Player
	})
	players = new MapSchema < Player > ();

	@type(CoinJar)
	coinJar = new CoinJar();
	
	@type({map: Coin})
	coins = new MapSchema < Coin > ();
	
	constructor() {
		super();
		let coinRadius = 200;
		let coinCircleX = 250;
		let coinCircleY = 250;
		let numberOfCoins = 15;
		for (let i = 0; i < numberOfCoins; i++) {
			//this.coins[v4] = new Coin(i, Math.random()*2000, Math.random()*1000);
			this.coins.set(v4(), new Coin(i, Math.random()*2000, Math.random()*1000));
		}
	}
}

