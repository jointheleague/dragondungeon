import React from 'react';
import './button.scss';

interface IProps {
  onClick?: () => void
  text: string
  disabled?: boolean;
  dataClipboardText?: string;
};

export const Button = (props: IProps) => {
  return (<button
    style={{ fontSize: '20px' }}
    className="button"
    disabled={props.disabled}
    data-clipboard-text={props.dataClipboardText}
    onClick={props.onClick}>
    {props.text}
  </button>)
}
