import React from 'react';

/**
 * Field — label + control wrapper with optional required mark and hint/error.
 * The standard way to compose a labelled input in the generator rail.
 */
export function Field({ label, required = false, hint, error, htmlFor, row = false, className = '', children, ...rest }) {
  const classes = ['doa-field', row ? 'doa-field--row' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} {...rest}>
      {label ? (
        <label className="doa-field__label" htmlFor={htmlFor}>
          {label}{required ? <span className="doa-field__req">*</span> : null}
        </label>
      ) : null}
      {children}
      {error ? <span className="doa-field__hint doa-field__hint--error">{error}</span>
        : hint ? <span className="doa-field__hint">{hint}</span> : null}
    </div>
  );
}
