import React, {useMemo} from 'react';
import {Fireball} from '../../../state/types';
import * as PIXI from 'pixi.js-legacy'
import {AnimatedSprite} from '../AnimatedSprite';
import iceball1 from "./sprites/tile000.png";
import iceball2 from "./sprites/tile001.png";
import iceball3 from "./sprites/tile002.png";
import iceball4 from "./sprites/tile003.png";

/*import {
  CustomPIXIComponent,
} from "react-pixi-fiber";
*/
interface IProps {
    key: string;
    iceball: Fireball;
}

const ANIMATION_SPEED = 0.08;

export const IceballView = (props: IProps) => {
    
  const iceballTextures = useMemo(() => {
    //Create textures from spites
    let iceballImages = [iceball1,iceball2,iceball3, iceball4];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    iceballImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);

  return (
    <>
      <AnimatedSprite
      anchor={new PIXI.Point(0.5, 0.5)}
      width ={270}
      height = {150}
      textures = {iceballTextures}
      
      x={props.iceball.x}
      animationSpeed={ANIMATION_SPEED}
      loop= {true}
      y={props.iceball.y}
      />

    </>
  )
}