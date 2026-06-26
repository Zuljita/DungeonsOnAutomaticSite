import React from 'react';

/**
 * StatPill — a labelled mono read-out (label + value) for headline
 * metrics: seed, CER, room count, peril level.
 */
export function StatPill({ label, value, plain = false, className = '', ...rest }) {
  const classes = ['doa-stat', plain ? 'doa-stat--plain' : '', className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      <span className="doa-stat__label">{label}</span>
      <span className="doa-stat__value">{value}</span>
    </span>
  );
}
