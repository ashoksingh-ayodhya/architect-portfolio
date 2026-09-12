// Section 4 — The Growth Engine.
// A pinned, scroll-scrubbed SVG funnel that builds itself, with a canvas layer of
// "lead" particles flowing from channels down through the stages.

import { reducedMotion, isMobile, rand, fitCanvas, createLoop, onResize } from './utils.js';

const VIEWBOX = { desktop: [0, 0, 1000, 660], mobile: [270, 30, 460, 620] };
const CHANNEL_Y = [68, 104, 140, 176, 212];

/* ---------------------------------------------------------------------- */
/* Particle layer                                                          */
/* ---------------------------------------------------------------------- */
function createFunnelParticles(canvas, section) {
  let ctx, w, h;
  let progress = 0;
  let mobile = isMobile();
  let particles = [];
  let spawnClock = 0;

  const maxCount = () => (mobile ? 15 : 40);

  // Cubic bezier point
  const bez = (p0, p1, p2, p3, t) => {
    const u = 1 - t;
    return [
      u * u * u * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t * t * t * p3[0],
      u * u * u * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t * t * t * p3[1],
    ];
  };

  // Builds the ordered list of segments a particle travels along.
  const buildPath = (j) => {
    const down = [
      [500 + j * 170, 110], [500 + j * 150, 190], [500 + j * 120, 257], [500 + j * 100, 330],
      [500 + j * 90, 394], [500 + j * 70, 464], [500 + j * 45, 523], [500, 598],
    ];
    const segs = [];
    let start;
    if (mobile) {
      start = [500 + j * 200, 50];
    } else {
      const cy = CHANNEL_Y[Math.floor(Math.random() * CHANNEL_Y.length)];
      segs.push({ type: 'bez', pts: [[178, cy], [236, cy], [236, 110], [294, 110]], len: 130 });
      start = [294, 110];
    }
    let prev = start;
    for (const pt of down) {
      segs.push({ type: 'line', a: prev, b: pt, len: Math.hypot(pt[0] - prev[0], pt[1] - prev[1]) });
      prev = pt;
    }
    return segs;
  };

  // Segment index a particle may not travel past, given scroll progress.
  const limitFor = (p) => {
    const offset = mobile ? 0 : 1;
    if (p < 0.25) return offset + 0;      // reaches the Awareness box
    if (p < 0.5) return offset + 2;       // Interest
    if (p < 0.75) return offset + 4;      // Evaluation
    return offset + 7;                    // Closed-won + survivor
  };

  // Survival probability when leaving a stage (index of the segment just completed).
  const dropAt = (segIndex) => {
    const i = segIndex - (mobile ? 0 : 1);
    if (i === 1) return 0.55;
    if (i === 3) return 0.5;
    if (i === 5) return 0.45;
    return 1;
  };

  const spawn = () => {
    const j = rand(-1, 1);
    particles.push({ segs: buildPath(j), seg: 0, t: 0, alpha: 0, dying: false, drift: j < 0 ? -1 : 1, x: 0, y: 0, speed: rand(70, 110) });
  };

  const resize = () => {
    ({ ctx, w, h } = fitCanvas(canvas));
    mobile = isMobile();
  };

  const step = (dt) => {
    if (progress > 0.06) {
      spawnClock += dt;
      if (spawnClock > 0.12 && particles.length < maxCount()) { spawnClock = 0; spawn(); }
    }
    const limit = limitFor(progress);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      if (p.dying) {
        p.alpha -= dt * 2.2;
        p.x += p.drift * dt * 40;
        p.y += dt * 12;
        if (p.alpha <= 0) particles.splice(i, 1);
        continue;
      }
      p.alpha = Math.min(1, p.alpha + dt * 3);
      const seg = p.segs[p.seg];
      p.t += (p.speed * dt) / seg.len;
      if (p.t >= 1) {
        if (p.seg >= limit || p.seg >= p.segs.length - 1) { p.dying = true; p.alpha = Math.min(p.alpha, 0.6); continue; }
        if (Math.random() > dropAt(p.seg)) { p.dying = true; continue; }
        p.seg++; p.t = 0;
      }
      const s = p.segs[p.seg];
      if (s.type === 'bez') [p.x, p.y] = bez(...s.pts, p.t);
      else { p.x = s.a[0] + (s.b[0] - s.a[0]) * p.t; p.y = s.a[1] + (s.b[1] - s.a[1]) * p.t; }
    }
    draw();
  };

  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    const vb = mobile ? VIEWBOX.mobile : VIEWBOX.desktop;
    const scale = w / vb[2];
    ctx.save();
    ctx.scale(scale, scale);
    ctx.translate(-vb[0], -vb[1]);
    for (const p of particles) {
      const near = p.seg === p.segs.length - 1 && p.t > 0.7;
      ctx.fillStyle = near ? `rgba(201,149,42,${p.alpha})` : `rgba(232,236,242,${(p.alpha * 0.9).toFixed(3)})`;
      ctx.fillRect(p.x - 2.2, p.y - 2.2, 4.4, 4.4);
    }
    ctx.restore();
  };

  const loop = createLoop(section, step);
  resize();
  onResize(resize);
  if (reducedMotion) loop.disable();

  return {
    setProgress(p) { progress = p; },
  };
}

