import { Schema, type, MapSchema, ArraySchema, CollectionSchema } from '@colyseus/schema';
import {Geometry, Maths} from '@bulletz/common';
import { GameRoom } from 'rooms/GameRoom';
import {v4} from "uuid";
export interface IInputs {
  left: boolean;
  up: boolean;
  right: boolean;
  down: boolean;
  shoot: boolean;
  autoshoot: boolean;
  mouseX: number;
  mouseY: number;
  space: boolean;
}

type GameLifecycle = 'lobby' | 'deathmatch';

export class Fireball extends Schema{
  @type("number")
  x: number=1;

  @type("number")
  y: number=1;

  @type("string")
  id: string;

lifetime = 50;

  constructor(name: string, x: number, y: number) {
    super()
    this.x = x;
    this.y = y;
    this.id = v4();
  }

  checkHit(){
    //check if the fireball hits another dragon here
    console.log("shoots");
  }

 }



export class Player extends Schema {
  @type([ Fireball ])
  fireballs = new ArraySchema<Fireball>();

  @type("string")
  name: string;

  @type("boolean")
  host: boolean;

  @type("number")
  x: number = 1;

  @type("number")
  y: number = 1;

  @type("number")
  angle: number = 0;

  speed:number = 20;
  direction: Geometry.Vector = new Geometry.Vector(0, 0);

  activeInputs: IInputs= {
    left: false,
    up: false,
    right: false,
    down: false,
    shoot: false,
    autoshoot: false,
    mouseX: 0.0,
    mouseY: 0.0,
    space: false
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
    this.angle = Math.atan2(this.y - i.mouseY, this.x - i.mouseX);
    this.direction = resDirection;
  }

  fireballCooldown: number = 0;
  tick(dx: number) {
    const ticks = dx/50;
    if (this.direction.x != 0 || this.direction.y != 0) {
      this.move(this.direction.x, this.direction.y, this.speed*ticks)
    }
    this.fireballCooldown-=ticks;
    if (this.activeInputs.space && this.fireballCooldown <= 0) {
      this.fireballCooldown = 10;
      //console.log("I need to make a fireball here");
      const fireball = new Fireball(this.name, this.x+60*Math.cos(this.angle-(Math.PI)), this.y+ 60*Math.sin(this.angle-(Math.PI)))
      this.fireballs.push(fireball);
      this.fireballs.forEach(element =>{console.log(element.x);});
    }

  /*  for (let fireball of this.fireballs) {
      fireball.lifetime -= ticks;

      if(fireball.lifetime <= 0){
        this.fireballs.splice()
      }
    }*/
    for(var i = 0; i<this.fireballs.length; i++){
      this.fireballs[i].lifetime -= ticks;
      
      if(this.fireballs[i].lifetime <=0){
        this.fireballs.splice(i, 1);
      }
    }
    console.log(this.fireballs.length);


    // for each fireball update based on movement

    //this.fireballs = this.fireballs.filter(fb => fb.lifetime > 0);
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

  @type({map: Fireball})
  fireballs = new MapSchema<Fireball>();
}
