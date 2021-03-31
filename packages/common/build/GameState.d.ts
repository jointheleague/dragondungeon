import { Schema, MapSchema } from '@colyseus/schema';
import { Player } from './Player';
import { Coin } from './Coin';
export declare class GameState extends Schema {
    first: boolean;
    players: MapSchema<Player>;
    coins: MapSchema<Coin>;
    debugOn: boolean;
    constructor();
}
