import React from 'react';
import {IPlayer} from '../../../state/types';
import * as PIXI from 'pixi.js-legacy'
import {AnimatedSprite} from '../AnimatedSprite';
import dragon1 from "./sprites/tile001.png";
import dragon2 from "./sprites/tile002.png";
import dragon3 from "./sprites/tile003.png";
import dragon4 from "./sprites/tile004.png";

interface IProps {
    key: string;
    player: IPlayer;

  }

//Create textures from spites
let dragonImages = [dragon1,dragon2,dragon3, dragon4];
let textures: PIXI.AnimatedSprite["textures"] = [];
dragonImages.forEach(image =>{
  let texture = PIXI.Texture.from(image);
   textures.push(texture);
})

const ANIMATION_SPEED = 0.08;

export const Dragon = (props: IProps) => {
  return (<AnimatedSprite
    anchor={new PIXI.Point(0.5, 0.5)}
    width ={100}
    height = {100}
    textures = {textures}
    rotation={props.player.angle+Math.PI}
    x={props.player.x}
    animationSpeed={ANIMATION_SPEED}
    loop= {true}
    y={props.player.y}
    />)
}
