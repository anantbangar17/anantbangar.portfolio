/* ============================================================
   ANANT BANGAR PORTFOLIO — main.js
   1. Hamburger nav toggle
   2. Active nav link (filename-based)
   3. Fade-up IntersectionObserver
   4. Theme toggle (dark ↔ light) persisted to localStorage
   5. Typed role effect (index only)
   6. Proficiency bar animations (skills only)
   7. Project tag filter (projects only)
   8. Contact form with EmailJS (contact only)
   9. Scroll-to-top button
   ============================================================ */

/* ── 1. HAMBURGER ── */
function toggleNav() {
  document.getElementById('navLinks')?.classList.toggle('open');
  document.getElementById('hamburger')?.classList.toggle('open');
}

/* ── 2. ACTIVE NAV LINK ── */
(function () {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
})();

/* ── 3. FADE-UP ── */
(function () {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.07 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
})();

/* ── 4. THEME TOGGLE ── */
(function () {
  const saved = localStorage.getItem('ab-theme') || 'dark';
  applyTheme(saved);
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('ab-theme', theme);
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/* ── 5. TYPED ROLE (index only) ── */
(function () {
  const el = document.getElementById('typedRole');
  if (!el) return;
  const roles = [
    'Full-Stack Developer',
    'MERN Stack Engineer',
    'Problem Solver',
    'DSA Enthusiast',
    'Open to Work',
  ];
  let ri = 0, ci = 0, deleting = false;
  function tick() {
    const word = roles[ri];
    el.textContent = deleting ? word.slice(0, ci--) : word.slice(0, ci++);
    let delay = deleting ? 55 : 90;
    if (!deleting && ci > word.length)  { delay = 1800; deleting = true; }
    else if (deleting && ci < 0)        { deleting = false; ci = 0; ri = (ri + 1) % roles.length; delay = 350; }
    setTimeout(tick, delay);
  }
  tick();
})();

/* ── 6. PROFICIENCY BARS (skills only) ── */
(function () {
  const bars = document.querySelectorAll('.prof-fill[data-width]');
  if (!bars.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.width + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(b => obs.observe(b));
})();

/* ── 7. PROJECT FILTER (projects only) ── */
(function () {
  const bar = document.getElementById('filterBar');
  if (!bar) return;
  const cards = document.querySelectorAll('.project-card[data-tags]');
  bar.addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    bar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const tag = btn.dataset.filter;
    cards.forEach(card => {
      const show = tag === 'all' || (card.dataset.tags || '').includes(tag);
      card.style.opacity      = show ? '1' : '0.15';
      card.style.transform    = show ? 'translateX(0)' : 'translateX(4px) scale(0.98)';
      card.style.pointerEvents = show ? '' : 'none';
    });
  });
})();

/* ── 8. CONTACT FORM with EmailJS ── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn  = form.querySelector('.form-submit');
    const msg  = document.getElementById('formMsg');
    const orig = btn.textContent;
    btn.textContent = 'Sending…';
    btn.disabled = true;

    const payload = {
      from_name:  form.querySelector('[name="name"]').value,
      from_email: form.querySelector('[name="email"]').value,
      subject:    form.querySelector('[name="subject"]').value,
      message:    form.querySelector('[name="message"]').value,
    };

    try {
      /* ── TO ENABLE REAL EMAIL SENDING ──────────────────────────────
         1. Sign up free at https://www.emailjs.com
         2. Create a Gmail service + email template
         3. Add to <head> of contact.html:
            <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"><\/script>
         4. Replace the three strings below and uncomment the send() line
      ──────────────────────────────────────────────────────────────── */
      // await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', payload, 'YOUR_PUBLIC_KEY');

      // Simulated success — remove once EmailJS is configured
      await new Promise(r => setTimeout(r, 900));

      msg.textContent = '✓ Message sent! I\'ll reply within 24 hours.';
      msg.className = 'form-msg success';
      form.reset();
    } catch (err) {
      msg.textContent = '✗ Something went wrong — please email me directly.';
      msg.className = 'form-msg error';
    } finally {
      btn.textContent = orig;
      btn.disabled = false;
    }
  });
})();

/* ── 9. SCROLL-TO-TOP ── */
(function () {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();
