/**
 * animations.js — Intersection Observer Scroll Reveals & Skill Bars
 */

'use strict';

// ── Scroll Reveal ──────────────────────────────────────────────────
const ScrollReveal = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  // Export so dynamically rendered elements can be observed
  window._revealObserver = observer;

  function init() {
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
      // Immediately show if already in viewport (no scroll needed)
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });
  }

  return { init };
})();

// ── Skill Bar Animation ────────────────────────────────────────────
const SkillBars = (() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
          const pct = bar.dataset.pct || '0';
          bar.style.width = pct + '%';
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  function init() {
    document.querySelectorAll('.skill-category-card').forEach(card => {
      observer.observe(card);
    });
  }

  return { init };
})();

// ── Counter Animation ──────────────────────────────────────────────
const CounterAnimation = (() => {
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  function init() {
    document.querySelectorAll('[data-target]').forEach(el => {
      observer.observe(el);
    });
  }

  return { init };
})();

// ── Section Active State (for nav) ────────────────────────────────
const ActiveSection = (() => {
  let sections = [];
  let navLinks = [];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          link.classList.toggle('active', href === `#${id}`);
        });
        // Also update mobile nav
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0
  });

  function init() {
    sections  = document.querySelectorAll('section[id]');
    navLinks  = document.querySelectorAll('.nav-link');
    sections.forEach(s => observer.observe(s));
  }

  return { init };
})();

// ── Bootstrap ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  ScrollReveal.init();
  SkillBars.init();
  CounterAnimation.init();
  ActiveSection.init();
});
