import React, {FunctionComponent} from 'react';
import './centerer.module.css';

interface IProps {};

export const Center: FunctionComponent<IProps> = ({children}) => {
  return <div className="centerer">
    {children}
  </div>
}
