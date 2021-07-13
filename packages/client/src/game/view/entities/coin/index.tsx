import React, {useMemo} from 'react';
import * as PIXI from 'pixi.js';
import {AnimatedSprite} from '../AnimatedSprite';
import coinImage1 from './sprites/coin1.png';
import coinImage2 from './sprites/coin2.png';

interface IProps {
    key: string;
    x: number;
    y: number;
    size: number;
}


let ANIMATION_SPEED = 0;
export const Coin = (props: IProps) => {
  ANIMATION_SPEED = Math.random()/10;
  const coinTextures = useMemo(() => {
    //Create textures from spites
    let coinImages = [coinImage1, coinImage2];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    coinImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);

  
  return (
    <AnimatedSprite
    anchor={new PIXI.Point(0.5, 0.5)}
    width ={props.size}
    height = {props.size}
    textures = {coinTextures}
    x={props.x}
    animationSpeed = {ANIMATION_SPEED}
    loop= {true}
    y={props.y}
    />
    )
 
}
