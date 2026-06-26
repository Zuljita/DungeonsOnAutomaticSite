import React from 'react';

/** LegendItem — a swatch + label row for the map Key panel. */
export function LegendItem({ color, shape = 'square', label, className = '', ...rest }) {
  const swClass = [
    'doa-legend__swatch',
    shape === 'dot' ? 'doa-legend__swatch--dot' : '',
    shape === 'diamond' ? 'doa-legend__swatch--diamond' : '',
  ].filter(Boolean).join(' ');
  return (
    <span className={['doa-legend', className].filter(Boolean).join(' ')} {...rest}>
      <span className={swClass} style={{ background: color }} />
      <span>{label}</span>
    </span>
  );
}
