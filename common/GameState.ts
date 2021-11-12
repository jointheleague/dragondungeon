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
import {Wall} from './Wall';

export class GameState extends Schema {
	@type("boolean")
	first: boolean = false;

	@type({
		map: Player
	})
	players = new MapSchema < Player > ();
	
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

	@type(Wall)
	walls = new MapSchema<Wall>();


	@type("number")
	batRot: number = 0;

	@type("number")
	gamewidth: number = 4000;

	@type("number")
	gameheight: number = 4000;

	
	@type(CoinJar)
	coinJar = new CoinJar(this.gamewidth/2, this.gameheight/2);

	//"FFA" or "coinCapture"
	@type("string")
	gamemode: string = "FFA"

	constructor() {
		super();
	}
}