/* ---------------------------------------------------------------------- */
/* Funnel build timeline                                                   */
/* ---------------------------------------------------------------------- */
export function initFunnel() {
  const section = document.getElementById('engine');
  const svg = document.getElementById('funnel-svg');
  if (!section || !svg) return;

  const head = section.querySelector('.engine__head');
  const chips = [...section.querySelectorAll('.engine__chips li')];
  const channelGroups = [...svg.querySelectorAll('.funnel__channel')];
  const connectors = channelGroups.map((g) => g.querySelector('.funnel__connector'));
  const channelMarks = channelGroups.flatMap((g) => [g.querySelector('text'), g.querySelector('circle')]);
  const stages = ['awareness', 'interest', 'evaluation', 'won'].map((id) => {
    const g = svg.querySelector(`#stage-${id}`);
    return { shape: g.querySelector('.funnel__shape'), texts: [...g.querySelectorAll('text')] };
  });
  const rates = [1, 2, 3].map((n) => svg.querySelector(`#rate-${n}`));
  const notes = [...section.querySelectorAll('.funnel__note')];
  const noteByStage = (n) => notes.filter((el) => el.dataset.stage === String(n));
  const loopPath = svg.querySelector('.funnel__loop-path');
  const loopLabel = svg.querySelector('.funnel__loop-label');
  const survivor = document.getElementById('funnel-survivor');
  const finalText = document.getElementById('funnel-final');

  const particles = createFunnelParticles(document.getElementById('funnel-particles'), section);

  const prepDraw = (path) => {
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    return len;
  };

  const mm = gsap.matchMedia();
  mm.add({ mobile: '(max-width: 767px)', desktop: '(min-width: 768px)' }, (ctx) => {
    const { mobile } = ctx.conditions;
    svg.setAttribute('viewBox', (mobile ? VIEWBOX.mobile : VIEWBOX.desktop).join(' '));

    // Initial states
    gsap.set([...channelMarks, ...stages.flatMap((s) => s.texts)], { opacity: 0 });
    connectors.forEach(prepDraw);
    stages.forEach((s) => { prepDraw(s.shape); gsap.set(s.shape, { fillOpacity: 0 }); });
    prepDraw(loopPath);
    gsap.set(chips, { opacity: 0, y: 6 });

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: reducedMotion ? undefined : {
        trigger: section,
        start: 'top top',
        end: `+=${mobile ? 1200 : 2000}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        onUpdate: (self) => {
          particles.setProgress(self.progress);
          survivor.classList.toggle('is-live', self.progress > 0.94);
        },
      },
    });

    // Stage 1 — Awareness (0–25%)
    tl.from(head, { opacity: 0, y: 20, duration: 0.6 }, 0);
    if (mobile) {
      tl.to(chips, { opacity: 1, y: 0, duration: 0.3, stagger: 0.08 }, 0.3);
    } else {
      tl.to(channelMarks, { opacity: 1, duration: 0.3, stagger: 0.06 }, 0.4);
      tl.to(connectors, { strokeDashoffset: 0, duration: 0.6, stagger: 0.12 }, 0.6);
    }
    tl.to(stages[0].shape, { strokeDashoffset: 0, fillOpacity: 1, duration: 0.8 }, 1.0);
    tl.to(stages[0].texts, { opacity: 1, duration: 0.4 }, 1.5);

    // Stage 2 — Interest (25–50%)
    tl.to(rates[0], { opacity: 1, duration: 0.3 }, 2.0);
    tl.to(stages[1].shape, { strokeDashoffset: 0, fillOpacity: 1, duration: 0.8 }, 2.2);
    tl.to(stages[1].texts, { opacity: 1, duration: 0.4 }, 2.8);
    tl.fromTo(noteByStage(2), { opacity: 0, x: mobile ? 0 : -10 }, { opacity: 1, x: 0, duration: 0.4 }, 3.0);

    // Stage 3 — Evaluation (50–75%)
    tl.to(rates[1], { opacity: 1, duration: 0.3 }, 4.0);
    tl.to(stages[2].shape, { strokeDashoffset: 0, fillOpacity: 1, duration: 0.8 }, 4.2);
    tl.to(stages[2].texts, { opacity: 1, duration: 0.4 }, 4.8);
    if (mobile) tl.to(noteByStage(2), { opacity: 0, duration: 0.3 }, 4.8);
    const s3 = noteByStage(3);
    tl.fromTo(s3[0], { opacity: 0, x: mobile ? 0 : -10 }, { opacity: 1, x: 0, duration: 0.4 }, 5.0);
    if (mobile) {
      tl.to(s3[0], { opacity: 0, duration: 0.3 }, 5.6);
      tl.fromTo(s3[1], { opacity: 0 }, { opacity: 1, duration: 0.4 }, 5.7);
    } else {
      tl.fromTo(s3[1], { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4 }, 5.3);
    }

    // Stage 4 — Closed-won (75–100%)
    tl.to(rates[2], { opacity: 1, duration: 0.3 }, 6.0);
    tl.to(stages[3].shape, { strokeDashoffset: 0, fillOpacity: 1, duration: 0.8 }, 6.2);
    tl.to(stages[3].texts, { opacity: 1, duration: 0.4 }, 6.7);
    if (mobile) tl.to(s3[1], { opacity: 0, duration: 0.3 }, 6.7);
    tl.fromTo(noteByStage(4), { opacity: 0, x: mobile ? 0 : -10 }, { opacity: 1, x: 0, duration: 0.4 }, 6.9);
    tl.to(loopPath, { strokeDashoffset: 0, duration: 0.9, ease: 'none' }, 7.0);
    tl.to(loopLabel, { opacity: 1, duration: 0.3 }, 7.6);
    tl.to(survivor, { opacity: 1, duration: 0.2 }, 7.5);
    tl.to(finalText, { opacity: 1, duration: 0.4 }, 7.8);

    if (reducedMotion) {
      tl.progress(1);
      survivor.classList.add('is-live');
      particles.setProgress(1);
    }

    return () => {
      // matchMedia reverts tweens; also reset dash styles so lengths are recomputed cleanly.
      [...connectors, ...stages.map((s) => s.shape), loopPath].forEach((p) => {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
      });
    };
  });
}
