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
	@type("string")
	first: string = 'hello';

	constructor() {
		super();
	}
}

