import React, { useMemo } from 'react';
import * as PIXI from 'pixi.js';
import { AnimatedSprite } from '../../entities/AnimatedSprite';
// import WallImage5 from './sprites/Wall(5.2).png';
// import WallImage3 from './sprites/Wall(3.2).jpg';
// import WallImage2 from './sprites/Wall(2.2).png';
import WallImage from './sprites/WallSec.png'

interface IProps {
  x: number;
  y: number;
  xLength: number;
  yLength: number;
  angle: number;
}
 

export const Wall = (props: IProps) => {
  const fenceTextures = useMemo(() => {
    let textures: any = []
    textures = [PIXI.Texture.from(WallImage.src)]
    return textures
  }, []);

  return (
    <AnimatedSprite
      key={Math.floor(Math.random() * 100000)}
      anchor={new PIXI.Point(0, 0)}
      width={props.xLength}
      height={props.yLength}
      textures={fenceTextures}
      x={props.x}
      rotation={props.angle}
      loop={true}
      y={props.y}
    />
  )

}
