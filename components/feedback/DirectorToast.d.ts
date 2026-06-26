import * as React from 'react';

/**
 * The Stage Manager notification — a narrative director comments on a
 * generation event. Signature DOA component.
 */
export interface DirectorToastProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL to the director's portrait (Kovath/Zarlzazz/Vorga/Mizzik). */
  portrait?: string;
  /** Speaker name. */
  name?: React.ReactNode;
  /** Speaker role, e.g. "Encounter Director". */
  role?: React.ReactNode;
  /** Accent. `ember` for warnings/failures, `brass` otherwise. @default "brass" */
  tone?: 'brass' | 'ember';
  /** The line of dialogue. */
  children?: React.ReactNode;
}

export function DirectorToast(props: DirectorToastProps): JSX.Element;
