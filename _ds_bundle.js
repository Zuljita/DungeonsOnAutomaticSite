/* @ds-bundle: {"format":3,"namespace":"DungeonsOnAutomaticDesignSystem_e301a1","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Panel","sourcePath":"components/core/Panel.jsx"},{"name":"StatPill","sourcePath":"components/core/StatPill.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"DirectorToast","sourcePath":"components/feedback/DirectorToast.jsx"},{"name":"LegendItem","sourcePath":"components/feedback/LegendItem.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"NumberStepper","sourcePath":"components/forms/NumberStepper.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextInput","sourcePath":"components/forms/TextInput.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"3e19285f5bfe","components/core/Button.jsx":"3fad4876258c","components/core/IconButton.jsx":"03f55b7f7e45","components/core/Panel.jsx":"8e36e61a3432","components/core/StatPill.jsx":"322cd5370148","components/core/Tag.jsx":"494ee3f8c4a4","components/feedback/DirectorToast.jsx":"313b1b26e592","components/feedback/LegendItem.jsx":"d1b898667d67","components/forms/Checkbox.jsx":"e69889a29a00","components/forms/Field.jsx":"7999b130efde","components/forms/NumberStepper.jsx":"a035846ffcfd","components/forms/Select.jsx":"237ccf2d6cee","components/forms/Switch.jsx":"612ed1a28b0a","components/forms/TextInput.jsx":"ed30dec3b599","ui_kits/generator/App.jsx":"2026855db118","ui_kits/generator/AppBar.jsx":"609505bd85d5","ui_kits/generator/ControlRail.jsx":"097cda52bcf0","ui_kits/generator/Icon.jsx":"2960cda60f07","ui_kits/generator/InfoPanels.jsx":"b337073e1f5b","ui_kits/generator/MapCanvas.jsx":"d358dbc152b5","ui_kits/generator/StageManager.jsx":"eb5aea02f37f","ui_kits/generator/mapData.js":"3a68e5ddff88"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DungeonsOnAutomaticDesignSystem_e301a1 = window.DungeonsOnAutomaticDesignSystem_e301a1 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — a compact status/marker label. Tones map to the map-key
 * semantics (encounter/treasure/hazard/key/door/secret) plus generic
 * status tones. Use `solid` for high-emphasis markers.
 */
function Badge({
  tone = 'neutral',
  solid = false,
  dot = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-badge', `doa-badge--${tone}`, solid ? 'doa-badge--solid' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), dot ? /*#__PURE__*/React.createElement("span", {
    className: "doa-badge__dot"
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary action control for the DOA workshop UI.
 * Variants map to the brand: `primary` (ember) drives generation,
 * `accent` (brass) for emphasis, plus iron `secondary`, `outline`, `ghost`.
 */
function Button({
  variant = 'secondary',
  size = 'md',
  block = false,
  active = false,
  disabled = false,
  leadingIcon = null,
  trailingIcon = null,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-btn', `doa-btn--${variant}`, size !== 'md' ? `doa-btn--${size}` : '', block ? 'doa-btn--block' : '', active ? 'is-active' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: classes,
    disabled: disabled
  }, rest), leadingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "doa-btn__icon"
  }, leadingIcon) : null, children, trailingIcon ? /*#__PURE__*/React.createElement("span", {
    className: "doa-btn__icon"
  }, trailingIcon) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * IconButton — a square, icon-only control for toolbars and zoom clusters.
 * Pass an `aria-label` for accessibility.
 */
function IconButton({
  size = 'md',
  variant = 'secondary',
  disabled = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-iconbtn', size !== 'md' ? `doa-iconbtn--${size}` : '', variant === 'ghost' ? 'doa-iconbtn--ghost' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    className: classes,
    disabled: disabled
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Panel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Panel — the framed container that organizes the DOA workspace
 * (Key, Selection, Rooms & Contents, Stage Manager log, etc.).
 * Optional eyebrow + title header with a slot for actions.
 */
function Panel({
  eyebrow,
  title,
  actions,
  flush = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-panel', flush ? 'doa-panel--flush' : '', className].filter(Boolean).join(' ');
  const hasHead = eyebrow || title || actions;
  return /*#__PURE__*/React.createElement("section", _extends({
    className: classes
  }, rest), hasHead ? /*#__PURE__*/React.createElement("header", {
    className: "doa-panel__head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doa-panel__titles"
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    className: "doa-panel__eyebrow"
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    className: "doa-panel__title"
  }, title) : null), actions ? /*#__PURE__*/React.createElement("div", {
    className: "doa-panel__actions"
  }, actions) : null) : null, /*#__PURE__*/React.createElement("div", {
    className: "doa-panel__body"
  }, children));
}
Object.assign(__ds_scope, { Panel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Panel.jsx", error: String((e && e.message) || e) }); }

// components/core/StatPill.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatPill — a labelled mono read-out (label + value) for headline
 * metrics: seed, CER, room count, peril level.
 */
function StatPill({
  label,
  value,
  plain = false,
  className = '',
  ...rest
}) {
  const classes = ['doa-stat', plain ? 'doa-stat--plain' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: "doa-stat__label"
  }, label), /*#__PURE__*/React.createElement("span", {
    className: "doa-stat__value"
  }, value));
}
Object.assign(__ds_scope, { StatPill });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/StatPill.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — a generation/affinity tag rendered in the engine's bracketed
 * mono style, e.g. [military]. Optionally removable, or styled as a
 * weighted "bias" tag (brass).
 */
function Tag({
  bias = false,
  onRemove = null,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-tag', bias ? 'doa-tag--bias' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: classes
  }, rest), children, onRemove ? /*#__PURE__*/React.createElement("span", {
    className: "doa-tag__x",
    role: "button",
    "aria-label": "Remove tag",
    onClick: onRemove
  }, "\xD7") : null);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/DirectorToast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * DirectorToast — the Stage Manager notification. One of the four
 * narrative directors (Kovath, Zarlzazz, Vorga, Mizzik) comments on
 * what just happened during generation. Portrait + name + role + line.
 *
 * Pass `portrait` as a URL to the director's image (copy the portrait
 * asset into your project). `tone="ember"` for warnings/failures.
 */
