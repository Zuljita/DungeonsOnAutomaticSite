import * as React from 'react';

/** Ember-track toggle for binary view/mode state. Controlled. */
export interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: React.ReactNode;
  className?: string;
}

export function Switch(props: SwitchProps): JSX.Element;
