import React from 'react';

/** TextInput — single-line mono text/number input in the iron style. */
export function TextInput({ invalid = false, className = '', ...rest }) {
  const classes = ['doa-input', invalid ? 'doa-input--invalid' : '', className].filter(Boolean).join(' ');
  return <input className={classes} aria-invalid={invalid || undefined} {...rest} />;
}
