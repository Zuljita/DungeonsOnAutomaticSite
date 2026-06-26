Square icon-only control for toolbars, the zoom cluster, and panel headers. Always give it an `aria-label`.

```jsx
<IconButton aria-label="Zoom in"><i data-lucide="plus" /></IconButton>
<IconButton variant="ghost" aria-label="Close"><i data-lucide="x" /></IconButton>
```

Sizes `sm | md | lg`. `ghost` variant drops the iron chrome for in-panel use.
