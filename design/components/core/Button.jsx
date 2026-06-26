import React from 'react';

/**
 * Button — the primary action control for the DOA workshop UI.
 * Variants map to the brand: `primary` (ember) drives generation,
 * `accent` (brass) for emphasis, plus iron `secondary`, `outline`, `ghost`.
 */
export function Button({
  variant = 'secondary',
  size = 'md',
  block = false,
  active = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'doa-btn',
    `doa-btn--${variant}`,
    size !== 'md' ? `doa-btn--${size}` : '',
    block ? 'doa-btn--block' : '',
    active ? 'is-active' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} disabled={disabled} {...rest}>
      {leadingIcon ? <span className="doa-btn__icon">{leadingIcon}</span> : null}
      {children}
      {trailingIcon ? <span className="doa-btn__icon">{trailingIcon}</span> : null}
    </button>
  );
}
