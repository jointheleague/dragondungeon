import React from 'react';
import {IPlayer} from '../../state/types';
import * as PIXI from 'pixi.js'
import {AnimatedSprite} from './AnimatedSprite';
import dragon1 from "./dragonSprites/tile001.png"; 
import dragon2 from "./dragonSprites/tile002.png"; 
import dragon3 from "./dragonSprites/tile003.png"; 
import dragon4 from "./dragonSprites/tile004.png"; 

interface IProps {
  key: string;
  player: IPlayer;
  bunnyRot: number;
}

//Create textures from spites
let dragonImages = [dragon1,dragon2,dragon3, dragon4];  
let textures: PIXI.AnimatedSprite["textures"] = [];
dragonImages.forEach(image =>{
  let texture = PIXI.Texture.from(image);
   textures.push(texture);
})

const ANIMATION_SPEED = 0.2;

export const Player = (props: IProps) => {
  return (<AnimatedSprite
    anchor={new PIXI.Point(0.5, 0.5)}
    width ={200}
    height = {200}
    textures = {textures}
    x={props.player.x}
    animationSpeed = {ANIMATION_SPEED}
    loop= {true}
    y={props.player.y}
    />)
}
