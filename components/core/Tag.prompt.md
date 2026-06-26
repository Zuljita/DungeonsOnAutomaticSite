Renders a generation/affinity tag in the engine's bracketed mono style; brackets are drawn automatically, so pass just the word.

```jsx
<Tag>military</Tag>
<Tag bias>ancient:3</Tag>
<Tag onRemove={() => drop(t)}>guarded</Tag>
```

Use `bias` for weighted intent tags (brass). `onRemove` adds a removable ×. Don't include the `[ ]` — they're added by the component.
