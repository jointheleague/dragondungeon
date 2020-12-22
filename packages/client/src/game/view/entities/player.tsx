import React from 'react';
import {IPlayer} from '../../state/types';
import {Sprite} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js'

interface IProps {
  key: string;
  player: IPlayer;
  bunnyRot: number;
}

export const Player = (props: IProps) => {
  return (<Sprite
    anchor={new PIXI.Point(0.5, 0.5)}
    texture={PIXI.Texture.from("https://i.imgur.com/IaUrttj.png")}
    rotation={2**2*Math.sin(Math.PI*props.bunnyRot)}
    x={props.player.x}
    y={props.player.y}
    />)
}
