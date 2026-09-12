// Section 3 — Proof Strip: staggered card entrance + counter roll-up.

import { reducedMotion, onEnter, formatNumber } from './utils.js';

/** Count a `.count` element from 0 to its data-to value. */
export function animateCount(el, duration = 1.5) {
  const to = Number(el.dataset.to || 0);
  if (reducedMotion) { el.textContent = formatNumber(to); return; }
  const obj = { v: 0 };
  gsap.to(obj, {
    v: to,
    duration,
    ease: 'power2.out',
    onUpdate: () => { el.textContent = formatNumber(Math.round(obj.v)); },
  });
}

export function initProof() {
  const section = document.getElementById('proof');
  if (!section) return;
  const cards = [...section.querySelectorAll('.proof__card')];

  const countCard = (card) => {
    card.querySelectorAll('.count').forEach((el) => animateCount(el));
    const arrow = card.querySelector('.proof__arrow');
    if (arrow) setTimeout(() => arrow.classList.add('is-on'), 750);
  };

  if (reducedMotion) {
    cards.forEach((card) => {
      card.querySelectorAll('.count').forEach((el) => animateCount(el));
      card.querySelector('.proof__arrow')?.classList.add('is-on');
    });
    return;
  }

  gsap.set(cards, { y: 30, opacity: 0 });
  onEnter(section, () => {
    gsap.to(cards, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' });
    cards.forEach((card, i) => setTimeout(() => countCard(card), i * 150));
  }, { threshold: 0.3 });
}
