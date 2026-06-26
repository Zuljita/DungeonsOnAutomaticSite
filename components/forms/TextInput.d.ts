import * as React from 'react';

/** Single-line mono text/number input in the iron style. */
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Red border + focus ring for validation errors. */
  invalid?: boolean;
}

export function TextInput(props: TextInputProps): JSX.Element;
