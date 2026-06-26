Controlled numeric stepper for bounded counts (biomes, room limits). Clamps to `[min, max]`.

```jsx
const [n, setN] = React.useState(4);
<NumberStepper value={n} onChange={setN} min={2} max={8} />
```
