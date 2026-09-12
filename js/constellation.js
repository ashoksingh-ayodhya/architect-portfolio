// Section 6 — The Arsenal: an interactive constellation of tools (desktop canvas)
// with a grouped, tap-to-expand tag list on smaller screens.

import { reducedMotion, rand, fitCanvas, createLoop, onResize, onEnter } from './utils.js';

const COLORS = { paid: '#38bdf8', analytics: '#4ade80', crm: '#c9952a', tech: '#a78bfa' };

export const TOOLS = [
  { name: 'Google Ads', cat: 'paid', size: 14, tip: 'Search, PMax, Display — the primary paid acquisition channel. Budget allocation by campaign type with per-channel CAC targets.' },
  { name: 'LinkedIn Ads', cat: 'paid', size: 12, tip: 'B2B targeting by job title, company size, and industry. The highest-intent paid channel for reaching HR decision-makers.' },
  { name: 'Meta Ads', cat: 'paid', size: 11, tip: 'Awareness and retargeting. MENA VPN segmentation for geo-specific campaigns. Creative testing at scale.' },
  { name: 'DV360', cat: 'paid', size: 9, tip: 'Programmatic display and remarketing. Used for mid-funnel nurture and brand reinforcement across the open web.' },
  { name: 'GA4', cat: 'analytics', size: 13, tip: 'Attribution source of truth. Event-based tracking, cross-platform dashboards, and conversion path analysis.' },
  { name: 'Search Console', cat: 'analytics', size: 10, tip: 'Organic performance monitoring. Impression trends, CTR analysis, and keyword opportunity discovery.' },
  { name: 'Looker Studio', cat: 'analytics', size: 11, tip: 'Custom dashboards combining Google Ads, GA4, GSC, and Salesforce data. The reporting layer for stakeholders.' },
  { name: 'GTM', cat: 'analytics', size: 11, tip: 'Tag deployment and event tracking. Referral form fires, conversion pixels, dynamic remarketing attributes.' },
  { name: 'Salesforce', cat: 'crm', size: 14, tip: 'Self-taught. Lead stages, scoring, qualification SOPs, automated workflows. The CRM backbone of the entire engine.' },
  { name: 'Customer.io', cat: 'crm', size: 11, tip: 'Email nurture sequences. Triggered by Salesforce stage changes. Handles the MQL→SQL warming.' },
  { name: 'CleverTap', cat: 'crm', size: 10, tip: 'Mobile engagement — push notifications and in-app messaging for the referral program.' },
  { name: 'OptinMonster', cat: 'crm', size: 9, tip: 'On-site lead capture. Exit-intent popups, scroll-triggered forms, referral CTAs on the client portal.' },
  { name: 'Zapier', cat: 'crm', size: 9, tip: 'Glue between platforms. LinkedIn lead gen → Salesforce, form fills → Slack notifications, data sync.' },
  { name: 'Unbounce', cat: 'tech', size: 10, tip: 'Landing page A/B testing. CRO work that contributed to the 16→48% workable rate lift.' },
  { name: 'Python', cat: 'tech', size: 10, tip: 'Automation scripting. Google Ads GAQL queries, negative keyword automation, data exports.' },
  { name: 'GCP', cat: 'tech', size: 8, tip: 'Cloud infrastructure for side projects. VM setup, deployment, server management.' },
  { name: 'WordPress', cat: 'tech', size: 9, tip: '60+ SEO articles on WPS, payroll, and UAE compliance published through WordPress CMS.' },
  { name: 'SEMrush', cat: 'tech', size: 10, tip: 'Competitive intelligence, keyword research, and site audit. Daily driver for SEO strategy.' },
];

const EDGES = [
  ['Google Ads', 'GA4'], ['LinkedIn Ads', 'GA4'], ['Meta Ads', 'GA4'], ['DV360', 'GA4'],
  ['GA4', 'Looker Studio'], ['Search Console', 'Looker Studio'], ['Salesforce', 'Looker Studio'],
  ['GTM', 'GA4'], ['GTM', 'Google Ads'], ['GTM', 'Meta Ads'], ['GA4', 'Salesforce'],
  ['Salesforce', 'Customer.io'], ['CleverTap', 'Salesforce'], ['OptinMonster', 'Salesforce'],
  ['Zapier', 'Salesforce'], ['LinkedIn Ads', 'Zapier'], ['Unbounce', 'GTM'], ['Unbounce', 'Google Ads'],
  ['Python', 'Google Ads'], ['Python', 'GCP'], ['WordPress', 'Search Console'], ['SEMrush', 'WordPress'],
  ['SEMrush', 'Search Console'], ['OptinMonster', 'GTM'], ['CleverTap', 'Customer.io'], ['Google Ads', 'Unbounce'],
];

