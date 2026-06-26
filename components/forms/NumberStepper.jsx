import React from 'react';

/**
 * NumberStepper — controlled numeric input with − / + buttons, clamped
 * to [min, max]. For biome count, room limits, etc.
 */
export function NumberStepper({ value, onChange, min = -Infinity, max = Infinity, step = 1, disabled = false, className = '', ...rest }) {
  const clamp = (n) => Math.min(max, Math.max(min, n));
  const set = (n) => onChange && onChange(clamp(n));
  return (
    <div className={['doa-stepper', className].filter(Boolean).join(' ')} {...rest}>
      <button type="button" className="doa-stepper__btn" aria-label="Decrease"
        disabled={disabled || value <= min} onClick={() => set(value - step)}>−</button>
      <input className="doa-stepper__input" type="number" inputMode="numeric"
        value={value} min={min} max={max} step={step} disabled={disabled}
        onChange={(e) => set(Number(e.target.value))} />
      <button type="button" className="doa-stepper__btn" aria-label="Increase"
        disabled={disabled || value >= max} onClick={() => set(value + step)}>+</button>
    </div>
  );
}
