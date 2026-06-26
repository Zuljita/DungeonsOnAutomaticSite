import * as React from 'react';

/** Brass-fill checkbox in the iron style. Controlled. */
export interface CheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Inline label to the right of the box. */
  label?: React.ReactNode;
  className?: string;
}

export function Checkbox(props: CheckboxProps): JSX.Element;
