import React from 'react';

import { ReactComponent as IconClose } from './icon-close.svg';

import './InlineError.css';

export default function InlineError({ text, onDismiss }) {
  if (!text) return null;
  return (
    <div className="inline-error">
      {text}
      <button
        type="button"
        className="inline-error__close-button"
        onClick={onDismiss}
      >
        <IconClose className="inline-error__close-icon" />
      </button>
    </div>
  );
}
