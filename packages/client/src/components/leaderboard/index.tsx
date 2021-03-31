import { autoDetectRenderer } from 'pixi.js';
import React, { CSSProperties, ReactNode } from 'react';

import './leaderboard.scss';


const FOCUSED: CSSProperties = {
  border: 'solid #375a7f 2px',
  textAlign: 'center',
  margin: 'auto',
  width:'100%',
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
          Dave
        </td>
        <td>
          500
      </td>
      </tr>
    </table>
  </div>
}
