import { Schema, MapSchema } from '@colyseus/schema';
import { Player } from './Player';
import { Coin } from './Coin';
import { CoinJar } from './CoinJar';
export declare class GameState extends Schema {
    first: boolean;
    players: MapSchema<Player>;
    coinJar: CoinJar;
    coins: MapSchema<Coin>;
    debugOn: boolean;
    constructor();
}
