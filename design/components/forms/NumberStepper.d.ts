import * as React from 'react';

/** Controlled numeric input with − / + buttons, clamped to [min, max]. */
export interface NumberStepperProps {
  value: number;
  onChange?: (next: number) => void;
  min?: number;
  max?: number;
  /** @default 1 */
  step?: number;
  disabled?: boolean;
  className?: string;
}

export function NumberStepper(props: NumberStepperProps): JSX.Element;
