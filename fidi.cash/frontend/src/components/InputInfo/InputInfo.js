import React from 'react';

import './InputInfo.css';

export default function InputInfo({
  children,
  error,
  type = 'right',
  onClick
}) {
  const style = {
    color: error ? 'var(--error-color)' : null,
    cursor: onClick ? 'pointer' : null
  };
  return (
    <div className={`input-info input-info--${type}`}>
      <div className="input-info__text" style={style} onClick={onClick}>
        {children}
      </div>
    </div>
  );
}
