import * as React from 'react';

/** Native select wrapped with a brass caret in the iron style. */
export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children?: React.ReactNode;
}

export function Select(props: SelectProps): JSX.Element;
