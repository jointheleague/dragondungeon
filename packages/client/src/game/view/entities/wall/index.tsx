import React, {useMemo} from 'react';
import * as PIXI from 'pixi.js';
import {AnimatedSprite} from '../../entities/AnimatedSprite';
import WallImage5 from './sprites/Wall(5.2).png';
import WallImage3 from './sprites/Wall(3.2).jpg';
import WallImage2 from './sprites/Wall(2.2).png';

interface IProps {
    x: number;
    y: number;
    xLength: number;
    yLength: number;
    angle: number;
}


export const Wall = (props: IProps) => {
  const fenceTextures = useMemo(() => {
    let fenceImages = [WallImage2];
    if(props.xLength > 200){
      fenceImages = [WallImage3];
      if(props.xLength > 400){
        fenceImages = [WallImage5];
      }
    }
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
    rotation = {props.angle}
    loop= {true}
    y={props.y}
    />
    )
 
}
