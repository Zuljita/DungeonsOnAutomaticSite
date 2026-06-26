import * as React from 'react';

/** A labelled mono read-out for headline metrics (seed, CER, room count). */
export interface StatPillProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Uppercase micro-label. */
  label: React.ReactNode;
  /** The value — brass by default. */
  value: React.ReactNode;
  /** Render the value in plain strong text instead of brass. */
  plain?: boolean;
}

export function StatPill(props: StatPillProps): JSX.Element;
