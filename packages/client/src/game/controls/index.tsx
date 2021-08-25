import React, {useEffect, useCallback} from 'react';
import {IInputs} from './types';
import {Viewport} from 'pixi-viewport';
import { show_error_banner } from 'util/banner';
import ReactNipple from 'react-nipple';

interface ControlProps {
    actionCallback: (p: IInputs) => void
    viewport: Viewport
}

const controlsDown: {[key: string]: object} = {
  "w": {up: true},
  "a": {left: true},
  "s": {down: true},
  "d": {right: true},
  " ": {space: true},
  "x": {autoshoot: true}
}

const mouseActivity: {[key: string]: object} = {
  "position": {x:0.0, y:0.0}
}

const controlsUp: {[key: string]: object} = {
  "w": {up: false},
  "a": {left: false},
  "s": {down: false},
  "d": {right: false},
  " ": {space: false},
  "x": {autoshoot: false}
}

let activeControls = {
  left: false,
  up: false,
  right: false,
  down: false,
  shoot: false,
  autoshoot: false,
  angle: 0.0,
  space: false
};

export const Controls = (props: ControlProps) => {
  const actionCallback = props.actionCallback;

  const updateAndSend = useCallback((change: object) => {
    const updated =  Object.assign({}, activeControls, change);
 

    actionCallback(updated)
    activeControls = updated;
  }, [actionCallback])

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      var change = controlsDown[e.key.toLowerCase()]  || {};
      updateAndSend(change);
    }
    const keyup = (e: KeyboardEvent) => {
      const change = controlsUp[e.key.toLowerCase()] || {};
      updateAndSend(change);
    }
    const mouseMove = (e: MouseEvent) => {
      try {
        //const worldCoordinates = props.viewport.toWorld(e.x,e.y);

        const X = window.innerWidth/2;
        const Y = window.innerHeight/2;

        //mouseActivity["position"] = {mouseX:worldCoordinates.x, mouseY:worldCoordinates.y};

        const change = {angle : -Math.atan2(X - e.x, Y - e.y) + Math.PI/2};

        updateAndSend(change); 
      } catch {
        show_error_banner('BAT');
      }
    }
    window.addEventListener("keydown", keydown)
    window.addEventListener("keyup", keyup)
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("keydown", keydown)
      window.removeEventListener("keyup", keyup)
      window.removeEventListener("mousemove", mouseMove)
    }
  }, [props.actionCallback, updateAndSend, props.viewport])
  return <>
  <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh'
    }} onClick={() => {
      console.log('tap');
      var change = controlsDown[' ']  || {};
      updateAndSend(change);
    }} />
  <ReactNipple
    options={{ color: 'transparent', mode: 'dynamic', position: { bottom: '50%', right: '50%' } }}
    style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh'
    }}
    onMove={( evt: any, data: any) => {
      if (data.direction) {
        if (data.direction.x == 'left') {
          var change = controlsDown['a']  || {};
          updateAndSend(change);
        } else {
          var change = controlsDown['d']  || {};
          updateAndSend(change);
        }
  
        if (data.direction.y == 'up') {
          var change = controlsDown['w']  || {};
          updateAndSend(change);
        } else {
          var change = controlsDown['s']  || {};
          updateAndSend(change);
        }
      } else {
        var changeu = controlsUp['w']  || {};
        var changel = controlsUp['a']  || {};
        var changed = controlsUp['s']  || {};
        var changer = controlsUp['d']  || {};
        updateAndSend(changeu);
        updateAndSend(changel);
        updateAndSend(changed);
        updateAndSend(changer);
      }
    }} /></>
}
