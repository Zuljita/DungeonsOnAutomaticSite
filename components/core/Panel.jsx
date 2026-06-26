import React from 'react';

/**
 * Panel — the framed container that organizes the DOA workspace
 * (Key, Selection, Rooms & Contents, Stage Manager log, etc.).
 * Optional eyebrow + title header with a slot for actions.
 */
export function Panel({ eyebrow, title, actions, flush = false, className = '', children, ...rest }) {
  const classes = ['doa-panel', flush ? 'doa-panel--flush' : '', className].filter(Boolean).join(' ');
  const hasHead = eyebrow || title || actions;
  return (
    <section className={classes} {...rest}>
      {hasHead ? (
        <header className="doa-panel__head">
          <div className="doa-panel__titles">
            {eyebrow ? <span className="doa-panel__eyebrow">{eyebrow}</span> : null}
            {title ? <h2 className="doa-panel__title">{title}</h2> : null}
          </div>
          {actions ? <div className="doa-panel__actions">{actions}</div> : null}
        </header>
      ) : null}
      <div className="doa-panel__body">{children}</div>
    </section>
  );
}
