/* Optional red facing bar for hex tokens.
 *
 * The published art carries no facing mark: the bar is drawn here, on request,
 * so the default token stays clean. Geometry mirrors build-hex-token.py in the
 * monsters repo (style doa-flat-top-hex-v2) so the bar lands exactly on the
 * rendered hex, and the style id is checked before anything is drawn - a future
 * renderer gets no overlay rather than a misaligned one.
 *
 * The audit in art/enraged-eggplant/facing-audit.json establishes that every
 * creature with a discernible front faces the top of its token, so the back is
 * always the bottom hexside and the bar is a constant.
 */
(function () {
  'use strict';

  var STYLE_ID = 'doa-flat-top-hex-v2';
  var TOKEN_SIZE = 1254; // every published hex token is square at this size
  var STORAGE_KEY = 'doa:hex-facing-bar';
  var SVG_NS = 'http://www.w3.org/2000/svg';

  // Ported from hex_points() in build-hex-token.py. Python's round() breaks ties
  // to even and JavaScript's rounds half up; at TOKEN_SIZE no tie is hit, and
  // the style-id guard keeps this pinned to the renderer it was ported from.
  function hexPoints(size) {
    var margin = Math.max(20, Math.round(size * 0.035));
    var right = size - margin - 1;
    var bottom = size - margin - 1;
    var quarter = Math.round(size * 0.25);
    var threeQuarters = size - quarter - 1;
    var middle = Math.floor(size / 2);
    return [
      [quarter, margin],
      [threeQuarters, margin],
      [right, middle],
      [threeQuarters, bottom],
      [quarter, bottom],
      [margin, middle]
    ];
  }

  // The back hexside runs bottom-left to bottom-right. Both ends are pulled in
  // from the corners so the bar reads as a mark on one side rather than as a
  // recoloured stretch of the token border.
  function backBar(size) {
    var points = hexPoints(size);
    var start = points[4];
    var end = points[3];
    var inset = 0.06;
    return {
      x1: start[0] + (end[0] - start[0]) * inset,
      y1: start[1] + (end[1] - start[1]) * inset,
      x2: end[0] - (end[0] - start[0]) * inset,
      y2: end[1] - (end[1] - start[1]) * inset,
      width: Math.round(size * 0.02)
    };
  }

  function buildOverlay(size) {
    var bar = backBar(size);
    var svg = document.createElementNS(SVG_NS, 'svg');
    svg.setAttribute('class', 'facing-bar');
    svg.setAttribute('viewBox', '0 0 ' + size + ' ' + size);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');

    var line = document.createElementNS(SVG_NS, 'line');
    line.setAttribute('x1', bar.x1);
    line.setAttribute('y1', bar.y1);
    line.setAttribute('x2', bar.x2);
    line.setAttribute('y2', bar.y2);
    line.setAttribute('stroke-width', bar.width);
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke', 'var(--ember-500, #d30000)');
    svg.appendChild(line);
    return svg;
  }

  function drawBar(ctx, size) {
    var bar = backBar(size);
    ctx.save();
    ctx.strokeStyle = '#d30000';
    ctx.lineWidth = bar.width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bar.x1, bar.y1);
    ctx.lineTo(bar.x2, bar.y2);
    ctx.stroke();
    ctx.restore();
  }

  // The page displays the token through a plain <img>, so the browser caches a
  // response carrying no CORS headers. Re-requesting that exact URL for the
  // canvas reuses the cached copy and fails however the bucket is configured,
  // so the composite asks for a distinct URL. The marker is stable rather than
  // random: the CORS-flavoured response caches once and every later toggle
  // reuses it.
  function corsUrl(src) {
    return src + (src.indexOf('?') === -1 ? '?' : '&') + 'cors=1';
  }

  // Resolves to a PNG blob of the token with the bar burned in, or rejects if
  // the asset host will not allow a cross-origin read. Callers fall back to the
  // untouched PNG, so a missing CORS header costs the download nothing but the
  // bar itself.
  function composite(src, size) {
    return new Promise(function (resolve, reject) {
      var source = new Image();
      source.crossOrigin = 'anonymous';
      source.onload = function () {
        try {
          var canvas = document.createElement('canvas');
          canvas.width = size;
          canvas.height = size;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(source, 0, 0, size, size);
          drawBar(ctx, size);
          canvas.toBlob(function (blob) {
            if (blob) resolve(blob);
            else reject(new Error('canvas produced no blob'));
          }, 'image/png');
        } catch (err) {
          reject(err);
        }
      };
      source.onerror = function () {
        reject(new Error('token could not be read cross-origin'));
      };
      source.src = corsUrl(src);
    });
  }

  function stored() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (err) {
      return false;
    }
  }

  function remember(on) {
    try {
      window.localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
    } catch (err) {
      /* private browsing: the toggle still works for this page */
    }
  }

  function init() {
    var frames = [];
    var tokens = document.querySelectorAll('.token-frame .token--hex');
    for (var i = 0; i < tokens.length; i += 1) {
      if (tokens[i].getAttribute('data-hex-style') !== STYLE_ID) continue;
      var frame = tokens[i].parentNode;
      frame.appendChild(buildOverlay(TOKEN_SIZE));
      frames.push({ frame: frame, img: tokens[i] });
    }
    if (!frames.length) return;

    var control = document.querySelector('.token-controls');
    var input = control && control.querySelector('input[type="checkbox"]');
    if (!control || !input) return;

    // The download link keeps its original target until a composite succeeds,
    // so every failure mode still downloads the published token.
    var link = document.querySelector('.art-downloads a[data-art="hex-token"]');
    var plainHref = link ? link.getAttribute('href') : null;
    var objectUrl = null;

    function releaseObjectUrl() {
      if (!objectUrl) return;
      URL.revokeObjectURL(objectUrl);
      objectUrl = null;
    }

    function updateDownload(on) {
      if (!link) return;
      if (!on) {
        link.setAttribute('href', plainHref);
        releaseObjectUrl();
        return;
      }
      composite(frames[0].img.currentSrc || frames[0].img.src, TOKEN_SIZE)
        .then(function (blob) {
          if (!input.checked) return; // toggled off while we were working
          releaseObjectUrl();
          objectUrl = URL.createObjectURL(blob);
          link.setAttribute('href', objectUrl);
        })
        .catch(function () {
          link.setAttribute('href', plainHref);
        });
    }

    function apply(on) {
      for (var i = 0; i < frames.length; i += 1) {
        frames[i].frame.classList.toggle('is-facing', on);
      }
      updateDownload(on);
    }

    input.checked = stored();
    input.addEventListener('change', function () {
      remember(input.checked);
      apply(input.checked);
    });
    apply(input.checked);
    control.removeAttribute('hidden');
  }

  // scripts/test-hex-facing.mjs defines this hook before evaluating the file so
  // the geometry can be asserted without a browser. Never defined in a page.
  if (typeof globalThis.__doaHexFacingTestHook === 'function') {
    globalThis.__doaHexFacingTestHook({
      hexPoints: hexPoints,
      backBar: backBar,
      TOKEN_SIZE: TOKEN_SIZE,
      STYLE_ID: STYLE_ID
    });
    return;
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
