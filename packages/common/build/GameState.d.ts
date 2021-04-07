import { Schema, MapSchema } from '@colyseus/schema';
import { Player } from './Player';
import { Coin } from './Coin';
import { CoinJar } from './CoinJar';
import { BorderFence } from './BorderFence';
export declare class GameState extends Schema {
    first: boolean;
    players: MapSchema<Player>;
    coinJar: CoinJar;
    coins: MapSchema<Coin>;
    fences: MapSchema<BorderFence>;
    debugOn: boolean;
    constructor();
}
