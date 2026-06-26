import React from 'react';

/** Select — native dropdown wrapped with a brass caret in the iron style. */
export function Select({ className = '', children, ...rest }) {
  return (
    <span className="doa-select-wrap">
      <select className={['doa-select', className].filter(Boolean).join(' ')} {...rest}>
        {children}
      </select>
    </span>
  );
}
