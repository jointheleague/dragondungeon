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
import { BorderFence } from './BorderFence';
import { Countdown } from './Countdown';

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

	@type({map: BorderFence})
	fences = new MapSchema < BorderFence > ();

	@type(Countdown)
	countdown = new Countdown(0, 30);
	
	@type("boolean")
	debugOn: boolean = false;

	@type("boolean")
	gameOver: boolean = false;

	constructor() {
		super();
	}
}

