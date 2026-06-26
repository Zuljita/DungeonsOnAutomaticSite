import React from 'react';

/** Switch — ember-track toggle for binary view/mode state. Controlled. */
export function Switch({ checked = false, onChange, disabled = false, label, className = '', ...rest }) {
  const classes = ['doa-switch', checked ? 'is-on' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return (
    <label className={classes}>
      <input type="checkbox" role="switch" checked={checked} disabled={disabled}
        onChange={(e) => onChange && onChange(e.target.checked)} {...rest} />
      <span className="doa-switch__track" aria-hidden="true"><span className="doa-switch__thumb" /></span>
      {label ? <span className="doa-switch__label">{label}</span> : null}
    </label>
  );
}
