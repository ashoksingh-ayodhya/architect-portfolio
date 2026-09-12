// Section 7 — Origin Story: scroll-driven timeline draw, milestone nodes, card reveals.

import { reducedMotion, isMobile } from './utils.js';

export function initTimeline() {
  const timeline = document.getElementById('timeline');
  const fill = document.getElementById('timeline-fill');
  if (!timeline || !fill) return;
  const milestones = [...timeline.querySelectorAll('.milestone')];

  if (reducedMotion) {
    gsap.set(fill, { scaleY: 1 });
    milestones.forEach((m) => {
      gsap.set(m.querySelector('.milestone__node'), { scale: 1 });
      gsap.set(m.querySelector('.milestone__card'), { opacity: 1 });
      if (m.classList.contains('milestone--now')) m.querySelector('.milestone__node').classList.add('is-on');
    });
    return;
  }

  gsap.to(fill, {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: timeline, start: 'top 60%', end: 'bottom 60%', scrub: true },
  });

  milestones.forEach((m) => {
    const node = m.querySelector('.milestone__node');
    const card = m.querySelector('.milestone__card');
    const fromRight = m.classList.contains('milestone--right') && !isMobile();
    ScrollTrigger.create({
      trigger: node,
      start: 'top 60%',
      once: true,
      onEnter: () => {
        gsap.to(node, { scale: 1, duration: 0.3, ease: 'back.out(2.5)' });
        gsap.fromTo(card, { opacity: 0, x: fromRight ? 30 : -30 }, { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' });
        if (m.classList.contains('milestone--now')) node.classList.add('is-on');
      },
    });
  });
}
