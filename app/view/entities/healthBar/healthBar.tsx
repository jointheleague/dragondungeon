import * as PIXI from "pixi.js";
import { CustomPIXIComponent } from "react-pixi-fiber";

interface BarProps {
  x: number;
  y: number;
  width: number;
  height: number;
  color: number;
  coins: number;
  health: number;
  name: string;
  zIndex?: number;
}

function propsEqual(oldProps: BarProps, newProps: BarProps) {
  return (
    oldProps.x === newProps.x &&
    oldProps.y === newProps.y &&
    oldProps.width === newProps.width &&
    oldProps.color === newProps.color &&
    oldProps.height === newProps.height &&
    oldProps.health === newProps.health &&
    oldProps.coins === newProps.coins &&
    oldProps.name === newProps.name 
  );
}

export const Bar = CustomPIXIComponent<PIXI.Graphics, BarProps>(
  { 
    customDisplayObject: (_) => new PIXI.Graphics(),
    customApplyProps: (instance, oldProps, newProps) => {
      if (!propsEqual(oldProps, newProps)) {
        if (newProps.zIndex) {
          instance.zIndex = newProps.zIndex;
        }
        instance.clear();
        /*instance.beginFill(newProps.color);
        instance.drawCircle(
          newProps.x + 35,
          newProps.y + 80,
          50
        );*/
        instance.beginFill(0xf9e300);
        instance.drawRect(
          newProps.x,
          newProps.y - 35,
          newProps.coins * 7.5,
          newProps.height - 3
        );
        instance.beginFill(0xc60c30);
        instance.drawRect(
          newProps.x,
          newProps.y - 30,
          newProps.health * 7.5,
          newProps.height - 3
        );
        let name = new PIXI.Text(newProps.name, {fontFamily : 'Press Start 2P', fontSize: 20, align : 'center', fill: '#ffffff' });
        name.x = newProps.x - (name.width / 2) + 35;
        name.y = newProps.y - 5;
        instance.addChild(name);
        instance.endFill();
      }
    },
    
  },
  "Bar"
);