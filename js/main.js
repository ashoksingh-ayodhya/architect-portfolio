// whoisashok.com — entry point.
// GSAP + ScrollTrigger are loaded as globals (assets/vendor) before this module.

import { reducedMotion } from './utils.js';
import { runLoader } from './loader.js';
import { initNav } from './nav.js';
import { initCursor } from './cursor.js';
import { initHeroParticles, prepareHero } from './hero.js';
import { initProof } from './proof.js';
import { initFunnel } from './funnel.js';
import { initCases } from './cases.js';
import { initArsenal } from './constellation.js';
import { initTimeline } from './timeline.js';
import { initLab } from './lab.js';
import { initContact } from './contact.js';
import { initKonami, flash } from './konami.js';

gsap.registerPlugin(ScrollTrigger);

const fontsReady = Promise.race([
  document.fonts ? document.fonts.ready : Promise.resolve(),
  new Promise((r) => setTimeout(r, 2500)),
]);

// Structure & scroll-driven sections first so ScrollTrigger measures everything.
initNav();
initCursor();
const hero = initHeroParticles();
const headline = prepareHero();
initProof();
initFunnel();
initCases();
initArsenal();
initTimeline();
initLab();
initContact();

initKonami(() => {
  if (!hero) return;
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  flash('GAME MODE ACTIVATED');
  hero.startGame(15000, () => flash('OK, back to work.'));
});

Promise.all([runLoader(), fontsReady]).then(() => {
  headline.play();
  ScrollTrigger.refresh();
});

window.addEventListener('load', () => ScrollTrigger.refresh());
