import React, {useMemo} from 'react';
import * as PIXI from 'pixi.js';
import {AnimatedSprite} from '../../entities/AnimatedSprite';
import WallImage from './sprites/TotalWall.jpg';

interface IProps {
    x: number;
    y: number;
    xLength: number;
    yLength: number;
    angle: number;
}


let ANIMATION_SPEED = 0;
export const Wall = (props: IProps) => {
  ANIMATION_SPEED = Math.random()/10;
  const fenceTextures = useMemo(() => {
    let fenceImages = [WallImage];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    fenceImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);

  return (
    <AnimatedSprite
    anchor={new PIXI.Point(0, 0)}
    width ={props.xLength}
    height = {props.yLength}
    textures = {fenceTextures}
    x={props.x}
    animationSpeed = {ANIMATION_SPEED}
    rotation = {props.angle}
    loop= {true}
    y={props.y}
    />
    )
 
}
