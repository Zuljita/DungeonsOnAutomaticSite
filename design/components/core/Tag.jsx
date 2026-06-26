import React from 'react';

/**
 * Tag — a generation/affinity tag rendered in the engine's bracketed
 * mono style, e.g. [military]. Optionally removable, or styled as a
 * weighted "bias" tag (brass).
 */
export function Tag({ bias = false, onRemove = null, className = '', children, ...rest }) {
  const classes = ['doa-tag', bias ? 'doa-tag--bias' : '', className].filter(Boolean).join(' ');
  return (
    <span className={classes} {...rest}>
      {children}
      {onRemove ? (
        <span className="doa-tag__x" role="button" aria-label="Remove tag" onClick={onRemove}>×</span>
      ) : null}
    </span>
  );
}
