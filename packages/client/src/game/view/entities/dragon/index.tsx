import React, {useMemo} from 'react';
import {IPlayer} from '../../../state/types';
import * as PIXI from 'pixi.js-legacy'
import {AnimatedSprite} from '../AnimatedSprite';import {
  CustomPIXIComponent,
} from "react-pixi-fiber";

import dragon1 from "./sprites/dragon2.png";
import dragon2 from "./sprites/dragon3.png";
import dragon3 from "./sprites/dragon4.png";
import dragon4 from "./sprites/dragon5.png";

import lightDragon1 from "./sprites/lightDragon2.png";
import lightDragon2 from "./sprites/lightDragon3.png";
import lightDragon3 from "./sprites/lightDragon4.png";
import lightDragon4 from "./sprites/lightDragon5.png";

import goldDragon1 from "./sprites/goldDragon2.png";
import goldDragon2 from "./sprites/goldDragon3.png";
import goldDragon3 from "./sprites/goldDragon4.png";
import goldDragon4 from "./sprites/goldDragon5.png";

import blankDragon from "./sprites/blankDragon.png";
import { Player } from '../../../../../../common/build';

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

  /* const fireballTextures = useMemo(() => {
    //Create textures from spites
    let fireballImages = [dragon1,dragon2,dragon3, dragon4];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    dragonImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);  */



    customApplyProps: (instance, oldProps, newProps) => {
      if (newProps.zIndex) {
        instance.zIndex = newProps.zIndex;
      }
      if (!propsEqual(oldProps, newProps)) {
        const teamColor = 0xFF0000;
        instance.clear()
        instance.beginFill(teamColor, 1); // Red
        instance.drawCircle(newProps.x, newProps.y, newProps.radius);
        instance.endFill()
      }
    }
  },
  "TeamOrb"
);

const ANIMATION_SPEED = 0.08;

export const Dragon = (props: IProps) => {
  const dragonTextures = useMemo(() => {
    // TODO: Create textures from spites
    let dragonImages;
    switch(props.player.skinType){
      case "light":
        dragonImages = [lightDragon1, lightDragon2, lightDragon3, lightDragon4];
        break;
      case "gold":
        dragonImages = [goldDragon1, goldDragon2, goldDragon3, goldDragon4];
        break
      default:
        dragonImages = [dragon1, dragon2, dragon3, dragon4];
    }
    //let dragonImages = [blankDragon];
    let textures: PIXI.AnimatedSprite["textures"] = [];
    dragonImages.forEach(image =>{
      let texture = PIXI.Texture.from(image);
       textures.push(texture);
    });
    return textures;
  }, []);

  const fireballs = props.player.fireballs.map((fb, i) => <TeamOrb key={i} x={fb.x} y={fb.y} radius={4}/>)
  var yS = 5;
  if(Math.abs(props.player.angle)<(Math.PI/2)){
    yS = -5;
  }
  return (
    <>
      <AnimatedSprite
      anchor={new PIXI.Point(0.5, 0.5)}
      width ={90}
      height = {90}
      textures = {dragonTextures}
      rotation={props.player.angle + Math.PI}
      x={props.player.x}
      animationSpeed={ANIMATION_SPEED}
      loop= {true}
      y={props.player.y}
      xScale = {5}
      yScale = {yS}
      />
      {fireballs}
    </>
  )
}