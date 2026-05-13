/* ============================================================
   PDFjedi — landing page interactions
   GSAP + ScrollTrigger + Lenis. Black & white. Theme toggle.
   ============================================================ */

(() => {
  'use strict';

  const prefersReduced =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const themeBtn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('pdfjedi-theme');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (systemDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeBtn) themeBtn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'light' ? '#ffffff' : '#0a0a0a');
  }

  themeBtn?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('pdfjedi-theme', next);
  });

  /* ---------- Custom cursor ---------- */
  const cursor = document.querySelector('.cursor');
  const dot = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  if (cursor && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dot) {
        dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    }, { passive: true });

    const followRing = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      requestAnimationFrame(followRing);
    };
    requestAnimationFrame(followRing);

    document.querySelectorAll('a, button, .card, .skill, .step').forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  /* ---------- Lenis smooth scroll ---------- */
  // RAF loop is wired up via GSAP ticker below (after gsap is confirmed loaded),
  // so we don't double-pump Lenis here.
  let lenis = null;
  if (!prefersReduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.085,
    });

    // Anchor links → lenis scroll
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            lenis.scrollTo(target, { offset: -72, duration: 1.4 });
          }
        }
      });
    });
  }

  /* ---------- GSAP setup ---------- */
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  if (lenis) {
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  document.body.classList.add('is-ready');

  /* ---------- Header scrolled state ---------- */
  const header = document.querySelector('.site-header');
  if (header) {
    ScrollTrigger.create({
      start: 'top -20',
      end: 99999,
      onUpdate: (self) => {
        header.classList.toggle('is-scrolled', self.progress > 0);
      },
    });
  }

  /* ---------- Scroll progress ---------- */
  const progressEl = document.querySelector('.scroll-progress');
  if (progressEl) {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        progressEl.style.width = (self.progress * 100) + '%';
      },
    });
  }

  /* ---------- Hero title: split by word for stagger ---------- */
  const titleLines = document.querySelectorAll('.hero-title [data-split]');
  titleLines.forEach((line) => {
    // Use innerHTML to preserve <em> if present
    const html = line.innerHTML;
    // Split top-level by spaces, but keep <em>...</em> intact as one word
    const tokens = html.split(/(<em>.*?<\/em>|\s+)/g).filter(Boolean);
    line.innerHTML = tokens
      .map((tok) => {
        if (/^\s+$/.test(tok)) return ' ';
        return `<span class="word">${tok}</span>`;
      })
      .join('');
  });

  /* ---------- Hero timeline ---------- */
  const heroTl = gsap.timeline({ defaults: { ease: 'expo.out' } });
  heroTl
    .from('.hero .eyebrow', { y: 16, opacity: 0, duration: 0.8 })
    .from('.hero-title .word', {
      yPercent: 110,
      opacity: 0,
      duration: 1.1,
      stagger: 0.06,
    }, '-=0.4')
    .from('.hero-sub', { y: 18, opacity: 0, duration: 0.9 }, '-=0.7')
    .from('.hero-cta > *', { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.5')
    .from('.hero-stats li', { y: 14, opacity: 0, duration: 0.6, stagger: 0.08 }, '-=0.4')
    .from('.window-prompt', { y: 50, opacity: 0, rotate: -8, duration: 1.1 }, '-=0.9')
    .from('.window-output', { y: 50, opacity: 0, rotate: 9, duration: 1.1 }, '-=0.95')
    .from('.window-prompt .window-body code', {
      opacity: 0, duration: 0.6,
    }, '-=0.4')
    .from('.window-output .filetree li', {
      opacity: 0, x: -10, duration: 0.4, stagger: 0.05,
    }, '-=0.5');

  // Mark hero items as revealed so they're not re-animated by the generic reveal
  document.querySelectorAll('.hero [data-reveal]').forEach((el) => el.removeAttribute('data-reveal'));

  /* ---------- Hero parallax / float ---------- */
  if (!prefersReduced) {
    gsap.to('[data-float="1"]', {
      y: -20,
      duration: 4,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });
    gsap.to('[data-float="2"]', {
      y: 20,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
    });

    // Subtle mouse-driven parallax on hero visual
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
      heroVisual.addEventListener('mousemove', (e) => {
        const rect = heroVisual.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to('.window-prompt', { x: px * -18, y: py * -12, rotate: -2 + px * 1.5, duration: 0.6, overwrite: 'auto' });
        gsap.to('.window-output', { x: px * 22, y: py * 14, rotate: 3 + px * 1.5, duration: 0.6, overwrite: 'auto' });
      });
      heroVisual.addEventListener('mouseleave', () => {
        gsap.to('.window-prompt', { x: 0, y: 0, rotate: -2, duration: 0.8 });
        gsap.to('.window-output', { x: 0, y: 0, rotate: 3, duration: 0.8 });
      });
    }
  }

  /* ---------- Scroll-revealed items ---------- */
  gsap.utils.toArray('[data-reveal]').forEach((el) => {
    gsap.fromTo(el,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ---------- Counter animations ---------- */
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.dataset.count);
    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power3.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString();
          },
        });
      },
    });
  });

  /* ---------- Architecture layers stagger ---------- */
  gsap.utils.toArray('.arch-layer').forEach((layer, i) => {
    gsap.fromTo(layer,
      { opacity: 0, y: 40, scale: 0.98 },
      {
        opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'expo.out',
        delay: i * 0.1,
        scrollTrigger: {
          trigger: '.arch-layers',
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ---------- Bento cards: pointer light follow ---------- */
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });

  /* ---------- Skill icon micro animation on hover ---------- */
  document.querySelectorAll('.skill').forEach((skill) => {
    const icon = skill.querySelector('.skill-icon');
    skill.addEventListener('mouseenter', () => {
      gsap.fromTo(icon,
        { rotate: 0, scale: 1 },
        { rotate: -8, scale: 1.06, duration: 0.4, ease: 'back.out(2)' }
      );
    });
    skill.addEventListener('mouseleave', () => {
      gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  /* ---------- Stack icons cascade on enter ---------- */
  const stackIcons = gsap.utils.toArray('.stack-icons li');
  if (stackIcons.length) {
    gsap.from(stackIcons, {
      opacity: 0, y: 18, duration: 0.6, ease: 'expo.out',
      stagger: { each: 0.06, from: 'start' },
      scrollTrigger: {
        trigger: '.stack-icons',
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }

  /* ---------- Section titles: subtle line reveal via clip-path ---------- */
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.fromTo(title,
      { clipPath: 'inset(0 0 100% 0)', y: 20 },
      {
        clipPath: 'inset(0 0 0% 0)',
        y: 0,
        duration: 1.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: title,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  /* ---------- Refresh ScrollTrigger after fonts load ---------- */
  if (document.fonts?.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh()).catch(() => {});
  }

  // Refresh on resize
  window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
  });
})();
