// Section 8 — The Lab: scrolling scraper terminal + mini orbital physics sim.

import { reducedMotion, rand, fitCanvas, createLoop, onResize } from './utils.js';

const SOURCES = ['naukri.com', 'indeed.co.in', 'linkedin.com/jobs', 'shine.com', 'foundit.in', 'timesjobs.com', 'hirist.com'];
const CITIES = ['delhi', 'gurgaon', 'noida', 'bengaluru', 'mumbai', 'pune', 'hyderabad', 'remote'];

function terminalLines() {
  const lines = [];
  let total = 18204;
  let t = new Date(2026, 8, 12, 2, 14, 7);
  const stamp = () => { t = new Date(t.getTime() + Math.floor(rand(400, 2600))); return t.toTimeString().slice(0, 8); };
  for (let i = 0; i < 28; i++) {
    const src = SOURCES[i % SOURCES.length];
    const city = CITIES[Math.floor(rand(0, CITIES.length))];
    const page = Math.floor(rand(1, 14));
    const ms = (rand(0.4, 2.3)).toFixed(2);
    const found = Math.floor(rand(18, 60));
    const dupes = Math.floor(rand(3, found * 0.4));
    const fresh = found - dupes;
    total += fresh;
    lines.push(`<span class="dim">[${stamp()}]</span> GET ${src}/s?q=marketing&l=${city}&p=${page} <span class="ok">200</span> ${ms}s`);
    lines.push(`<span class="dim">[${stamp()}]</span> parsed ${found} · dedupe -${dupes}`);
    if (i % 5 === 3) lines.push(`<span class="dim">[${stamp()}]</span> <span class="warn">WARN</span> rate-limited · backoff 2s`);
    lines.push(`<span class="dim">[${stamp()}]</span> indexed ${fresh} new → total ${total.toLocaleString('en-US')}`);
  }
  return lines.join('\n');
}

function initTerminal() {
  const body = document.getElementById('terminal-body');
  if (!body) return;
  const text = terminalLines();
  // duplicated so the -50% translate loops seamlessly
  body.innerHTML = `<span>${text}\n${text}</span>`;
}

function initSim() {
  const canvas = document.getElementById('lab-sim');
  if (!canvas) return;
  let ctx, w, h;
  let G = 900;
  const baseG = 900, hoverG = 2600;
  let hover = false;
  let bodies = [];
  const TRAIL = 26;

  const seed = () => {
    bodies = Array.from({ length: 7 }, (_, i) => {
      const r = rand(28, Math.min(w, h) * 0.42);
      const ang = rand(0, Math.PI * 2);
      const speed = Math.sqrt(baseG / r);
      const dir = i % 2 === 0 ? 1 : -1;
      return {
        x: w / 2 + Math.cos(ang) * r, y: h / 2 + Math.sin(ang) * r,
        vx: -Math.sin(ang) * speed * dir, vy: Math.cos(ang) * speed * dir,
        trail: [], hue: i % 3,
      };
    });
  };

  const respawn = (b) => {
    const r = rand(40, Math.min(w, h) * 0.42);
    const ang = rand(0, Math.PI * 2);
    const speed = Math.sqrt(G / r);
    b.x = w / 2 + Math.cos(ang) * r; b.y = h / 2 + Math.sin(ang) * r;
    b.vx = -Math.sin(ang) * speed; b.vy = Math.cos(ang) * speed;
    b.trail = [];
  };

  const resize = () => { ({ ctx, w, h } = fitCanvas(canvas)); seed(); if (reducedMotion) draw(); };

  const step = (dt) => {
    G += ((hover ? hoverG : baseG) - G) * Math.min(1, dt * 3);
    const cx = w / 2, cy = h / 2;
    for (const b of bodies) {
      const sub = 4;
      for (let s = 0; s < sub; s++) {
        const h2 = dt / sub;
        const dx = cx - b.x, dy = cy - b.y;
        const d2 = dx * dx + dy * dy;
        const d = Math.sqrt(d2) || 1;
        const a = G / Math.max(d2, 64);
        b.vx += (dx / d) * a * h2 * 60;
        b.vy += (dy / d) * a * h2 * 60;
        b.x += b.vx * h2 * 60;
        b.y += b.vy * h2 * 60;
      }
      const d = Math.hypot(cx - b.x, cy - b.y);
      if (d < 7 || b.x < -60 || b.x > w + 60 || b.y < -60 || b.y > h + 60) respawn(b);
      b.trail.push([b.x, b.y]);
      if (b.trail.length > TRAIL) b.trail.shift();
    }
    draw();
  };

  const colors = ['201,149,42', '56,189,248', '167,139,250'];
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    // gravity well
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, 40);
    g.addColorStop(0, 'rgba(201,149,42,0.35)');
    g.addColorStop(1, 'rgba(201,149,42,0)');
    ctx.fillStyle = g;
    ctx.fillRect(w / 2 - 40, h / 2 - 40, 80, 80);
    ctx.fillStyle = '#c9952a';
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 3, 0, Math.PI * 2); ctx.fill();

    for (const b of bodies) {
      const c = colors[b.hue];
      for (let i = 1; i < b.trail.length; i++) {
        ctx.strokeStyle = `rgba(${c},${(i / b.trail.length) * 0.6})`;
        ctx.beginPath();
        ctx.moveTo(b.trail[i - 1][0], b.trail[i - 1][1]);
        ctx.lineTo(b.trail[i][0], b.trail[i][1]);
        ctx.stroke();
      }
      ctx.fillStyle = `rgb(${c})`;
      ctx.beginPath(); ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2); ctx.fill();
    }
  };

  canvas.addEventListener('pointerenter', () => { hover = true; });
  canvas.addEventListener('pointerleave', () => { hover = false; });
  canvas.addEventListener('touchstart', () => { hover = true; }, { passive: true });
  canvas.addEventListener('touchend', () => { hover = false; }, { passive: true });

  const loop = createLoop(canvas, step);
  resize();
  onResize(resize);
  if (reducedMotion) loop.disable();
}

export function initLab() {
  initTerminal();
  initSim();
}
