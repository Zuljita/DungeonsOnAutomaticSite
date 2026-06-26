import * as React from 'react';

/**
 * The primary action control for the DOA workshop UI.
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` = ember (generate), `accent` = brass, plus iron variants. */
  variant?: 'primary' | 'accent' | 'secondary' | 'outline' | 'ghost';
  /** Control height. @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to fill the container width. */
  block?: boolean;
  /** Toggle/selected state — brass border + glow (e.g. an active map layer). */
  active?: boolean;
  /** Icon element rendered before the label. */
  leadingIcon?: React.ReactNode;
  /** Icon element rendered after the label. */
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
