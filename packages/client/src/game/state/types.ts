import { Fireball } from "@dragondungeon/common";
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
  bats: {[key: string]: IBat};
  gamewidth: number;
  gameheight: number;
  batRot: number;
  gamemode: 'FFA'|'CTC';

  skulls: {[key: string]: ISkull}

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
  dead: boolean;
  team: number;
}

export interface ICoin{
  key: number;
  x: number;
  y: number;
  size: number;
  team: number;
}

export interface ICoinJar{
  key: number;
  x: number;
  y:number;
  team:number;
}

export interface ILeaderboard{
  name: string;
  score: number;
}

export interface IBat{
  key: number;
  x: number;
  y: number;
  angle: number;
}

export interface ISkull{
  key: number;
  x: number;
  y: number;
  angle: number;
}

export interface IWall{
  key: number;
  x: number;
  y: number;
  xLength: number;
  yNumber: number;
  health: number;
  angle: number;
}


export type GameState = IGameState | null;
