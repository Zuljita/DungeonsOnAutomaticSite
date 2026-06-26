Controlled checkbox with an inline label; brass fill when checked.

```jsx
const [on, setOn] = React.useState(true);
<Checkbox checked={on} onChange={setOn} label="Preserve edits" />
```

For source-book lists, render one per row.