const tipFor = (name) => TOOLS.find((t) => t.name === name)?.tip || '';

/* ---------------------------------------------------------------------- */
/* Tag list (all screen sizes; visually shown below 1200px)                */
/* ---------------------------------------------------------------------- */
function initTagList() {
  document.querySelectorAll('.arsenal__group').forEach((group) => {
    const out = group.querySelector('.arsenal__expand');
    const tags = [...group.querySelectorAll('.tag')];
    tags.forEach((tag) => {
      tag.addEventListener('click', () => {
        const wasOpen = tag.getAttribute('aria-expanded') === 'true';
        tags.forEach((t) => t.setAttribute('aria-expanded', 'false'));
        if (wasOpen) { out.textContent = ''; return; }
        tag.setAttribute('aria-expanded', 'true');
        out.textContent = tipFor(tag.dataset.tool);
      });
    });
  });
}

/* ---------------------------------------------------------------------- */
/* Force-directed layout (tiny, dependency-free)                           */
/* ---------------------------------------------------------------------- */
function layout(nodes, edges, w, h) {
  const anchors = {
    paid: [w * 0.25, h * 0.32],
    analytics: [w * 0.55, h * 0.28],
    crm: [w * 0.68, h * 0.66],
    tech: [w * 0.3, h * 0.7],
  };
  nodes.forEach((n) => {
    const [ax, ay] = anchors[n.cat];
    n.x = ax + rand(-60, 60);
    n.y = ay + rand(-40, 40);
    n.vx = 0; n.vy = 0;
  });
  const byName = Object.fromEntries(nodes.map((n) => [n.name, n]));
  const links = edges.map(([a, b]) => [byName[a], byName[b]]).filter(([a, b]) => a && b);
  const pad = 70;

  for (let iter = 0; iter < 320; iter++) {
    const alpha = 1 - iter / 320;
    // repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        let dx = a.x - b.x, dy = a.y - b.y;
        let d2 = dx * dx + dy * dy || 1;
        const d = Math.sqrt(d2);
        const f = (9000 / d2) * alpha;
        dx /= d; dy /= d;
        a.vx += dx * f; a.vy += dy * f;
        b.vx -= dx * f; b.vy -= dy * f;
      }
    }
    // springs
    for (const [a, b] of links) {
      const dx = b.x - a.x, dy = b.y - a.y;
      const d = Math.hypot(dx, dy) || 1;
      const f = (d - 140) * 0.02 * alpha;
      a.vx += (dx / d) * f; a.vy += (dy / d) * f;
      b.vx -= (dx / d) * f; b.vy -= (dy / d) * f;
    }
    // cluster gravity + integrate
    for (const n of nodes) {
      const [ax, ay] = anchors[n.cat];
      n.vx += (ax - n.x) * 0.01 * alpha;
      n.vy += (ay - n.y) * 0.01 * alpha;
      n.x += n.vx; n.y += n.vy;
      n.vx *= 0.6; n.vy *= 0.6;
      n.x = Math.min(w - pad, Math.max(pad, n.x));
      n.y = Math.min(h - pad, Math.max(pad, n.y));
    }
  }
  return links;
}

