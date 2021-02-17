import React, { CSSProperties, ReactNode } from 'react';

import './leaderboard.scss';

export function Leadboard(props: {
  style?: CSSProperties;
  children: ReactNode;
}): React.ReactElement {
  const {
    style,
    children,
  } = props;
  return <div style={style} className="container-box">{children}</div>
}
