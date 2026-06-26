Ember-track toggle for a binary mode (Ink style, GM/Player view, grid on/off).

```jsx
const [gm, setGm] = React.useState(true);
<Switch checked={gm} onChange={setGm} label="GM view" />
```

Use `Switch` for instantaneous view modes; use `Checkbox` for form selections submitted later.
