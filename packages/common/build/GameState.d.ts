import { Schema, MapSchema, ArraySchema } from '@colyseus/schema';
import { Player } from './Player';
import { Coin } from './Coin';
import { CoinJar } from './CoinJar';
export declare class GameState extends Schema {
    first: boolean;
    players: MapSchema<Player>;
    coins: ArraySchema<Coin>;
    coinJar: CoinJar;
    constructor();
}
