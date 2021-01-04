import React, {useMemo} from 'react';
import {IPlayer} from '../../../state/types';
import * as PIXI from 'pixi.js-legacy'
import {AnimatedSprite} from '../AnimatedSprite';
import dragon1 from "./sprites/tile001.png";
import dragon2 from "./sprites/tile002.png";
import dragon3 from "./sprites/tile003.png";
import dragon4 from "./sprites/tile004.png";

import {
  CustomPIXIComponent,
} from "react-pixi-fiber";

interface IProps {
    key: string;
    player: IPlayer;
}

type TeamOrbProps = {
  x: number;
  y: number;
  radius: number;
  zIndex?: number;
};

function propsEqual(oldProps: TeamOrbProps, newProps: TeamOrbProps) {
  return oldProps.radius === newProps.radius &&
    oldProps.zIndex === newProps.zIndex &&
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y
}

export const TeamOrb = CustomPIXIComponent<PIXI.Graphics, TeamOrbProps>(
  {
    customDisplayObject: props => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (newProps.zIndex) {
        instance.zIndex = newProps.zIndex;
      }
      if (!propsEqual(oldProps, newProps)) {
        const teamColor = 0xFF0000;
        instance.clear()
        instance.beginFill(teamColor, 1); // Red
        instance.drawCircle(newProps.x, newProps.y, newProps.radius*( 3));
        instance.endFill()
      }
    }
  },
  "TeamOrb"
);

const ANIMATION_SPEED = 0.08;

export const Dragon = (props: IProps) => {
  const dragonTextures = useMemo(() => {
    //Create textures from spites
    let dragonImages = [dragon1,dragon2,dragon3, dragon4];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    dragonImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);

  const fireballs = props.player.fireballs.map((fb, i) => <TeamOrb key={i} x={fb.x} y={fb.y} radius={5}/>)
  return (
    <>
      <AnimatedSprite
      anchor={new PIXI.Point(0.5, 0.5)}
      width ={90}
      height = {90}
      textures = {dragonTextures}
      rotation={props.player.angle+Math.PI}
      x={props.player.x}
      animationSpeed={ANIMATION_SPEED}
      loop= {true}
      y={props.player.y}
      />
      {fireballs}
    </>
  )
}
