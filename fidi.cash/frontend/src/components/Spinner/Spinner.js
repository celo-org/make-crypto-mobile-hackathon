import React from 'react';

import { ReactComponent as SpinnerSVG } from './spinner.svg';
import './Spinner.css';

export default function Spinner({ style }) {
  return (
    <div className="spinner-container">
      <SpinnerSVG style={{ width: '48px', ...style }} />
    </div>
  );
}
