import * as React from 'react';

/** Label + control wrapper with optional required mark and hint/error line. */
export interface FieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: React.ReactNode;
  /** Append a brass required asterisk. */
  required?: boolean;
  /** Mono helper text below the control. */
  hint?: React.ReactNode;
  /** Error text — replaces hint and tints it red. */
  error?: React.ReactNode;
  /** `htmlFor` forwarded to the label. */
  htmlFor?: string;
  /** Lay label and control on one row (for checkboxes/switches). */
  row?: boolean;
  children?: React.ReactNode;
}

export function Field(props: FieldProps): JSX.Element;
