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
import { Bat } from './Bat';
import { Skull } from './Skull';

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

	@type(Bat)
	bats = new MapSchema <Bat>();

	@type(Skull)
	skulls = new MapSchema <Skull>();
	
	@type("boolean")
	debugOn: boolean = false;

	@type("boolean")
	gameOver: boolean = false;


	@type("number")
	batRot: number = 0;

	//"FFA" or "coinCapture"
	@type("string")
	gamemode: string = "FFA"


	constructor() {
		super();
	}
}

