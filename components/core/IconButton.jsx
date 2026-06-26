import React from 'react';

/**
 * IconButton — a square, icon-only control for toolbars and zoom clusters.
 * Pass an `aria-label` for accessibility.
 */
export function IconButton({
  size = 'md',
  variant = 'secondary',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const classes = [
    'doa-iconbtn',
    size !== 'md' ? `doa-iconbtn--${size}` : '',
    variant === 'ghost' ? 'doa-iconbtn--ghost' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <button className={classes} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
