import React from 'react';

/**
 * DirectorToast — the Stage Manager notification. One of the four
 * narrative directors (Kovath, Zarlzazz, Vorga, Mizzik) comments on
 * what just happened during generation. Portrait + name + role + line.
 *
 * Pass `portrait` as a URL to the director's image (copy the portrait
 * asset into your project). `tone="ember"` for warnings/failures.
 */
export function DirectorToast({ portrait, name, role, tone = 'brass', className = '', children, ...rest }) {
  const classes = ['doa-toast', tone === 'ember' ? 'doa-toast--ember' : '', className].filter(Boolean).join(' ');
  return (
    <div className={classes} role="status" {...rest}>
      {portrait ? <img className="doa-toast__portrait" src={portrait} alt={name || 'Director'} /> : <div className="doa-toast__portrait" />}
      <div className="doa-toast__body">
        <div className="doa-toast__speaker">
          {name ? <span className="doa-toast__name">{name}</span> : null}
          {role ? <span className="doa-toast__role">{role}</span> : null}
        </div>
        <div className="doa-toast__line">{children}</div>
      </div>
    </div>
  );
}
