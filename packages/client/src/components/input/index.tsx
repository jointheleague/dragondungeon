import React, { CSSProperties, SyntheticEvent } from 'react';

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
};

export function Input(props: {
  ariaLabel: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  style?: CSSProperties;
  onChange?: (event: SyntheticEvent) => void;
}): React.ReactElement {
  const {
    value,
    placeholder,
    style,
    maxLength,
    onChange,
    ariaLabel
  } = props;
  const [{hovered, focused}, setState] = React.useState({hovered: false, focused: false});

  return (
    <input
      aria-label={ariaLabel}
      type="text"
      value={value}
      style={{
        ...INPUT,
        ...style,
        ...(focused && FOCUSED),
      }}
      onMouseEnter={() => setState({hovered: true, focused})}
      onMouseLeave={() => setState({hovered: false, focused})}
      onFocus={() => setState({focused: true, hovered})}
      onBlur={() => setState({focused: false, hovered})}
      maxLength={maxLength}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
}
