// Section 5 — Case Studies: horizontal scroll gallery (desktop), code-drawn
// mini visualizations, and the full-story overlay.

import { reducedMotion, isMobile, onEnter } from './utils.js';
import { animateCount } from './proof.js';

/* ---------------------------------------------------------------------- */
/* Mini visualizations                                                     */
/* ---------------------------------------------------------------------- */
function playViz(card) {
  const viz = card.querySelector('.viz');
  if (!viz) return;
  viz.classList.remove('is-on');

  if (viz.classList.contains('viz--line')) {
    const line = viz.querySelector('.viz__line');
    const len = line.getTotalLength();
    gsap.fromTo(line, { strokeDasharray: len, strokeDashoffset: len }, {
      strokeDashoffset: 0, duration: reducedMotion ? 0 : 1.2, ease: 'power2.inOut',
      onComplete: () => viz.classList.add('is-on'),
    });
  }

  if (viz.classList.contains('viz--ring')) {
    const ring = viz.querySelector('.viz__ring-fill');
    const pct = Number(ring.dataset.pct) / 100;
    const c = 2 * Math.PI * Number(ring.getAttribute('r'));
    gsap.fromTo(ring, { strokeDasharray: c, strokeDashoffset: c }, {
      strokeDashoffset: c * (1 - pct), duration: reducedMotion ? 0 : 1.2, ease: 'power2.out',
    });
    viz.querySelectorAll('.count').forEach((el) => animateCount(el, 1.2));
  }

  if (viz.classList.contains('viz--bars')) {
    const bars = [...viz.querySelectorAll('.viz__bar')];
    bars.forEach((bar, i) => {
      const h = Number(bar.dataset.h);
      gsap.fromTo(bar, { attr: { height: 0, y: 120 } }, {
        attr: { height: h, y: 120 - h }, duration: reducedMotion ? 0 : 0.7,
        delay: reducedMotion ? 0 : i * 0.06, ease: 'power3.out',
      });
    });
  }
}

/* ---------------------------------------------------------------------- */
/* Overlay                                                                 */
/* ---------------------------------------------------------------------- */
function createOverlay() {
  const overlay = document.getElementById('case-overlay');
  const panel = document.getElementById('overlay-panel');
  const backdrop = overlay.querySelector('.overlay__backdrop');
  const details = [...overlay.querySelectorAll('.case-detail')];
  let lastFocus = null;
  let open = false;

  const axis = () => (isMobile() ? 'y' : 'x');

  const show = (id) => {
    if (open) return;
    open = true;
    lastFocus = document.activeElement;
    details.forEach((d) => { d.hidden = d.dataset.detail !== id; });
    const title = overlay.querySelector('.case-detail:not([hidden]) .case-detail__title');
    if (title) { title.id = 'overlay-title'; }
    overlay.hidden = false;
    panel.scrollTop = 0;
    document.body.classList.add('is-locked');
    const a = axis();
    gsap.set(panel, { x: 0, y: 0, [a]: '100%' });
    gsap.to(panel, { [a]: '0%', duration: reducedMotion ? 0 : 0.4, ease: 'power3.out' });
    gsap.to(backdrop, { opacity: 1, duration: reducedMotion ? 0 : 0.3 });
    panel.focus({ preventScroll: true });
  };

  const hide = () => {
    if (!open) return;
    open = false;
    const a = axis();
    gsap.to(backdrop, { opacity: 0, duration: reducedMotion ? 0 : 0.25 });
    gsap.to(panel, {
      [a]: '100%', duration: reducedMotion ? 0 : 0.35, ease: 'power3.in',
      onComplete: () => {
        overlay.hidden = true;
        document.body.classList.remove('is-locked');
        lastFocus?.focus?.({ preventScroll: true });
      },
    });
  };

  overlay.querySelectorAll('[data-close]').forEach((el) => el.addEventListener('click', hide));
  document.addEventListener('keydown', (e) => {
    if (!open) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'Tab') {
      // simple focus trap
      const focusables = panel.querySelectorAll('button, a[href], [tabindex]:not([tabindex="-1"])');
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  return { show, hide };
}

/* ---------------------------------------------------------------------- */
export function initCases() {
  const section = document.getElementById('work');
  if (!section) return;
  const cardsEl = document.getElementById('work-cards');
  const cards = [...section.querySelectorAll('.case')];
  const overlay = createOverlay();

  // Card interactions
  cards.forEach((card) => {
    const id = card.dataset.case;
    card.addEventListener('click', () => overlay.show(id));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); overlay.show(id); }
    });
    card.addEventListener('mouseenter', () => { if (card.dataset.played) playViz(card); });
    if (reducedMotion) { card.dataset.played = '1'; playViz(card); }
    else onEnter(card, () => { card.dataset.played = '1'; playViz(card); }, { threshold: 0.5 });
  });

  // Entrance for stacked layouts
  if (!reducedMotion) {
    gsap.set(cards, { opacity: 0, y: 30 });
    cards.forEach((card) => onEnter(card, () => gsap.to(card, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }), { threshold: 0.2 }));
  }

  // Horizontal scroll gallery — desktop only
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1200px)', () => {
    if (reducedMotion) return;
    const distance = () => Math.max(0, cardsEl.scrollWidth - window.innerWidth);
    gsap.to(cardsEl, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
  });
}
