// Physics Playground — three Canvas 2D simulations, no dependencies.

const canvas = document.getElementById('sim');
const hud = document.getElementById('hud');
const ctx = canvas.getContext('2d');
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

const rand = (a, b) => a + Math.random() * (b - a);
const AMBER = '201,149,42', INK = '232,236,242', SIGNAL = '56,189,248', INSIGHT = '167,139,250', GROWTH = '74,222,128';

let w = 0, h = 0, dpr = 1;
let strength = 1;
let density = 2;
let paused = false;
const pointer = { x: -1e4, y: -1e4, down: false, active: false };

function resize() {
  dpr = Math.min(devicePixelRatio || 1, 2);
  const r = canvas.getBoundingClientRect();
  w = r.width; h = r.height;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  current?.resize?.();
}

/* ---------------------------------------------------------------------- */
/* 1. Gravity Well                                                         */
/* ---------------------------------------------------------------------- */
function gravityWell() {
  let wells = [];
  let parts = [];
  let dragging = null;

  const count = () => [150, 300, 600, 1000][density - 1];

  const seed = () => {
    wells = [{ x: w / 2, y: h / 2, m: 1 }];
    parts = Array.from({ length: count() }, () => {
      const r = rand(40, Math.min(w, h) * 0.45);
      const a = rand(0, Math.PI * 2);
      const v = Math.sqrt(2400 / r) * rand(0.9, 1.1);
      return { x: w / 2 + Math.cos(a) * r, y: h / 2 + Math.sin(a) * r, vx: -Math.sin(a) * v, vy: Math.cos(a) * v, px: 0, py: 0 };
    });
    parts.forEach((p) => { p.px = p.x; p.py = p.y; });
  };

  const step = (dt) => {
    const G = 2400 * strength;
    for (const p of parts) {
      let ax = 0, ay = 0;
      for (const wl of wells) {
        const dx = wl.x - p.x, dy = wl.y - p.y;
        const d2 = Math.max(dx * dx + dy * dy, 200);
        const d = Math.sqrt(d2);
        const a = (G * wl.m) / d2;
        ax += (dx / d) * a; ay += (dy / d) * a;
      }
      p.vx += ax * dt * 60; p.vy += ay * dt * 60;
      const sp = Math.hypot(p.vx, p.vy);
      if (sp > 14) { p.vx *= 14 / sp; p.vy *= 14 / sp; }
      p.px = p.x; p.py = p.y;
      p.x += p.vx * dt * 60; p.y += p.vy * dt * 60;
      if (p.x < -50 || p.x > w + 50 || p.y < -50 || p.y > h + 50) {
        const wl = wells[Math.floor(rand(0, wells.length))];
        const r = rand(60, Math.min(w, h) * 0.4), a = rand(0, Math.PI * 2);
        const v = Math.sqrt(G / r);
        p.x = wl.x + Math.cos(a) * r; p.y = wl.y + Math.sin(a) * r; p.vx = -Math.sin(a) * v; p.vy = Math.cos(a) * v; p.px = p.x; p.py = p.y;
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(12,14,18,0.35)';
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (const p of parts) {
      const sp = Math.hypot(p.vx, p.vy);
      const t = Math.min(1, sp / 9);
      ctx.strokeStyle = `rgba(${t > 0.6 ? AMBER : SIGNAL},${0.35 + t * 0.5})`;
      ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    for (const wl of wells) {
      const g = ctx.createRadialGradient(wl.x, wl.y, 0, wl.x, wl.y, 48 * wl.m);
      g.addColorStop(0, `rgba(${AMBER},0.45)`); g.addColorStop(1, `rgba(${AMBER},0)`);
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(wl.x, wl.y, 48 * wl.m, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = `rgb(${AMBER})`; ctx.beginPath(); ctx.arc(wl.x, wl.y, 4, 0, Math.PI * 2); ctx.fill();
    }
    hud.textContent = `gravity well · ${parts.length} particles · ${wells.length} well${wells.length > 1 ? 's' : ''} · G×${strength.toFixed(1)}`;
  };

  const onDown = (x, y) => {
    dragging = wells.find((wl) => Math.hypot(wl.x - x, wl.y - y) < 40) || null;
    if (!dragging && wells.length < 6) { dragging = { x, y, m: 0.8 }; wells.push(dragging); }
  };
  const onMove = (x, y) => { if (dragging) { dragging.x = x; dragging.y = y; } };
  const onUp = () => { dragging = null; };

  return { seed, step, draw, onDown, onMove, onUp, resize: seed, clear: true };
}

/* ---------------------------------------------------------------------- */
/* 2. Particle Field                                                       */
/* ---------------------------------------------------------------------- */
function particleField() {
  let parts = [];
  let time = 0;
  const count = () => [800, 1600, 3000, 5000][density - 1];

  // cheap pseudo-noise from layered sines
  const noise = (x, y, t) =>
    Math.sin(x * 0.006 + t * 0.4) * Math.cos(y * 0.007 - t * 0.3) +
    Math.sin((x + y) * 0.004 + t * 0.2) * 0.6 +
    Math.cos(x * 0.011 - y * 0.009 + t * 0.5) * 0.4;

  const seed = () => {
    parts = Array.from({ length: count() }, () => ({ x: rand(0, w), y: rand(0, h), px: 0, py: 0, life: rand(0, 1), hue: Math.random() }));
    parts.forEach((p) => { p.px = p.x; p.py = p.y; });
  };

  const step = (dt) => {
    time += dt;
    const speed = 1.6 * strength;
    for (const p of parts) {
      const ang = noise(p.x, p.y, time) * Math.PI;
      let vx = Math.cos(ang) * speed, vy = Math.sin(ang) * speed;
      if (pointer.active) {
        const dx = p.x - pointer.x, dy = p.y - pointer.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 160) {
          const f = (1 - d / 160) * 6 * strength;
          // swirl around the cursor
          vx += (-dy / d) * f; vy += (dx / d) * f;
          if (pointer.down) { vx -= (dx / d) * f; vy -= (dy / d) * f; }
        }
      }
      p.px = p.x; p.py = p.y;
      p.x += vx * dt * 60; p.y += vy * dt * 60;
      p.life -= dt * 0.15;
      if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
        p.x = rand(0, w); p.y = rand(0, h); p.px = p.x; p.py = p.y; p.life = rand(0.6, 1.4);
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = 'rgba(12,14,18,0.18)';
    ctx.fillRect(0, 0, w, h);
    ctx.lineWidth = 1;
    for (const p of parts) {
      const c = p.hue < 0.5 ? INK : p.hue < 0.8 ? SIGNAL : AMBER;
      ctx.strokeStyle = `rgba(${c},${Math.min(1, p.life) * 0.55})`;
      ctx.beginPath(); ctx.moveTo(p.px, p.py); ctx.lineTo(p.x, p.y); ctx.stroke();
    }
    hud.textContent = `particle field · ${parts.length} particles · ${pointer.down ? 'attract' : 'swirl'} · v×${strength.toFixed(1)}`;
  };

  return { seed, step, draw, resize: seed };
}

/* ---------------------------------------------------------------------- */
/* 3. Orbital Mechanics (N-body)                                           */
/* ---------------------------------------------------------------------- */
function nBody() {
  let bodies = [];
  const count = () => [4, 8, 14, 24][density - 1];
  const TRAIL = 60;

  const seed = () => {
    bodies = [];
    // a central star plus orbiting bodies with roughly circular velocities
    bodies.push({ x: w / 2, y: h / 2, vx: 0, vy: 0, m: 60, r: 8, c: AMBER, trail: [] });
    for (let i = 1; i < count(); i++) {
      const r = rand(70, Math.min(w, h) * 0.45);
      const a = rand(0, Math.PI * 2);
      const m = rand(0.4, 3);
      const v = Math.sqrt((900 * 60) / r) * rand(0.95, 1.05);
      bodies.push({
        x: w / 2 + Math.cos(a) * r, y: h / 2 + Math.sin(a) * r,
        vx: -Math.sin(a) * v, vy: Math.cos(a) * v,
        m, r: 2 + Math.sqrt(m) * 1.6, c: [INK, SIGNAL, INSIGHT, GROWTH][i % 4], trail: [],
      });
    }
  };

  const step = (dt) => {
    const G = 900 * strength;
    const sub = 6;
    const hdt = dt / sub;
    for (let s = 0; s < sub; s++) {
      for (let i = 0; i < bodies.length; i++) {
        const a = bodies[i];
        let ax = 0, ay = 0;
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const b = bodies[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const d2 = Math.max(dx * dx + dy * dy, (a.r + b.r) ** 2 * 4);
          const d = Math.sqrt(d2);
          const f = (G * b.m) / d2;
          ax += (dx / d) * f; ay += (dy / d) * f;
        }
        a.vx += ax * hdt; a.vy += ay * hdt;
      }
      for (const b of bodies) { b.x += b.vx * hdt; b.y += b.vy * hdt; }
    }
    for (const b of bodies) {
      b.trail.push([b.x, b.y]);
      if (b.trail.length > TRAIL) b.trail.shift();
      if (b.x < -400 || b.x > w + 400 || b.y < -400 || b.y > h + 400) {
        // fling-outs come back on a fresh orbit
        const r = rand(80, Math.min(w, h) * 0.4), an = rand(0, Math.PI * 2);
        const v = Math.sqrt((G * bodies[0].m) / r);
        b.x = bodies[0].x + Math.cos(an) * r; b.y = bodies[0].y + Math.sin(an) * r;
        b.vx = bodies[0].vx - Math.sin(an) * v; b.vy = bodies[0].vy + Math.cos(an) * v; b.trail = [];
      }
    }
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const b of bodies) {
      for (let i = 1; i < b.trail.length; i++) {
        ctx.strokeStyle = `rgba(${b.c},${(i / b.trail.length) * 0.5})`;
        ctx.beginPath(); ctx.moveTo(b.trail[i - 1][0], b.trail[i - 1][1]); ctx.lineTo(b.trail[i][0], b.trail[i][1]); ctx.stroke();
      }
    }
    for (const b of bodies) {
      if (b.m > 20) {
        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 40);
        g.addColorStop(0, `rgba(${AMBER},0.5)`); g.addColorStop(1, `rgba(${AMBER},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(b.x, b.y, 40, 0, Math.PI * 2); ctx.fill();
      }
      ctx.fillStyle = `rgb(${b.c})`;
      ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill();
    }
    hud.textContent = `n-body · ${bodies.length} bodies · G×${strength.toFixed(1)} · click to add a body`;
  };

  const onDown = (x, y) => {
    if (bodies.length >= 40) return;
    const star = bodies[0];
    const dx = x - star.x, dy = y - star.y;
    const r = Math.hypot(dx, dy) || 1;
    const v = Math.sqrt((900 * strength * star.m) / r);
    bodies.push({ x, y, vx: -(dy / r) * v, vy: (dx / r) * v, m: rand(0.5, 2.5), r: 3, c: INK, trail: [] });
  };

  return { seed, step, draw, onDown, resize: seed };
}

/* ---------------------------------------------------------------------- */
/* Runner                                                                  */
/* ---------------------------------------------------------------------- */
const SIMS = { gravity: gravityWell, field: particleField, nbody: nBody };
let current = null;
let currentName = 'gravity';

function select(name) {
  currentName = name;
  current = SIMS[name]();
  ctx.clearRect(0, 0, w, h);
  current.seed();
  document.querySelectorAll('.sim-btn[data-sim]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sim === name)));
  if (reduced) { current.step(1 / 60); current.draw(); }
}

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  if (!paused && !document.hidden && !reduced) {
    current.step(dt);
    current.draw();
  }
  requestAnimationFrame(frame);
}

/* --- input --- */
const toLocal = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
canvas.addEventListener('pointerdown', (e) => { const [x, y] = toLocal(e); pointer.down = true; pointer.x = x; pointer.y = y; pointer.active = true; current.onDown?.(x, y); canvas.setPointerCapture(e.pointerId); });
canvas.addEventListener('pointermove', (e) => { const [x, y] = toLocal(e); pointer.x = x; pointer.y = y; pointer.active = true; current.onMove?.(x, y); });
canvas.addEventListener('pointerup', () => { pointer.down = false; current.onUp?.(); });
canvas.addEventListener('pointerleave', () => { pointer.active = false; pointer.down = false; current.onUp?.(); });

document.querySelectorAll('.sim-btn[data-sim]').forEach((b) => b.addEventListener('click', () => select(b.dataset.sim)));
document.getElementById('ctl-reset').addEventListener('click', () => select(currentName));
document.getElementById('ctl-strength').addEventListener('input', (e) => { strength = Number(e.target.value); });
document.getElementById('ctl-count').addEventListener('input', (e) => { density = Number(e.target.value); select(currentName); });
window.addEventListener('keydown', (e) => {
  if (e.key === '1') select('gravity');
  if (e.key === '2') select('field');
  if (e.key === '3') select('nbody');
  if (e.key.toLowerCase() === 'r') select(currentName);
  if (e.key === ' ') { e.preventDefault(); paused = !paused; }
});

let rt; window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(resize, 120); });

resize();
select('gravity');
requestAnimationFrame(frame);
