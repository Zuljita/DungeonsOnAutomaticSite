The framed container for every workspace region. Header is optional — omit all of eyebrow/title/actions for a plain framed card.

```jsx
<Panel eyebrow="Dungeon" title="Rooms & Contents" actions={<IconButton aria-label="Collapse"><i data-lucide="chevron-up"/></IconButton>}>
  …list…
</Panel>
```

Use `flush` to drop body padding when embedding a scroll list or canvas.
