import * as React from 'react';

/** A swatch + label row for the map Key panel. */
export interface LegendItemProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Swatch fill — usually a map-key token, e.g. "var(--key-encounter)". */
  color: string;
  /** Swatch shape, matching how the marker is drawn on the map. @default "square" */
  shape?: 'square' | 'dot' | 'diamond';
  label: React.ReactNode;
}

export function LegendItem(props: LegendItemProps): JSX.Element;
