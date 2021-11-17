import React, { CSSProperties, ReactNode } from 'react';

import './box.module.css';

export function Box(props: {
  style?: CSSProperties;
  children: ReactNode;
}): React.ReactElement {
  const {
    style,
    children,
  } = props;
  return <div style={style} className="container-box">{children}</div>
}
