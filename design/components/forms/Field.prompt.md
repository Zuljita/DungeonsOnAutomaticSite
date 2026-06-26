Wraps any control with a label and optional hint/error. The composition unit for the generator control rail.

```jsx
<Field label="Party CER" htmlFor="cer" hint="25–5000">
  <TextInput id="cer" defaultValue="125" />
</Field>
<Field label="Seed" error="Must be hexadecimal"><TextInput invalid /></Field>
```