/* ---------------------------------------------------------------------- */
/* Canvas constellation                                                    */
/* ---------------------------------------------------------------------- */
function initCanvas() {
  const stage = document.getElementById('arsenal-stage');
  const canvas = document.getElementById('arsenal-canvas');
  const tooltip = document.getElementById('arsenal-tooltip');
  if (!stage || !canvas) return;

  let ctx, w, h;
  let nodes = TOOLS.map((t) => ({ ...t, x: 0, y: 0, dx: 0, dy: 0, phase: rand(0, Math.PI * 2), rate: rand(0.6, 1.2), alpha: 0 }));
  let links = [];
  let hovered = null;
  let pinned = null;
  let linesAlpha = 0;
  let entered = false;

  const neighbors = (node) => {
    const set = new Set();
    for (const [a, b] of links) { if (a === node) set.add(b); if (b === node) set.add(a); }
    return set;
  };

  const build = () => {
    ({ ctx, w, h } = fitCanvas(canvas));
    links = layout(nodes, EDGES, w, h);
    nodes.forEach((n) => { n.tx = n.x; n.ty = n.y; });
    if (entered || reducedMotion) {
      nodes.forEach((n) => { n.dx = n.tx; n.dy = n.ty; n.alpha = 1; });
      linesAlpha = 1;
      draw(0);
    }
  };

  const flyIn = () => {
    entered = true;
    nodes.forEach((n) => {
      const side = Math.floor(rand(0, 4));
      n.dx = side === 0 ? -80 : side === 1 ? w + 80 : rand(0, w);
      n.dy = side === 2 ? -80 : side === 3 ? h + 80 : rand(0, h);
    });
    gsap.to(nodes, { dx: (i) => nodes[i].tx, dy: (i) => nodes[i].ty, alpha: 1, duration: 0.9, ease: 'elastic.out(1, 0.7)', stagger: 0.035 });
    gsap.to({ v: 0 }, { v: 1, duration: 0.8, delay: 0.9, onUpdate() { linesAlpha = this.targets()[0].v; } });
  };

  const draw = (t) => {
    ctx.clearRect(0, 0, w, h);
    const focus = pinned || hovered;
    const near = focus ? neighbors(focus) : null;

    // links
    ctx.lineWidth = 1;
    for (const [a, b] of links) {
      const connected = focus && (a === focus || b === focus);
      const alpha = (focus ? (connected ? 0.6 : 0.04) : 0.15) * linesAlpha * Math.min(a.alpha, b.alpha);
      ctx.strokeStyle = connected ? `rgba(201,149,42,${alpha})` : `rgba(232,236,242,${alpha})`;
      ctx.beginPath();
      ctx.moveTo(a.dx + a.ox, a.dy + a.oy);
      ctx.lineTo(b.dx + b.ox, b.dy + b.oy);
      ctx.stroke();
    }

    // nodes + labels
    ctx.font = '11px "JetBrains Mono", ui-monospace, monospace';
    ctx.textAlign = 'center';
    for (const n of nodes) {
      const dim = focus && n !== focus && !near.has(n);
      const a = n.alpha * (dim ? 0.25 : 1);
      const x = n.dx + n.ox, y = n.dy + n.oy;
      const r = n.size / 2 + (n === focus ? 2 : 0);
      ctx.globalAlpha = a;
      ctx.fillStyle = COLORS[n.cat];
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      if (n === focus) {
        ctx.strokeStyle = COLORS[n.cat];
        ctx.beginPath(); ctx.arc(x, y, r + 5, 0, Math.PI * 2); ctx.stroke();
      }
      ctx.fillStyle = n === focus ? '#e8ecf2' : '#8b9199';
      ctx.fillText(n.name, x, y + r + 15);
    }
    ctx.globalAlpha = 1;
  };

  const step = (dt, now) => {
    if (!reducedMotion) {
      for (const n of nodes) {
        n.ox = Math.sin(now * 0.001 * n.rate + n.phase) * 0.8;
        n.oy = Math.cos(now * 0.0013 * n.rate + n.phase) * 0.8;
      }
    }
    draw(now);
  };

  nodes.forEach((n) => { n.ox = 0; n.oy = 0; });

  const hitTest = (x, y) => {
    let best = null, bestD = 18;
    for (const n of nodes) {
      const d = Math.hypot(n.dx + n.ox - x, n.dy + n.oy - y);
      if (d < bestD) { best = n; bestD = d; }
    }
    return best;
  };

  const showTooltip = (n) => {
    tooltip.querySelector('.arsenal__tooltip-name').textContent = n.name;
    tooltip.querySelector('.arsenal__tooltip-text').textContent = n.tip;
    tooltip.hidden = false;
    const left = Math.min(Math.max(n.dx, 150), w - 150);
    const flip = n.dy > h - 130;
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${n.dy + (flip ? -n.size / 2 - 12 : n.size / 2 + 10)}px`;
    tooltip.style.transform = flip ? 'translate(-50%, -100%)' : 'translate(-50%, 0)';
  };

  canvas.addEventListener('pointermove', (e) => {
    const r = canvas.getBoundingClientRect();
    hovered = hitTest(e.clientX - r.left, e.clientY - r.top);
    canvas.style.cursor = hovered ? 'pointer' : '';
    if (!pinned) { hovered ? showTooltip(hovered) : (tooltip.hidden = true); }
    if (reducedMotion) draw(0);
  });
  canvas.addEventListener('pointerleave', () => {
    hovered = null;
    if (!pinned) tooltip.hidden = true;
    if (reducedMotion) draw(0);
  });
  canvas.addEventListener('click', (e) => {
    const r = canvas.getBoundingClientRect();
    const n = hitTest(e.clientX - r.left, e.clientY - r.top);
    pinned = n === pinned ? null : n;
    pinned ? showTooltip(pinned) : (tooltip.hidden = true);
    if (reducedMotion) draw(0);
  });

  const loop = createLoop(stage, step);
  build();
  onResize(() => { build(); tooltip.hidden = true; pinned = null; });
  if (reducedMotion) loop.disable();
  else onEnter(stage, flyIn, { threshold: 0.3 });
}

export function initArsenal() {
  initTagList();
  const mm = gsap.matchMedia();
  let built = false;
  mm.add('(min-width: 1200px)', () => {
    if (!built) { built = true; initCanvas(); }
  });
}
