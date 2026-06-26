import * as React from 'react';

/** A generation/affinity tag in the engine's bracketed mono style — `[military]`. */
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Weighted intent/bias tag — rendered in brass instead of door-cyan. */
  bias?: boolean;
  /** When provided, renders a removable × affordance. */
  onRemove?: (e: React.MouseEvent) => void;
  children?: React.ReactNode;
}

export function Tag(props: TagProps): JSX.Element;
