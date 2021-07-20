import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface CollisionBallProps {

  x: number;
  y: number;
  rot: number;
  width: number;
  height: number;
  circle: boolean;
}

function propsEqual(oldProps: CollisionBallProps, newProps: CollisionBallProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.height === newProps.height &&
    oldProps.rot === newProps.rot &&
    oldProps.circle === newProps.circle 
  );
}

export const CollisionBall = CustomPIXIComponent<PIXI.Graphics, CollisionBallProps>(
  { 
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        instance.clear();
        instance.beginFill(0xe5651b);
        if(newProps.circle){
          instance.drawCircle(
            newProps.x,
            newProps.y,
            newProps.width
          );
        }else{
          instance.rotation = Math.PI;
          instance.drawRect(
            newProps.x - newProps.width/2,
            newProps.y - newProps.height/2,
            1000,
            newProps.height
          );
        }
        instance.endFill();
      }
    },
    
  },
  "Bar"
);