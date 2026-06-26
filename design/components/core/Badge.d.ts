import * as React from 'react';

/** Compact status / map-marker label. Tones mirror the map-key semantics. */
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** @default "neutral" */
  tone?: 'neutral' | 'encounter' | 'treasure' | 'hazard' | 'key' | 'door' | 'secret' | 'ok' | 'warn' | 'danger';
  /** Filled, high-emphasis treatment (supported for encounter/key). */
  solid?: boolean;
  /** Show a leading status dot. */
  dot?: boolean;
  children?: React.ReactNode;
}

export function Badge(props: BadgeProps): JSX.Element;
