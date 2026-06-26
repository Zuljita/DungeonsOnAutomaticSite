/* Icon — React-safe Lucide. Renders inline SVG from lucide's icon data
   instead of mutating the DOM via createIcons(), which conflicts with
   React reconciliation on re-render. */
function Ic({ n, size = 18, strokeWidth = 2, style }) {
  const key = n.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, (c) => c.toUpperCase());
  const node = window.lucide && window.lucide.icons && window.lucide.icons[key];
  if (!node) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         style={{ display: 'block', ...style }} aria-hidden="true">
      {node.map((c, i) => React.createElement(c[0], { key: i, ...c[1] }))}
    </svg>
  );
}
window.Ic = Ic;
