// Custom cursor — desktop with a fine pointer only.
// Amber dot + trailing ring; the ring expands on interactive elements and
// shows contextual text from [data-cursor].

import { reducedMotion, isDesktop, hasFinePointer } from './utils.js';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label, .tag';

export function initCursor() {
  if (reducedMotion || !isDesktop() || !hasFinePointer()) return;

  const root = document.querySelector('.cursor');
  if (!root) return;
  const dot = root.querySelector('.cursor__dot');
  const ring = root.querySelector('.cursor__ring');
  const label = root.querySelector('.cursor__label');

  document.body.classList.add('has-cursor');
  root.classList.add('is-hidden');

  gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3' });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3' });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3' });

  window.addEventListener('pointermove', (e) => {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    dotX(e.clientX); dotY(e.clientY);
    ringX(e.clientX); ringY(e.clientY);
    root.classList.remove('is-hidden');
  }, { passive: true });

  document.documentElement.addEventListener('mouseleave', () => root.classList.add('is-hidden'));
  document.documentElement.addEventListener('mouseenter', () => root.classList.remove('is-hidden'));

  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest(INTERACTIVE);
    if (!target) return;
    root.classList.add('is-hover');
    const text = target.closest('[data-cursor]')?.dataset.cursor;
    if (text) {
      label.textContent = text;
      root.classList.add('has-label');
    }
  });
  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest(INTERACTIVE);
    if (!target) return;
    const next = e.relatedTarget?.closest?.(INTERACTIVE);
    if (next === target) return;
    root.classList.remove('is-hover', 'has-label');
  });
}
