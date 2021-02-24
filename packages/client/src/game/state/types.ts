export interface IGameState {
  lifecycle: 'lobby' | 'deathmatch';
  players: {[key: string]: IPlayer};
  coins: ICoin[];
  bars: IBar[];
}

export interface Fireball {
  x: number;
  y: number;
  id: string;
}

export interface IBar{
  x: number;
  y: number;
  key: string;
}

export interface IPlayer {
  name: string;
  host: boolean;
  x: number;
  y: number;
  angle: number;
  fireballs: Fireball[];
  bar: IBar;
  score: number;
}

export interface ICoin{
  key: number;
  x: number;
  y:number;
}
export type GameState = IGameState | null;
