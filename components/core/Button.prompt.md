Primary action control — use for any button in the DOA workshop UI; `primary` (ember) is reserved for generation/commit actions, one per view.

```jsx
<Button variant="primary" leadingIcon={<i data-lucide="dices" />}>Generate Map</Button>
<Button variant="secondary">Export JSON</Button>
<Button variant="outline" size="sm">Reroll Encounters</Button>
<Button variant="ghost" active>Show Biomes</Button>
```

Variants: `primary` (ember, generation), `accent` (brass), `secondary` (iron, default), `outline`, `ghost`. Sizes `sm | md | lg`. Use `active` for toggle buttons (map-layer toggles get a brass glow); `block` to fill width.
