// Easter egg: ↑↑↓↓←→←→BA → 15 seconds of game mode in the hero particle network.

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export function initKonami(onActivate) {
  let index = 0;
  window.addEventListener('keydown', (e) => {
    if (e.target && /^(input|textarea)$/i.test(e.target.tagName)) return;
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    if (key === SEQUENCE[index]) {
      index++;
      if (index === SEQUENCE.length) { index = 0; onActivate(); }
    } else {
      index = key === SEQUENCE[0] ? 1 : 0;
    }
  });
}

export function flash(text, hold = 1200) {
  const el = document.getElementById('gamemode');
  const span = document.getElementById('gamemode-text');
  if (!el) return;
  span.textContent = text;
  el.hidden = false;
  gsap.killTweensOf(el);
  gsap.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.3 });
  gsap.to(el, { opacity: 0, duration: 0.5, delay: hold / 1000, onComplete: () => { el.hidden = true; } });
}
