import * as React from 'react';

/** A square, icon-only control for toolbars, zoom clusters and panel headers. */
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** @default "secondary" */
  variant?: 'secondary' | 'ghost';
  /** The icon element (Lucide glyph, SVG, or unicode). */
  children?: React.ReactNode;
}

export function IconButton(props: IconButtonProps): JSX.Element;
