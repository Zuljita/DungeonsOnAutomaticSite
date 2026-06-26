import * as React from 'react';

/**
 * Framed container that organizes the workspace panels (Key, Selection,
 * Rooms & Contents, Stage Manager log).
 */
export interface PanelProps extends React.HTMLAttributes<HTMLElement> {
  /** Small-caps brass overline above the title. */
  eyebrow?: React.ReactNode;
  /** Cinzel panel title. */
  title?: React.ReactNode;
  /** Right-aligned header slot (buttons, toggles). */
  actions?: React.ReactNode;
  /** Remove body padding (for full-bleed lists / canvases). */
  flush?: boolean;
  children?: React.ReactNode;
}

export function Panel(props: PanelProps): JSX.Element;
