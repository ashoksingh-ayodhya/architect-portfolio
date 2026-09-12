// Section 9 — Signal: email copy, form validation + submission, confetti.

import { reducedMotion, isMobile, rand, fitCanvas } from './utils.js';

const EMAIL = 'awesomeashoksingh@gmail.com';
const COPY = {
  required: "This one's required.",
  email: "That doesn't look like an email.",
  sending: 'Sending...',
  sent: 'Sent ✓',
  error: 'Something broke. Try again?',
  send: 'Send →',
};

/* ---------------------------------------------------------------------- */
/* Confetti                                                                */
/* ---------------------------------------------------------------------- */
function confetti(canvas, originX, originY) {
  if (reducedMotion) return;
  const { ctx, w, h } = fitCanvas(canvas);
  const count = isMobile() ? 20 : 30;
  const spread = isMobile() ? 0.7 : 1;
  const parts = Array.from({ length: count }, () => {
    const ang = rand(-Math.PI, 0) * spread - (1 - spread) * Math.PI / 2;
    const speed = rand(180, 420);
    return {
      x: originX, y: originY,
      vx: Math.cos(ang) * speed, vy: Math.sin(ang) * speed,
      rot: rand(0, Math.PI * 2), vr: rand(-8, 8),
      color: Math.random() < 0.6 ? '#c9952a' : '#e8ecf2',
      life: 1,
    };
  });
  let last = performance.now();
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    ctx.clearRect(0, 0, w, h);
    let alive = false;
    for (const p of parts) {
      p.vy += 900 * dt;
      p.x += p.vx * dt; p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.life -= dt / 1.5;
      if (p.life <= 0) continue;
      alive = true;
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-2, -4, 4, 8);
      ctx.restore();
    }
    if (alive) requestAnimationFrame(tick);
    else ctx.clearRect(0, 0, w, h);
  };
  requestAnimationFrame(tick);
}

/* ---------------------------------------------------------------------- */
/* Copy email                                                              */
/* ---------------------------------------------------------------------- */
function initCopy() {
  const btn = document.getElementById('copy-email');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('email-text'));
      const sel = getSelection();
      sel.removeAllRanges(); sel.addRange(range);
      document.execCommand?.('copy');
      sel.removeAllRanges();
    }
    btn.textContent = 'copied ✓';
    btn.classList.add('is-done');
    setTimeout(() => { btn.textContent = 'copy'; btn.classList.remove('is-done'); }, 2000);
  });
}

/* ---------------------------------------------------------------------- */
/* Form                                                                    */
/* ---------------------------------------------------------------------- */
function initForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const submit = document.getElementById('form-submit');
  const status = document.getElementById('form-status');
  const canvas = document.getElementById('confetti-canvas');
  const section = document.getElementById('connect');
  const fields = ['name', 'email', 'message'].map((name) => form.elements[name]);
  const configured = !/YOUR_FORM_ID/.test(form.action);

  const setError = (input, message) => {
    const field = input.closest('.form__field');
    field.classList.toggle('is-invalid', Boolean(message));
    field.querySelector('.form__error').textContent = message || '';
  };
  fields.forEach((input) => input.addEventListener('input', () => setError(input, '')));

  const validate = () => {
    let ok = true;
    for (const input of fields) {
      const value = input.value.trim();
      if (!value) { setError(input, COPY.required); ok = false; continue; }
      if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) { setError(input, COPY.email); ok = false; continue; }
      setError(input, '');
    }
    return ok;
  };

  const showError = () => {
    status.textContent = COPY.error;
    status.style.opacity = '1';
    setTimeout(() => { status.style.opacity = '0'; }, 5000);
    setTimeout(() => { status.textContent = ''; status.style.opacity = ''; }, 5600);
  };

  const celebrate = () => {
    submit.textContent = COPY.sent;
    submit.classList.add('is-success');
    submit.disabled = true;
    const b = submit.getBoundingClientRect();
    const s = section.getBoundingClientRect();
    confetti(canvas, b.left - s.left + b.width / 2, b.top - s.top + b.height / 2);
    form.reset();
    setTimeout(() => {
      submit.textContent = COPY.send;
      submit.classList.remove('is-success');
      submit.disabled = false;
    }, 3000);
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validate()) { fields.find((f) => f.closest('.form__field').classList.contains('is-invalid'))?.focus(); return; }

    const data = new FormData(form);
    if (!configured) {
      // No form backend configured yet: hand off to the visitor's mail client.
      const subject = encodeURIComponent(`Hello from ${data.get('name')}`);
      const body = encodeURIComponent(`${data.get('message')}\n\n— ${data.get('name')} (${data.get('email')})`);
      window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      celebrate();
      return;
    }

    submit.disabled = true;
    submit.textContent = COPY.sending;
    try {
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      celebrate();
    } catch {
      submit.disabled = false;
      submit.textContent = COPY.send;
      showError();
    }
  });
}

export function initContact() {
  initCopy();
  initForm();
}