function DirectorToast({
  portrait,
  name,
  role,
  tone = 'brass',
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-toast', tone === 'ember' ? 'doa-toast--ember' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes,
    role: "status"
  }, rest), portrait ? /*#__PURE__*/React.createElement("img", {
    className: "doa-toast__portrait",
    src: portrait,
    alt: name || 'Director'
  }) : /*#__PURE__*/React.createElement("div", {
    className: "doa-toast__portrait"
  }), /*#__PURE__*/React.createElement("div", {
    className: "doa-toast__body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "doa-toast__speaker"
  }, name ? /*#__PURE__*/React.createElement("span", {
    className: "doa-toast__name"
  }, name) : null, role ? /*#__PURE__*/React.createElement("span", {
    className: "doa-toast__role"
  }, role) : null), /*#__PURE__*/React.createElement("div", {
    className: "doa-toast__line"
  }, children)));
}
Object.assign(__ds_scope, { DirectorToast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/DirectorToast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/LegendItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** LegendItem — a swatch + label row for the map Key panel. */
function LegendItem({
  color,
  shape = 'square',
  label,
  className = '',
  ...rest
}) {
  const swClass = ['doa-legend__swatch', shape === 'dot' ? 'doa-legend__swatch--dot' : '', shape === 'diamond' ? 'doa-legend__swatch--diamond' : ''].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['doa-legend', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("span", {
    className: swClass,
    style: {
      background: color
    }
  }), /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { LegendItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/LegendItem.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox — brass-fill check in the iron style. Controlled via `checked`. */
function Checkbox({
  checked = false,
  onChange,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  const classes = ['doa-check', checked ? 'is-checked' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: classes
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "doa-check__box",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 6.5L4.8 9.2L10 3.2",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }))), label ? /*#__PURE__*/React.createElement("span", {
    className: "doa-check__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Field — label + control wrapper with optional required mark and hint/error.
 * The standard way to compose a labelled input in the generator rail.
 */
function Field({
  label,
  required = false,
  hint,
  error,
  htmlFor,
  row = false,
  className = '',
  children,
  ...rest
}) {
  const classes = ['doa-field', row ? 'doa-field--row' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: classes
  }, rest), label ? /*#__PURE__*/React.createElement("label", {
    className: "doa-field__label",
    htmlFor: htmlFor
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    className: "doa-field__req"
  }, "*") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    className: "doa-field__hint doa-field__hint--error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "doa-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/NumberStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * NumberStepper — controlled numeric input with − / + buttons, clamped
 * to [min, max]. For biome count, room limits, etc.
 */
function NumberStepper({
  value,
  onChange,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  className = '',
  ...rest
}) {
  const clamp = n => Math.min(max, Math.max(min, n));
  const set = n => onChange && onChange(clamp(n));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['doa-stepper', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "doa-stepper__btn",
    "aria-label": "Decrease",
    disabled: disabled || value <= min,
    onClick: () => set(value - step)
  }, "\u2212"), /*#__PURE__*/React.createElement("input", {
    className: "doa-stepper__input",
    type: "number",
    inputMode: "numeric",
    value: value,
    min: min,
    max: max,
    step: step,
    disabled: disabled,
    onChange: e => set(Number(e.target.value))
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "doa-stepper__btn",
    "aria-label": "Increase",
    disabled: disabled || value >= max,
    onClick: () => set(value + step)
  }, "+"));
}
Object.assign(__ds_scope, { NumberStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/NumberStepper.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Select — native dropdown wrapped with a brass caret in the iron style. */
function Select({
  className = '',
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: "doa-select-wrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: ['doa-select', className].filter(Boolean).join(' ')
  }, rest), children));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Switch — ember-track toggle for binary view/mode state. Controlled. */
function Switch({
  checked = false,
  onChange,
  disabled = false,
  label,
  className = '',
  ...rest
}) {
  const classes = ['doa-switch', checked ? 'is-on' : '', disabled ? 'is-disabled' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("label", {
    className: classes
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch",
    checked: checked,
    disabled: disabled,
    onChange: e => onChange && onChange(e.target.checked)
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "doa-switch__track",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "doa-switch__thumb"
  })), label ? /*#__PURE__*/React.createElement("span", {
    className: "doa-switch__label"
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/TextInput.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** TextInput — single-line mono text/number input in the iron style. */
function TextInput({
  invalid = false,
  className = '',
  ...rest
}) {
  const classes = ['doa-input', invalid ? 'doa-input--invalid' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("input", _extends({
    className: classes,
    "aria-invalid": invalid || undefined
  }, rest));
}
Object.assign(__ds_scope, { TextInput });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/TextInput.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/App.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* App — composes the DOA generator workspace and holds interaction state. */
function App() {
  const M = window.DOA_MAP;
  const [seed, setSeed] = React.useState('8F1A-7C2D');
  const [params, setParams] = React.useState({
    size: 'standard',
    biomes: 4,
    rooms: 'scattered',
    roomSize: 'medium',
    corridors: 'organized',
    deadEnds: 'most',
    cer: 125,
    challenge: 'average',
    doors: 'standard',
    treasure: 'onehundred'
  });
  const [books, setBooks] = React.useState([{
    id: 'exploits',
    name: 'DF: Exploits',
    count: 212,
    on: true
  }, {
    id: 'monsters',
    name: 'DF: Monsters',
    count: 340,
    on: true
  }, {
    id: 'companion3',
    name: 'DF: Companion 3',
    count: 96,
    on: true
  }, {
    id: 'dungeons',
    name: 'DF: Dungeons',
    count: 154,
    on: true
  }, {
    id: 'sorcery',
    name: 'DFRPG: Sorcery',
    count: 78,
    on: false
  }]);
  const [view, setView] = React.useState({
    inkStyle: true,
    showGrid: true,
    showBiomes: false
  });
  const [selected, setSelected] = React.useState('R8');
  const [busy, setBusy] = React.useState(false);
  const [toasts, setToasts] = React.useState([{
    key: 0,
    dir: 'Kovath',
    tone: 'brass',
    line: 'Workshop ready. Twelve rooms on the slab. Try not to make them livable.'
  }]);
  const timers = React.useRef([]);
  const setParam = (k, v) => setParams(p => ({
    ...p,
    [k]: v
  }));
  const toggleBook = id => setBooks(bs => bs.map(b => b.id === id ? {
    ...b,
    on: !b.on
  } : b));
  const setV = (k, v) => setView(s => ({
    ...s,
    [k]: v
  }));
  const newSeed = () => {
    const hex = () => Math.floor(Math.random() * 65536).toString(16).toUpperCase().padStart(4, '0');
    setSeed(hex() + '-' + hex());
  };
  const generate = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setBusy(true);
    setToasts([]);
    window.DOA_LINES.forEach((l, i) => {
      const t = setTimeout(() => {
        setToasts(prev => [...prev.slice(-3), {
          ...l,
          key: Date.now() + i
        }]);
      }, 500 + i * 850);
      timers.current.push(t);
    });
    const done = setTimeout(() => setBusy(false), 500 + window.DOA_LINES.length * 850);
    timers.current.push(done);
  };
  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const selRoom = M.rooms.find(r => r.id === selected) || null;
  const peril = Math.max(...M.rooms.map(r => r.peril));
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-app"
  }, /*#__PURE__*/React.createElement(AppBar, {
    seed: seed,
    onSeed: setSeed,
    onGenerate: generate,
    onNewSeed: newSeed,
    busy: busy,
    rooms: M.rooms.length,
    peril: peril
  }), /*#__PURE__*/React.createElement("div", {
    className: "kit-body"
  }, /*#__PURE__*/React.createElement(ControlRail, {
    params: params,
    setParam: setParam,
    books: books,
    toggleBook: toggleBook
  }), /*#__PURE__*/React.createElement("main", {
    className: "kit-stagearea"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-maphead"
  }, /*#__PURE__*/React.createElement(MapToolbar, _extends({}, view, {
    set: setV
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-zoom"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-zoom__r"
  }, "100%"), /*#__PURE__*/React.createElement("div", {
    className: "kit-zoom__btns"
  }, /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom out"
  }, "\u2212"), /*#__PURE__*/React.createElement("button", {
    "aria-label": "Zoom in"
  }, "+"), /*#__PURE__*/React.createElement("button", {
    className: "kit-zoom__fit"
  }, "Fit")))), /*#__PURE__*/React.createElement("div", {
    className: 'kit-mapview' + (busy ? ' is-busy' : '')
  }, /*#__PURE__*/React.createElement(MapCanvas, {
    inkStyle: view.inkStyle,
    showGrid: view.showGrid,
    showBiomes: view.showBiomes,
    selected: selected,
    onSelect: setSelected
  }), busy && /*#__PURE__*/React.createElement("div", {
    className: "kit-mapview__veil"
  }, /*#__PURE__*/React.createElement("span", null, "Collapsing wave function\u2026")))), /*#__PURE__*/React.createElement("aside", {
    className: "kit-info"
  }, /*#__PURE__*/React.createElement(SelectionPanel, {
    room: selRoom
  }), /*#__PURE__*/React.createElement(KeyPanel, null), /*#__PURE__*/React.createElement(RoomList, {
    rooms: M.rooms,
    selected: selected,
    onSelect: setSelected
  }))), /*#__PURE__*/React.createElement(StageManager, {
    toasts: toasts
  }));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/AppBar.jsx
try { (() => {
/* AppBar — top chrome: brand lockup, seed, primary generate action,
   map-layer toggles, exports. */
function AppBar(props) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Button,
    IconButton,
    StatPill
  } = NS;
  const {
    seed,
    onSeed,
    onGenerate,
    onNewSeed,
    busy,
    rooms,
    peril
  } = props;
  const Ic = window.Ic;
  return /*#__PURE__*/React.createElement("header", {
    className: "kit-appbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/brand/doa_logo_transparent.svg",
    alt: "",
    className: "kit-brand__mark"
  }), /*#__PURE__*/React.createElement("div", {
    className: "kit-brand__wm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-brand__t"
  }, "Dungeons on Automatic"), /*#__PURE__*/React.createElement("span", {
    className: "kit-brand__s"
  }, "Procedural Dungeon Generator"))), /*#__PURE__*/React.createElement("div", {
    className: "kit-seed"
  }, /*#__PURE__*/React.createElement("label", {
    className: "kit-seed__lbl"
  }, "Seed"), /*#__PURE__*/React.createElement("input", {
    className: "doa-input kit-seed__input",
    value: seed,
    onChange: e => onSeed(e.target.value)
  }), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "New seed",
    onClick: onNewSeed
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "shuffle"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    leadingIcon: /*#__PURE__*/React.createElement(Ic, {
      n: "dices"
    }),
    onClick: onGenerate,
    disabled: busy
  }, busy ? 'Generating…' : 'Generate Map')), /*#__PURE__*/React.createElement("div", {
    className: "kit-appbar__stats"
  }, /*#__PURE__*/React.createElement(StatPill, {
    label: "Rooms",
    value: rooms
  }), /*#__PURE__*/React.createElement(StatPill, {
    label: "Peril",
    value: peril + ' / 10',
    plain: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-appbar__actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    leadingIcon: /*#__PURE__*/React.createElement(Ic, {
      n: "download"
    })
  }, "Export"), /*#__PURE__*/React.createElement(IconButton, {
    variant: "ghost",
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement(Ic, {
    n: "settings-2"
  }))));
}
window.AppBar = AppBar;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/AppBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/ControlRail.jsx
try { (() => {
/* ControlRail — the left generation-parameter rail, grouped into panels. */
function ControlRail(props) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Panel,
    Field,
    Select,
    NumberStepper,
    Checkbox
  } = NS;
  const {
    params,
    setParam,
    books,
    toggleBook
  } = props;
  const sel = (key, opts) => /*#__PURE__*/React.createElement(Field, {
    label: opts.label
  }, /*#__PURE__*/React.createElement(Select, {
    value: params[key],
    onChange: e => setParam(key, e.target.value)
  }, opts.items.map(([v, l]) => /*#__PURE__*/React.createElement("option", {
    key: v,
    value: v
  }, l))));
  return /*#__PURE__*/React.createElement("aside", {
    className: "kit-rail"
  }, /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Configure",
    title: "Layout"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-grid2"
  }, sel('size', {
    label: 'Size',
    items: [['compact', 'Compact'], ['standard', 'Standard'], ['large', 'Large']]
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Biomes"
  }, /*#__PURE__*/React.createElement(NumberStepper, {
    value: params.biomes,
    onChange: v => setParam('biomes', v),
    min: 2,
    max: 8
  })), sel('rooms', {
    label: 'Rooms',
    items: [['sparse', 'Sparse'], ['scattered', 'Scattered'], ['tight', 'Tight'], ['dense', 'Dense']]
  }), sel('roomSize', {
    label: 'Room size',
    items: [['small', 'Small'], ['medium', 'Medium'], ['large', 'Large'], ['huge', 'Huge']]
  }), sel('corridors', {
    label: 'Corridors',
    items: [['labyrinth', 'Labyrinthian'], ['wandering', 'Wandering'], ['organized', 'Organized'], ['straight', 'Straight']]
  }), sel('deadEnds', {
    label: 'Dead ends',
    items: [['none', 'None'], ['few', 'Few'], ['some', 'Some'], ['most', 'Most']]
  }))), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Configure",
    title: "Threat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-grid2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Party CER"
  }, /*#__PURE__*/React.createElement("input", {
    className: "doa-input",
    type: "number",
    value: params.cer,
    onChange: e => setParam('cer', e.target.value)
  })), sel('challenge', {
    label: 'Challenge',
    items: [['cakewalk', 'Cakewalk'], ['easy', 'Easy'], ['average', 'Average'], ['hard', 'Hard'], ['evil', 'Evil']]
  }), sel('doors', {
    label: 'Doors',
    items: [['none', 'None'], ['basic', 'Basic'], ['standard', 'Standard'], ['secure', 'Secure'], ['deathtrap', 'Deathtrap']]
  }), sel('treasure', {
    label: 'Generosity',
    items: [['fifty', '50%'], ['onehundred', '100%'], ['twohundred', '200%'], ['fourhundred', '400%']]
  }))), /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Filter",
    title: "Source Books",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "kit-rail__count"
    }, books.filter(b => b.on).length, "/", books.length)
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-books"
  }, books.map(b => /*#__PURE__*/React.createElement(Checkbox, {
    key: b.id,
    checked: b.on,
    onChange: () => toggleBook(b.id),
    label: /*#__PURE__*/React.createElement("span", null, b.name, " ", /*#__PURE__*/React.createElement("span", {
      className: "kit-books__c"
    }, b.count))
  })))));
}
window.ControlRail = ControlRail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/ControlRail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/Icon.jsx
try { (() => {
/* Icon — React-safe Lucide. Renders inline SVG from lucide's icon data
   instead of mutating the DOM via createIcons(), which conflicts with
   React reconciliation on re-render. */
function Ic({
  n,
  size = 18,
  strokeWidth = 2,
  style
}) {
  const key = n.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^[a-z]/, c => c.toUpperCase());
  const node = window.lucide && window.lucide.icons && window.lucide.icons[key];
  if (!node) return null;
  return /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: strokeWidth,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    style: {
      display: 'block',
      ...style
    },
    "aria-hidden": "true"
  }, node.map((c, i) => React.createElement(c[0], {
    key: i,
    ...c[1]
  })));
}
window.Ic = Ic;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/Icon.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/InfoPanels.jsx
try { (() => {
/* InfoPanels — the right column: map Key, current Selection, and the
   Rooms & Contents list. */
function MapToolbar({
  inkStyle,
  showGrid,
  showBiomes,
  set
}) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Switch
  } = NS;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-maptoolbar"
  }, /*#__PURE__*/React.createElement(Switch, {
    checked: inkStyle,
    onChange: v => set('inkStyle', v),
    label: "Ink style"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: showGrid,
    onChange: v => set('showGrid', v),
    label: "Grid"
  }), /*#__PURE__*/React.createElement(Switch, {
    checked: showBiomes,
    onChange: v => set('showBiomes', v),
    label: "Biomes"
  }));
}
window.MapToolbar = MapToolbar;
function KeyPanel() {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Panel,
    LegendItem
  } = NS;
  return /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Reference",
    title: "Key"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-legend"
  }, /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--key-encounter)",
    shape: "dot",
    label: "Monster encounter"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--key-treasure)",
    shape: "diamond",
    label: "Treasure"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--key-hazard-bg)",
    label: "Trap / hazard"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--key-key)",
    shape: "dot",
    label: "Quest key"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--doc-floor)",
    label: "Floor"
  }), /*#__PURE__*/React.createElement(LegendItem, {
    color: "var(--doc-wall)",
    label: "Hatched wall"
  })));
}
window.KeyPanel = KeyPanel;
function SelectionPanel({
  room
}) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Panel,
    Tag,
    Badge,
    Button,
    StatPill
  } = NS;
  const Ic = window.Ic;
  if (!room) {
    return /*#__PURE__*/React.createElement(Panel, {
      eyebrow: "Inspect",
      title: "Selection"
    }, /*#__PURE__*/React.createElement("p", {
      className: "kit-empty"
    }, "Select a room on the map to inspect its contents."));
  }
  return /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Inspect",
    title: "Selection",
    actions: /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral"
    }, room.type)
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-sel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-sel__name"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-sel__num"
  }, room.n), room.name), /*#__PURE__*/React.createElement("div", {
    className: "kit-sel__stats"
  }, /*#__PURE__*/React.createElement(StatPill, {
    label: "Area",
    value: room.area + ' ft²',
    plain: true
  }), /*#__PURE__*/React.createElement(StatPill, {
    label: "Peril",
    value: room.peril + '/10'
  }), /*#__PURE__*/React.createElement(StatPill, {
    label: "Biome",
    value: room.biome.replace('_', ' '),
    plain: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "kit-sel__tags"
  }, room.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "kit-sel__btns"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "outline",
    size: "sm",
    leadingIcon: /*#__PURE__*/React.createElement(Ic, {
      n: "lock"
    })
  }, "Lock room"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    leadingIcon: /*#__PURE__*/React.createElement(Ic, {
      n: "rotate-cw"
    })
  }, "Reroll"))));
}
window.SelectionPanel = SelectionPanel;
function RoomList({
  rooms,
  selected,
  onSelect
}) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    Panel,
    Badge
  } = NS;
  const toneFor = r => r.tags.includes('treasure') ? 'treasure' : r.peril >= 8 ? 'danger' : r.tags.includes('sacred') ? 'secret' : 'neutral';
  return /*#__PURE__*/React.createElement(Panel, {
    eyebrow: "Dungeon",
    title: "Rooms & Contents",
    flush: true
  }, /*#__PURE__*/React.createElement("div", {
    className: "kit-roomlist"
  }, rooms.map(r => /*#__PURE__*/React.createElement("button", {
    key: r.id,
    className: 'kit-room' + (selected === r.id ? ' is-sel' : ''),
    onClick: () => onSelect(r.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "kit-room__num"
  }, r.n), /*#__PURE__*/React.createElement("span", {
    className: "kit-room__name"
  }, r.name), /*#__PURE__*/React.createElement(Badge, {
    tone: toneFor(r)
  }, r.peril)))));
}
window.RoomList = RoomList;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/InfoPanels.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/MapCanvas.jsx
try { (() => {
/* MapCanvas — the parchment GM map. Schematic SVG recreation of the
   engine's rendered dungeon (rooms, corridors, doors, markers).
   NOTE: SVG presentation attributes can't resolve CSS var() — token
   values are inlined here as the literal hex from /tokens/colors.css. */
const INK = '#1b1b1b',
  INK_LINE = '#3a3326',
  FLOOR = '#fff7df',
  WALL = '#eadbb7';
const EMBER = '#d30000',
  BRASS = '#ffd800';
const KEY = {
  encounter: '#dc2626',
  treasure: '#c79a16',
  hazard: '#facc15',
  hazardBg: '#111827',
  key: '#e07a00',
  secret: '#7e22ce'
};
const BIOME_TINT = {
  worked_stone: '#f3e7c8',
  flooded: '#dfe8e6',
  bone_deep: '#efe6cf',
  fungal: '#e2e8cf'
};
const MONO = "'IBM Plex Mono', ui-monospace, monospace";
function MapCanvas({
  inkStyle = true,
  showGrid = true,
  showBiomes = false,
  selected,
  onSelect
}) {
  const M = window.DOA_MAP;
  const CELL = 17;
  const W = M.cols * CELL,
    H = M.rows * CELL;
  const px = n => n * CELL;
  return /*#__PURE__*/React.createElement("div", {
    className: "doa-map",
    style: {
      width: '100%',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    width: "100%",
    height: "100%",
    preserveAspectRatio: "xMidYMid meet",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("pattern", {
    id: "hatch",
    width: "6",
    height: "6",
    patternUnits: "userSpaceOnUse",
    patternTransform: "rotate(45)"
  }, /*#__PURE__*/React.createElement("rect", {
    width: "6",
    height: "6",
    fill: WALL
  }), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "6",
    stroke: INK_LINE,
    strokeWidth: "1.1",
    opacity: "0.5"
  })), /*#__PURE__*/React.createElement("radialGradient", {
    id: "encGlow"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#fff7ed"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#fff7ed",
    stopOpacity: "0"
  }))), /*#__PURE__*/React.createElement("rect", {
    x: "0",
    y: "0",
    width: W,
    height: H,
    fill: "url(#hatch)"
  }), M.corridors.map((c, i) => /*#__PURE__*/React.createElement("rect", {
    key: 'c' + i,
    x: px(c.x),
    y: px(c.y),
    width: px(c.w),
    height: px(c.h),
    fill: FLOOR,
    stroke: INK,
    strokeWidth: "1.5"
  })), M.rooms.map(r => {
    const isSel = selected === r.id;
    const fill = showBiomes ? BIOME_TINT[r.biome] || FLOOR : FLOOR;
    return /*#__PURE__*/React.createElement("g", {
      key: r.id,
      onClick: () => onSelect && onSelect(r.id),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("rect", {
      x: px(r.x),
      y: px(r.y),
      width: px(r.w),
      height: px(r.h),
      fill: fill,
      stroke: isSel ? EMBER : INK,
      strokeWidth: isSel ? 3 : 1.8
    }), isSel && /*#__PURE__*/React.createElement("rect", {
      x: px(r.x) - 2,
      y: px(r.y) - 2,
      width: px(r.w) + 4,
      height: px(r.h) + 4,
      fill: "none",
      stroke: INK,
      strokeWidth: "1.3",
      strokeDasharray: "4 3",
      opacity: "0.85"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: px(r.x) + 11,
      cy: px(r.y) + 11,
      r: "9",
      fill: INK
    }), /*#__PURE__*/React.createElement("text", {
      x: px(r.x) + 11,
      y: px(r.y) + 14.5,
      textAnchor: "middle",
      fontFamily: MONO,
      fontSize: "11",
      fontWeight: "600",
      fill: FLOOR
    }, r.n));
  }), M.doors.map((d, i) => d.secret ? /*#__PURE__*/React.createElement("g", {
    key: 'd' + i
  }, /*#__PURE__*/React.createElement("rect", {
    x: px(d.x) + 4,
    y: px(d.y) + 4,
    width: "9",
    height: "9",
    fill: WALL,
    stroke: KEY.secret,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: px(d.x) + 8.5,
    y: px(d.y) + 11.5,
    textAnchor: "middle",
    fontFamily: MONO,
    fontSize: "8",
    fontWeight: "700",
    fill: KEY.secret
  }, "S")) : /*#__PURE__*/React.createElement("rect", {
    key: 'd' + i,
    x: px(d.x) + 3,
    y: px(d.y) + 5,
    width: "11",
    height: "7",
    rx: "1",
    fill: FLOOR,
    stroke: INK,
    strokeWidth: "1.5"
  })), M.markers.map((m, i) => {
    const cx = px(m.x) + CELL / 2,
      cy = px(m.y) + CELL / 2;
    if (m.kind === 'encounter') return /*#__PURE__*/React.createElement("g", {
      key: 'm' + i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "11",
      fill: "url(#encGlow)",
      opacity: "0.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: cx,
      cy: cy,
      r: "5.5",
      fill: KEY.encounter,
      stroke: "#fff7ed",
      strokeWidth: "1.5"
    }));
    if (m.kind === 'treasure') return /*#__PURE__*/React.createElement("rect", {
      key: 'm' + i,
      x: cx - 5.5,
      y: cy - 5.5,
      width: "11",
      height: "11",
      transform: `rotate(45 ${cx} ${cy})`,
      fill: KEY.treasure,
      stroke: INK,
      strokeWidth: "1.6"
    });
    if (m.kind === 'hazard') return /*#__PURE__*/React.createElement("rect", {
      key: 'm' + i,
      x: cx - 5.5,
      y: cy - 5.5,
      width: "11",
      height: "11",
      fill: KEY.hazardBg,
      stroke: KEY.hazard,
      strokeWidth: "1.6"
    });
    if (m.kind === 'key') return /*#__PURE__*/React.createElement("circle", {
      key: 'm' + i,
      cx: cx,
      cy: cy,
      r: "5",
      fill: KEY.key,
      stroke: INK,
      strokeWidth: "1.6"
    });
    return null;
  }), showGrid && /*#__PURE__*/React.createElement("g", {
    opacity: inkStyle ? 0.16 : 0.28
  }, Array.from({
    length: M.cols + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: 'gx' + i,
    x1: px(i),
    y1: "0",
    x2: px(i),
    y2: H,
    stroke: INK_LINE,
    strokeWidth: "0.5"
  })), Array.from({
    length: M.rows + 1
  }).map((_, i) => /*#__PURE__*/React.createElement("line", {
    key: 'gy' + i,
    x1: "0",
    y1: px(i),
    x2: W,
    y2: px(i),
    stroke: INK_LINE,
    strokeWidth: "0.5"
  })))));
}
window.MapCanvas = MapCanvas;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/MapCanvas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/StageManager.jsx
try { (() => {
/* StageManager — the bottom-right director toast stack. Each director
   comments, in character, on generation events. */
window.DOA_DIRECTORS = {
  Kovath: {
    name: 'KOVATH',
    role: 'Creative Director',
    portrait: '../../assets/portraits/Kovath.png'
  },
  Zarlzazz: {
    name: 'ZARLZAZZ',
    role: 'Narrative Director',
    portrait: '../../assets/portraits/Zarlzazz.png'
  },
  Vorga: {
    name: 'VORGA',
    role: 'Encounter Director',
    portrait: '../../assets/portraits/Vorga.png'
  },
  Mizzik: {
    name: 'MIZZIK',
    role: 'Furniture & Loot',
    portrait: '../../assets/portraits/Mizzik.png'
  }
};
window.DOA_LINES = [{
  dir: 'Zarlzazz',
  tone: 'brass',
  line: 'Twelve rooms partitioned. The gatehouse has already collapsed. On schedule.'
}, {
  dir: 'Vorga',
  tone: 'brass',
  line: 'Bone Deep gets the undead. The cistern gets something wetter. Approved.'
}, {
  dir: 'Mizzik',
  tone: 'brass',
  line: 'I weighed the Hoard against party CER 125. It is, regrettably, fair.'
}, {
  dir: 'Kovath',
  tone: 'ember',
  line: "Room 12 flagged: every path to the exit is a deathtrap. Another fine layout."
}];
function StageManager({
  toasts
}) {
  const NS = window.DungeonsOnAutomaticDesignSystem_e301a1;
  const {
    DirectorToast
  } = NS;
  return /*#__PURE__*/React.createElement("div", {
    className: "kit-stage"
  }, toasts.map(t => {
    const d = window.DOA_DIRECTORS[t.dir];
    return /*#__PURE__*/React.createElement(DirectorToast, {
      key: t.key,
      portrait: d.portrait,
      name: d.name,
      role: d.role,
      tone: t.tone
    }, t.line);
  }));
}
window.StageManager = StageManager;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/StageManager.jsx", error: String((e && e.message) || e) }); }

// ui_kits/generator/mapData.js
try { (() => {
/* Dungeons on Automatic — sample dungeon for the UI kit map view.
   Coordinates are in 1-cell units on a 46×30 grid. Rooms are floored
   rectangles; corridors are thin floored runs; markers sit on cells.
   This mirrors the engine's GM map output (rooms, corridors, doors,
   encounters, treasure, traps, keys) — drawn schematically, not generated. */
window.DOA_MAP = {
  cols: 46,
  rows: 30,
  rooms: [{
    id: 'R1',
    n: 1,
    x: 3,
    y: 3,
    w: 7,
    h: 5,
    name: 'Collapsed Gatehouse',
    type: 'Entry',
    biome: 'worked_stone',
    tags: ['ancient', 'guarded'],
    area: 350,
    peril: 2
  }, {
    id: 'R2',
    n: 2,
    x: 14,
    y: 2,
    w: 6,
    h: 4,
    name: 'Guard Barracks',
    type: 'Barracks',
    biome: 'worked_stone',
    tags: ['military', 'organized', 'sapient'],
    area: 240,
    peril: 5
  }, {
    id: 'R3',
    n: 3,
    x: 24,
    y: 3,
    w: 5,
    h: 5,
    name: 'Duty Roster Hall',
    type: 'Hall',
    biome: 'worked_stone',
    tags: ['military'],
    area: 250,
    peril: 3
  }, {
    id: 'R4',
    n: 4,
    x: 34,
    y: 2,
    w: 8,
    h: 6,
    name: 'Quartermaster Vault',
    type: 'Vault',
    biome: 'worked_stone',
    tags: ['guarded', 'treasure'],
    area: 480,
    peril: 6
  }, {
    id: 'R5',
    n: 5,
    x: 4,
    y: 12,
    w: 6,
    h: 6,
    name: 'Flooded Cistern',
    type: 'Cavern',
    biome: 'flooded',
    tags: ['wet', 'natural', 'dangerous'],
    area: 360,
    peril: 7
  }, {
    id: 'R6',
    n: 6,
    x: 14,
    y: 11,
    w: 7,
    h: 7,
    name: 'Mess of Bones',
    type: 'Cavern',
    biome: 'bone_deep',
    tags: ['undead', 'decayed'],
    area: 490,
    peril: 8
  }, {
    id: 'R7',
    n: 7,
    x: 25,
    y: 13,
    w: 5,
    h: 4,
    name: 'Trapped Antechamber',
    type: 'Chamber',
    biome: 'worked_stone',
    tags: ['trapped', 'guarded'],
    area: 200,
    peril: 6
  }, {
    id: 'R8',
    n: 8,
    x: 34,
    y: 12,
    w: 8,
    h: 7,
    name: 'The Hoard',
    type: 'Treasury',
    biome: 'worked_stone',
    tags: ['treasure', 'sealed', 'guarded'],
    area: 560,
    peril: 9
  }, {
    id: 'R9',
    n: 9,
    x: 6,
    y: 23,
    w: 6,
    h: 5,
    name: 'Mushroom Grove',
    type: 'Cavern',
    biome: 'fungal',
    tags: ['natural', 'wet'],
    area: 300,
    peril: 4
  }, {
    id: 'R10',
    n: 10,
    x: 16,
    y: 23,
    w: 5,
    h: 5,
    name: 'Silent Shrine',
    type: 'Shrine',
    biome: 'worked_stone',
    tags: ['sacred', 'sealed'],
    area: 250,
    peril: 3
  }, {
    id: 'R11',
    n: 11,
    x: 25,
    y: 22,
    w: 6,
    h: 6,
    name: 'Sunken Library',
    type: 'Library',
    biome: 'flooded',
    tags: ['arcane', 'wet', 'sealed'],
    area: 360,
    peril: 7
  }, {
    id: 'R12',
    n: 12,
    x: 35,
    y: 23,
    w: 7,
    h: 5,
    name: "Architect's Folly",
    type: 'Set piece',
    biome: 'worked_stone',
    tags: ['arcane', 'dangerous'],
    area: 350,
    peril: 10
  }],
  corridors: [{
    x: 10,
    y: 5,
    w: 4,
    h: 2
  }, {
    x: 20,
    y: 3,
    w: 4,
    h: 2
  }, {
    x: 29,
    y: 4,
    w: 5,
    h: 2
  }, {
    x: 6,
    y: 8,
    w: 2,
    h: 4
  }, {
    x: 16,
    y: 6,
    w: 2,
    h: 5
  }, {
    x: 27,
    y: 8,
    w: 2,
    h: 5
  }, {
    x: 37,
    y: 8,
    w: 2,
    h: 4
  }, {
    x: 10,
    y: 14,
    w: 4,
    h: 2
  }, {
    x: 21,
    y: 14,
    w: 4,
    h: 2
  }, {
    x: 30,
    y: 14,
    w: 4,
    h: 2
  }, {
    x: 8,
    y: 18,
    w: 2,
    h: 5
  }, {
    x: 18,
    y: 18,
    w: 2,
    h: 5
  }, {
    x: 27,
    y: 17,
    w: 2,
    h: 5
  }, {
    x: 38,
    y: 19,
    w: 2,
    h: 4
  }, {
    x: 12,
    y: 25,
    w: 4,
    h: 2
  }, {
    x: 21,
    y: 25,
    w: 4,
    h: 2
  }, {
    x: 31,
    y: 25,
    w: 4,
    h: 2
  }],
  doors: [{
    x: 10,
    y: 5
  }, {
    x: 13,
    y: 5
  }, {
    x: 20,
    y: 3
  }, {
    x: 23,
    y: 4
  }, {
    x: 29,
    y: 5
  }, {
    x: 16,
    y: 10
  }, {
    x: 27,
    y: 12
  }, {
    x: 37,
    y: 11
  }, {
    x: 6,
    y: 17
  }, {
    x: 18,
    y: 22
  }, {
    x: 27,
    y: 21
  }, {
    x: 38,
    y: 22
  }, {
    x: 33,
    y: 14,
    secret: true
  }, {
    x: 24,
    y: 14,
    secret: true
  }],
  markers: [{
    kind: 'encounter',
    x: 16,
    y: 13,
    room: 'R2'
  }, {
    kind: 'encounter',
    x: 17,
    y: 14,
    room: 'R6'
  }, {
    kind: 'encounter',
    x: 7,
    y: 14,
    room: 'R5'
  }, {
    kind: 'encounter',
    x: 37,
    y: 15,
    room: 'R8'
  }, {
    kind: 'encounter',
    x: 38,
    y: 25,
    room: 'R12'
  }, {
    kind: 'treasure',
    x: 37,
    y: 4,
    room: 'R4'
  }, {
    kind: 'treasure',
    x: 39,
    y: 15,
    room: 'R8'
  }, {
    kind: 'treasure',
    x: 28,
    y: 24,
    room: 'R11'
  }, {
    kind: 'hazard',
    x: 26,
    y: 14,
    room: 'R7'
  }, {
    kind: 'hazard',
    x: 36,
    y: 25,
    room: 'R12'
  }, {
    kind: 'key',
    x: 18,
    y: 25,
    room: 'R10'
  }, {
    kind: 'key',
    x: 36,
    y: 13,
    room: 'R8'
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/generator/mapData.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Panel = __ds_scope.Panel;

__ds_ns.StatPill = __ds_scope.StatPill;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.DirectorToast = __ds_scope.DirectorToast;

__ds_ns.LegendItem = __ds_scope.LegendItem;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.NumberStepper = __ds_scope.NumberStepper;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.TextInput = __ds_scope.TextInput;

})();
