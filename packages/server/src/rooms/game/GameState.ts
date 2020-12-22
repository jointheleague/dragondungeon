import { Schema, type, MapSchema } from '@colyseus/schema';
import {Geometry, Maths} from '@bulletz/common';

export interface IInputs {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
  shoot: boolean;
  autoshoot: boolean;
}

type GameLifecycle = 'lobby' | 'deathmatch';

export class Player extends Schema {
  @type("string")
  name: string;

  @type("boolean")
  host: boolean;

  @type("number")
  x: number = 1;

  @type("number")
  y: number = 1;

  speed:number = 15;
  direction: Geometry.Vector = new Geometry.Vector(0, 0);

  activeInputs: IInputs= {
    left: false,
    up: false,
    right: false,
    down: false,
    shoot: false,
    autoshoot: false
  };

  constructor(name: string, host: boolean) {
    super()
    this.name = name;
    this.host = host;
  }

  inputs(i: IInputs) {
    this.activeInputs = Object.assign({}, this.activeInputs, i);
    const resDirection = new Geometry.Vector(0, 0);
    if (i.right) {
      resDirection.x+=1;
    }
    if (i.left) {
      resDirection.x-=1;
    }
    if (i.up) {
      resDirection.y-=1;
    }
    if (i.down) {
      resDirection.y+=1;
    }
    this.direction = resDirection;
  }

  tick(dx: number) {
    if (this.direction.x != 0 || this.direction.y != 0) {
      this.move(this.direction.x, this.direction.y, this.speed*dx/50)
    }
  }

  move(dirX: number, dirY: number, speed: number) {
    const magnitude = Maths.normalize2D(dirX, dirY);

    const speedX = Maths.round2Digits(dirX * (speed / magnitude));
    const speedY = Maths.round2Digits(dirY * (speed / magnitude));

    this.x = this.x + speedX;
    this.y = this.y + speedY;
  }

}

export class GameState extends Schema {
  @type("boolean")
  first: boolean = false;

  @type("string")
  lifecycle: GameLifecycle  = "lobby";

  @type({map: Player})
  players = new MapSchema<Player>();
}
