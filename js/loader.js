// Section 1 — System Boot Loader.
// Branded 2.5–3s boot sequence on first visit; skipped on repeat visits (sessionStorage)
// and under prefers-reduced-motion.

import { reducedMotion, isMobile, storage } from './utils.js';

const BOOT_KEY = 'as:booted';

export function runLoader() {
  return new Promise((resolve) => {
    const loader = document.getElementById('loader');
    if (!loader) return resolve();

    const finish = () => {
      loader.hidden = true;
      document.body.classList.remove('is-locked');
      storage.set(BOOT_KEY, '1');
      resolve();
    };

    if (storage.get(BOOT_KEY) || reducedMotion) {
      finish();
      return;
    }

    document.body.classList.add('is-locked');

    const monogram = loader.querySelector('.loader__monogram');
    const typeEl = loader.querySelector('.loader__type');
    const channels = [...loader.querySelectorAll('.loader__channel')]
      .filter((el) => getComputedStyle(el).display !== 'none');
    const fill = loader.querySelector('.loader__fill');
    const pct = loader.querySelector('.loader__pct');

    const text = typeEl.dataset.text || 'INITIALIZING GROWTH ENGINE';
    const mobile = isMobile();
    const charMs = mobile ? 35 : 45;
    const progress = { v: 0 };

    const tl = gsap.timeline({ onComplete: finish });

    tl.to(monogram, { opacity: 1, duration: 0.3 });

    tl.to({}, {
      duration: (text.length * charMs) / 1000,
      ease: 'none',
      onUpdate() {
        const n = Math.round(this.progress() * text.length);
        typeEl.textContent = text.slice(0, n);
      },
    });

    tl.to(channels, { opacity: 1, duration: 0.2, stagger: mobile ? 0.15 : 0.2 }, '+=0.1');

    // Progress bar runs alongside the channel checks (~2.5–3s total sequence).
    tl.to(progress, {
      v: 100,
      duration: mobile ? 1 : 1.5,
      ease: 'power2.inOut',
      onUpdate() {
        fill.style.width = `${progress.v}%`;
        pct.textContent = `${Math.round(progress.v)}%`;
      },
    }, '<0.25');

    tl.to(loader, { yPercent: -100, duration: 0.6, ease: 'power3.inOut' }, '+=0.15');
  });
}
