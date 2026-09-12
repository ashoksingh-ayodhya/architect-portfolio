// Section 2 — Hero: particle network background, split-text headline reveal,
// and the hidden Konami "game mode".

import { reducedMotion, isDesktop, isMobile, rand, clamp, fitCanvas, createLoop, onResize } from './utils.js';

const AMBER = '201, 149, 42';
const LINK_DIST = 150;
const ATTRACT_DIST = 220;

/* ---------------------------------------------------------------------- */
/* Particle network                                                        */
/* ---------------------------------------------------------------------- */
export function initHeroParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return null;

  let ctx, w, h;
  let particles = [];
  const pointer = { x: 0, y: 0, active: false };
  const game = { on: false, paddleX: 0, ball: null, hits: 0, keys: { left: false, right: false } };

  const count = () => (isMobile() ? 35 : isDesktop() ? 80 : 40);

  const spawn = () => ({
    x: rand(0, w), y: rand(0, h),
    vx: rand(-0.3, 0.3), vy: rand(-0.3, 0.3),
    r: rand(1.5, 2.5),
  });

  const resize = () => {
    ({ ctx, w, h } = fitCanvas(canvas));
    const n = count();
    if (particles.length !== n) particles = Array.from({ length: n }, spawn);
    game.paddleX = w / 2;
    if (reducedMotion) draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    // links
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > LINK_DIST * LINK_DIST) continue;
        const alpha = (1 - Math.sqrt(d2) / LINK_DIST) * 0.28;
        ctx.strokeStyle = `rgba(${AMBER}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }
    // nodes
    ctx.fillStyle = `rgba(${AMBER}, 0.9)`;
    for (const p of particles) ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);

    if (game.on) drawGame();
  };

  const step = (dt) => {
    const s = clamp(dt * 60, 0.5, 2);
    for (const p of particles) {
      if (pointer.active && !game.on) {
        const dx = pointer.x - p.x, dy = pointer.y - p.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < ATTRACT_DIST) {
          const f = (1 - d / ATTRACT_DIST) * 0.035;
          p.vx += (dx / d) * f * s;
          p.vy += (dy / d) * f * s;
        }
      }
      const speed = Math.hypot(p.vx, p.vy);
      if (speed > 1.2) { p.vx *= 1.2 / speed; p.vy *= 1.2 / speed; }
      p.vx *= 0.995; p.vy *= 0.995;
      p.x += p.vx * s; p.y += p.vy * s;
      if (p.x < -10) p.x = w + 10; else if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10; else if (p.y > h + 10) p.y = -10;
    }
    if (game.on) stepGame(s);
    draw();
  };

  /* --- Konami game mode: the network becomes a breakout board --- */
  const stepGame = (s) => {
    const paddleW = 120;
    if (game.keys.left) game.paddleX -= 9 * s;
    if (game.keys.right) game.paddleX += 9 * s;
    if (pointer.active) game.paddleX = pointer.x;
    game.paddleX = clamp(game.paddleX, paddleW / 2, w - paddleW / 2);
    const b = game.ball;
    b.x += b.vx * s; b.y += b.vy * s;
    if (b.x < 6 || b.x > w - 6) b.vx *= -1;
    if (b.y < 6) b.vy = Math.abs(b.vy);
    const paddleY = h - 40;
    if (b.y > paddleY - 6 && b.y < paddleY + 8 && Math.abs(b.x - game.paddleX) < paddleW / 2 && b.vy > 0) {
      b.vy = -Math.abs(b.vy);
      b.vx += ((b.x - game.paddleX) / (paddleW / 2)) * 2;
    }
    if (b.y > h + 20) { b.x = game.paddleX; b.y = paddleY - 12; b.vx = rand(-2, 2); b.vy = -6; }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (Math.hypot(p.x - b.x, p.y - b.y) < 12) {
        particles.splice(i, 1);
        game.hits++;
        b.vy *= -1;
        break;
      }
    }
  };

  const drawGame = () => {
    const b = game.ball;
    ctx.fillStyle = '#e8ecf2';
    ctx.beginPath(); ctx.arc(b.x, b.y, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = `rgba(${AMBER}, 1)`;
    ctx.fillRect(game.paddleX - 60, h - 40, 120, 6);
    ctx.font = '12px "JetBrains Mono", monospace';
    ctx.fillStyle = 'rgba(232,236,242,0.6)';
    ctx.textAlign = 'left';
    ctx.fillText(`HITS: ${game.hits}`, 24, h - 24);
  };

  const startGame = (duration = 15000, onEnd) => {
    if (game.on || reducedMotion) return;
    game.on = true;
    game.hits = 0;
    game.paddleX = w / 2;
    game.ball = { x: w / 2, y: h - 52, vx: rand(-2, 2), vy: -6 };
    loop.start();
    setTimeout(() => {
      game.on = false;
      particles = Array.from({ length: count() }, spawn);
      onEnd?.();
    }, duration);
  };

  /* --- pointer / touch --- */
  const setPointer = (clientX, clientY) => {
    const r = canvas.getBoundingClientRect();
    pointer.x = clientX - r.left;
    pointer.y = clientY - r.top;
    pointer.active = pointer.y >= 0 && pointer.y <= r.height;
  };
  window.addEventListener('pointermove', (e) => setPointer(e.clientX, e.clientY), { passive: true });
  window.addEventListener('touchmove', (e) => {
    const t = e.touches[0];
    if (t) setPointer(t.clientX, t.clientY);
  }, { passive: true });
  window.addEventListener('touchend', () => { pointer.active = false; }, { passive: true });
  document.documentElement.addEventListener('mouseleave', () => { pointer.active = false; });
  window.addEventListener('keydown', (e) => {
    if (!game.on) return;
    if (e.key === 'ArrowLeft') { game.keys.left = true; e.preventDefault(); }
    if (e.key === 'ArrowRight') { game.keys.right = true; e.preventDefault(); }
  });
  window.addEventListener('keyup', (e) => {
    if (e.key === 'ArrowLeft') game.keys.left = false;
    if (e.key === 'ArrowRight') game.keys.right = false;
  });

  const loop = createLoop(canvas, step);
  resize();
  onResize(resize);
  if (reducedMotion) loop.disable();

  return { startGame };
}

/* ---------------------------------------------------------------------- */
/* Split-text headline reveal                                              */
/* ---------------------------------------------------------------------- */
export function prepareHero() {
  const title = document.getElementById('hero-title');
  const subtitle = document.querySelector('.hero__subtitle');
  if (!title) return { play() {} };

  // Wrap each word in an overflow-hidden span; keep the amber period attached to its word.
  title.querySelectorAll('.hero__line').forEach((line) => {
    const period = line.querySelector('.hero__period');
    const text = [...line.childNodes]
      .filter((n) => n.nodeType === Node.TEXT_NODE)
      .map((n) => n.textContent)
      .join(' ')
      .trim();
    line.textContent = '';
    const words = text.split(/\s+/);
    words.forEach((word, i) => {
      const outer = document.createElement('span');
      outer.className = 'hero__word';
      const inner = document.createElement('span');
      inner.textContent = word;
      if (period && i === words.length - 1) inner.appendChild(period);
      outer.appendChild(inner);
      line.appendChild(outer);
      if (i < words.length - 1) line.appendChild(document.createTextNode(' '));
    });
  });

  const inners = title.querySelectorAll('.hero__word > span');
  const period = title.querySelector('.hero__period');

  if (reducedMotion) {
    gsap.set(subtitle, { opacity: 1 });
    return { play() {} };
  }

  gsap.set(inners, { yPercent: 110, rotateX: 8 });
  gsap.set(period, { scale: 0 });

  return {
    play() {
      const tl = gsap.timeline();
      tl.to(inners, { yPercent: 0, rotateX: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' });
      tl.to(period, { scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' }, '-=0.25');
      tl.to(subtitle, { opacity: 1, duration: 0.6 }, '+=0.3');
      return tl;
    },
  };
}
