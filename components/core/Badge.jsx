import React from 'react';

/**
 * Badge — a compact status/marker label. Tones map to the map-key
 * semantics (encounter/treasure/hazard/key/door/secret) plus generic
 * status tones. Use `solid` for high-emphasis markers.
 */
export function Badge({ tone = 'neutral', solid = false, dot = false, className = '', children, ...rest }) {
  const classes = [
    'doa-badge',
    `doa-badge--${tone}`,
    solid ? 'doa-badge--solid' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {dot ? <span className="doa-badge__dot" /> : null}
      {children}
    </span>
  );
}
