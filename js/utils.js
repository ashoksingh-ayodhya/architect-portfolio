// Shared helpers: media queries, observers, canvas sizing, math.

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const MQ = {
  desktop: '(min-width: 1200px)',
  tablet: '(min-width: 768px)',
  mobile: '(max-width: 767px)',
};

export const isDesktop = () => window.matchMedia(MQ.desktop).matches;
export const isMobile = () => window.matchMedia(MQ.mobile).matches;
export const hasFinePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches;

export const rand = (a, b) => a + Math.random() * (b - a);
export const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const formatNumber = (n) => n.toLocaleString('en-US');

/** Run `cb` once when `el` enters the viewport. */
export function onEnter(el, cb, { threshold = 0.3, rootMargin = '0px' } = {}) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        io.unobserve(el);
        cb(entry);
      }
    }
  }, { threshold, rootMargin });
  io.observe(el);
  return io;
}

/** Call `onChange(visible)` every time `el` crosses into or out of the viewport. */
export function watchVisibility(el, onChange, threshold = 0) {
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) onChange(entry.isIntersecting);
  }, { threshold });
  io.observe(el);
  return io;
}

/** Size a canvas to its CSS box at device pixel ratio (capped at 2). */
export function fitCanvas(canvas) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, Math.round(rect.width));
  const h = Math.max(1, Math.round(rect.height));
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w, h, dpr };
}

/**
 * requestAnimationFrame loop that pauses when the element is off-screen
 * or the tab is hidden. `frame(dt)` receives the delta time in seconds.
 */
export function createLoop(el, frame) {
  let raf = 0;
  let last = 0;
  let visible = false;
  let enabled = true;

  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    frame(dt, now);
    raf = requestAnimationFrame(tick);
  };
  const start = () => {
    if (raf || !enabled || !visible || document.hidden) return;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };

  watchVisibility(el, (v) => { visible = v; v ? start() : stop(); });
  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));

  return {
    start,
    stop,
    enable() { enabled = true; start(); },
    disable() { enabled = false; stop(); },
    get running() { return raf !== 0; },
  };
}

/** Debounced resize listener. */
export function onResize(fn, wait = 150) {
  let t;
  window.addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(fn, wait);
  });
}

export const storage = {
  get(key) { try { return sessionStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { sessionStorage.setItem(key, value); } catch { /* private mode */ } },
};
