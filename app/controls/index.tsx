import React, { useEffect, useCallback } from 'react';
import { IInputs } from '../../common';
import { Viewport } from 'pixi-viewport';
import ReactNipple from 'react-nipple';

interface ControlProps {
  actionCallback: (p: IInputs) => void
  viewport: Viewport
}

const controlsDown: { [key: string]: object } = {
  "w": { up: true },
  "a": { left: true },
  "s": { down: true },
  "d": { right: true },
  " ": { space: true },
  "x": { autoshoot: true }
}

const mouseActivity: { [key: string]: object } = {
  "position": { x: 0.0, y: 0.0 }
}

const controlsUp: { [key: string]: object } = {
  "w": { up: false },
  "a": { left: false },
  "s": { down: false },
  "d": { right: false },
  " ": { space: false },
  "x": { autoshoot: false }
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
    const updated = Object.assign({}, activeControls, change);


    actionCallback(updated)
    activeControls = updated;
  }, [actionCallback])

  useEffect(() => {
    const keydown = (e: KeyboardEvent) => {
      var change = controlsDown[e.key.toLowerCase()] || {};
      updateAndSend(change);
    }
    const keyup = (e: KeyboardEvent) => {
      const change = controlsUp[e.key.toLowerCase()] || {};
      updateAndSend(change);
    }
    const mouseMove = (e: MouseEvent) => {
      try {
        //const worldCoordinates = props.viewport.toWorld(e.x,e.y);

        const X = window.innerWidth / 2;
        const Y = window.innerHeight / 2;

        //mouseActivity["position"] = {mouseX:worldCoordinates.x, mouseY:worldCoordinates.y};

        const change = { angle: -Math.atan2(X - e.x, Y - e.y) + Math.PI / 2 };

        updateAndSend(change);
      } catch {}
    }
    window.addEventListener("keydown", keydown)
    window.addEventListener("keyup", keyup)
    window.addEventListener("mousemove", mouseMove);

    const controlFocusCheck = setInterval(() => {
      if (!document.hasFocus()) {
        updateAndSend({
          up: false,
          down: false,
          left: false,
          right: false,
        });
      }
    }, 100);

    return () => {
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      window.removeEventListener("mousemove", mouseMove);
      clearInterval(controlFocusCheck);
    }
  }, [props.actionCallback, updateAndSend, props.viewport])
  return <>
    <div style={{
      position: 'fixed',
      width: '100vw',
      height: '100vh'
    }} onClick={() => {
      var change = controlsDown[' '] || {};
      updateAndSend(change);
    }} />
    <ReactNipple
      options={{ color: '#c60c30', mode: 'dynamic', position: { bottom: '50%', right: '50%' } }}
      style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh'
      }}
      onMove={(evt: any, data: any) => {
        if (data.direction) {
          if (data.direction.x == 'left') {
            updateAndSend({
              left: true,
              right: false,
            });
          } else {
            updateAndSend({
              left: false,
              right: true,
            });
          }

          if (data.direction.y == 'up') {
            updateAndSend({
              up: true,
              down: false,
            });
          } else {
            updateAndSend({
              up: false,
              down: true,
            });
          }
        }
      }} /></>
}
