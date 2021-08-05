import { Fireball } from "@dragoncoin/common";
import { InteractionManager } from "pixi.js";

export {Fireball};

export interface IGameState {
  lifecycle: 'lobby' | 'deathmatch';
  players: {[key: string]: IPlayer};
  coinJar: ICoinJar;
  coins: {[key: string]: ICoin};
  bars: IBar[];
  countdown: ICountdown;
  gameOver: boolean;
}

export interface ICountdown{
  seconds: number;
  minutes: number;
  done: boolean;
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
  coins: number;
  onlineName: string;
  onlineID: string;
  ballType: string;
  skinType: string;
  hitsRecived: number;
  hitsDealt: number;
  coinsPickedUp: number;
}

export interface ICoin{
  key: number;
  x: number;
  y: number;
  size: number;
}

export interface ICoinJar{
  key: number;
  x: number;
  y:number;
}

export interface ILeaderboard{
  name: string;
  score: number;
}


export type GameState = IGameState | null;
