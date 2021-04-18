import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  coins: number;
  zIndex?: number;
}

function propsEqual(oldProps: BarProps, newProps: BarProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.color === newProps.color &&
    oldProps.height === newProps.height &&
    oldProps.coins === newProps.coins
  );
}

export const Bar = CustomPIXIComponent<PIXI.Graphics, BarProps>(
  { 
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        var coinsWidth = newProps.coins;
        if (newProps.zIndex) {
          instance.zIndex = newProps.zIndex;
        }
        instance.clear();
        instance.beginFill(.2);
        instance.drawRect(
          newProps.x-2,
          newProps.y+10,
          newProps.width+5,
          newProps.height
        );
        instance.beginFill(newProps.color);
        instance.drawRect(
          newProps.x,
          newProps.y+10,
          coinsWidth*7,
          newProps.height-3
        );
        instance.endFill();
      }
    },
  },
  "Bar"
);