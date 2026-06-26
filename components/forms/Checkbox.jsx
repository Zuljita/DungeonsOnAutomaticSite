import React from 'react';

/** Checkbox — brass-fill check in the iron style. Controlled via `checked`. */
export function Checkbox({ checked = false, onChange, disabled = false, label, className = '', ...rest }) {
  const classes = ['doa-check', checked ? 'is-checked' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return (
    <label className={classes}>
      <input type="checkbox" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)} {...rest} />
      <span className="doa-check__box" aria-hidden="true">
        <svg viewBox="0 0 12 12" fill="none"><path d="M2 6.5L4.8 9.2L10 3.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
      {label ? <span className="doa-check__label">{label}</span> : null}
    </label>
  );
}
