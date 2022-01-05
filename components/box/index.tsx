import React, { CSSProperties, ReactNode } from 'react';

import styles from 'styles/box.module.css';

export function Box(props: {
  style?: CSSProperties;
  children: ReactNode;
}): React.ReactElement {
  const {
    style,
    children,
  } = props;
  return <div style={style} className={styles.boxContainer}>{children}</div>
}
