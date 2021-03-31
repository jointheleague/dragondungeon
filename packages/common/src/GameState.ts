import {
	Schema,
	type,
	MapSchema,
	ArraySchema
} from '@colyseus/schema';

import { Player } from './Player';
import { Coin } from './Coin';
import { CoinJar } from './CoinJar';

export class GameState extends Schema {
	@type("boolean")
	first: boolean = false;

	@type({
		map: Player
	})
	players = new MapSchema < Player > ();

	@type([Coin])
	coins = new ArraySchema < Coin > ();

	@type(CoinJar)
	coinJar = new CoinJar();
	

	constructor() {
		super();
		let coinRadius = 200;
		let coinCircleX = 250;
		let coinCircleY = 250;
		let numberOfCoins = 15;
		for (let i = 0; i < numberOfCoins; i++) {
			this.coins.push(new Coin(i, Math.random()*2000, Math.random()*1000));
		}
	}
}

