import { autoDetectRenderer } from 'pixi.js';
import React, { CSSProperties, ReactNode } from 'react';

import './leaderboard.scss';
const INPUT: CSSProperties = {
  fontSize: 16,
  borderRadius: 8,
  height: 48,
  paddingLeft: 8,
  paddingRight: 8,
  outline: 'none',
  border: '2px solid #efefef',
  boxSizing: 'border-box',
  width: '100%',
  maxWidth: '100%',
};

const FOCUSED: CSSProperties = {
  border: 'solid #375a7f 2px',
  textAlign: 'center',
  margin: 'auto'
};

export function Leadboard(props: {
  style?: CSSProperties;
  children: ReactNode;
}): React.ReactElement {
  const {
    style,
    children,
  } = props;
  return <div style={style} className="container-box">{children}
    <table style={FOCUSED}>
      <tr style={FOCUSED}>
        <th >
          name
        </th>
        <th >
          coins
        </th>
      </tr>
      <tr style={FOCUSED}>
        <td>
          Dave the Dragon
        </td>
        <td>
          500
      </td>
      </tr>
    </table>
  </div>
}
