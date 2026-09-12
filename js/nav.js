// Global elements: top nav, mobile menu, funnel progress sidebar, hero scroll prompt.

const STAGES = [
  { stage: 'awareness', from: 0 },
  { stage: 'interest', from: 0.15 },
  { stage: 'evaluation', from: 0.40 },
  { stage: 'decision', from: 0.65 },
  { stage: 'action', from: 0.85 },
];

export function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('nav-burger');
  const menu = document.getElementById('mobile-menu');
  const scrollPrompt = document.getElementById('hero-scroll');
  const progressFill = document.querySelector('.funnel-progress__fill');
  const progressLabels = [...document.querySelectorAll('.funnel-progress__labels li')];
  const supportsScrollTimeline = CSS.supports('animation-timeline: scroll()');

  // --- scroll-driven state (nav glass, scroll prompt, funnel progress) ---
  let ticking = false;
  const update = () => {
    ticking = false;
    const y = window.scrollY;
    nav.classList.toggle('is-scrolled', y > 100);
    scrollPrompt?.classList.toggle('is-hidden', y > 100);

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, y / max) : 0;
    if (!supportsScrollTimeline && progressFill) {
      progressFill.style.setProperty('--scroll', pct.toFixed(4));
    }
    let active = STAGES[0].stage;
    for (const s of STAGES) if (pct >= s.from) active = s.stage;
    for (const li of progressLabels) li.classList.toggle('is-active', li.dataset.stage === active);
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();

  // --- active nav link ---
  document.querySelectorAll('.nav__links a[data-nav]').forEach((link) => {
    const target = document.getElementById(link.dataset.nav);
    if (!target) return;
    ScrollTrigger.create({
      trigger: target,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => link.classList.toggle('is-active', self.isActive),
    });
  });

  // --- mobile menu ---
  const setMenu = (open) => {
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    document.body.classList.toggle('is-locked', open);
  };
  burger.addEventListener('click', () => setMenu(menu.hidden));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !menu.hidden) setMenu(false);
  });
  window.matchMedia('(min-width: 768px)').addEventListener('change', (e) => {
    if (e.matches && !menu.hidden) setMenu(false);
  });
}
