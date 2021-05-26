import React, {useEffect, useCallback} from 'react';
import {IInputs} from './types';
import {Viewport} from 'pixi-viewport';
import { show_error_banner } from 'util/banner';

interface ControlProps {
    actionCallback: (p: IInputs) => void
    viewport: Viewport
}

const controlsDown: {[key: string]: object} = {
  "w": {up: true},
  "a": {left: true},
  "s": {down: true},
  "d": {right: true},
  " ": {space: true}
}

const mouseActivity: {[key: string]: object} = {
  "position": {x:0.0, y:0.0}
}

const controlsUp: {[key: string]: object} = {
  "w": {up: false},
  "a": {left: false},
  "s": {down: false},
  "d": {right: false},
  " ": {space: false}
}

let activeControls = {
  left: false,
  up: false,
  right: false,
  down: false,
  shoot: false,
  autoshoot: false,
  mouseX: 0.0,
  mouseY: 0.0,
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
      const change = controlsDown[e.key.toLowerCase()] || {};
      updateAndSend(change);
    }
    const keyup = (e: KeyboardEvent) => {
      const change = controlsUp[e.key.toLowerCase()] || {};
      updateAndSend(change);
    }
    const mouseMove = (e: MouseEvent) => {
      try {
        const worldCoordinates = props.viewport.toWorld(e.x,e.y);
        mouseActivity["position"] = {mouseX:worldCoordinates.x, mouseY:worldCoordinates.y};
        const change = mouseActivity["position"] || {};
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
  }, [props.actionCallback, updateAndSend])
  return <></>
}
