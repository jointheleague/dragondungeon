export interface IGameState {
  lifecycle: 'lobby' | 'deathmatch';
  players: {[key: string]: IPlayer};
}

export interface Fireball {
  x: number;
  y: number;
  id: string;
}

export interface IPlayer {
  name: string;
  host: boolean;
  x: number;
  y: number;
  angle: number;
  fireballs: Fireball[];
}

export type GameState = IGameState | null;
