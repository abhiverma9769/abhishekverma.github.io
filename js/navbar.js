/**
 * navbar.js — Sticky Navbar, Scroll State, Mobile Menu, Active Link
 */

'use strict';

const Navbar = (() => {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  // ── Scroll Shadow ──
  function handleScroll() {
    if (!navbar) return;
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveLink();
  }

  // ── Active Link Highlight ──
  const sections = ['hero','about','skills','projects','architecture','experience','services','github-repos','contact','education'];

  function updateActiveLink() {
    const scrollY = window.scrollY + 100;
    let current = 'hero';

    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    }

    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${current}`);
    });
  }

  // ── Mobile Menu ──
  function toggleMenu() {
    const open = toggle.classList.toggle('open');
    mobileNav.classList.toggle('open', open);
    mobileNav.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }

  function closeMenu() {
    toggle?.classList.remove('open');
    mobileNav?.classList.remove('open');
    mobileNav?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function init() {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    toggle?.addEventListener('click', toggleMenu);

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('click', e => {
      if (mobileNav?.classList.contains('open') &&
          !mobileNav.contains(e.target) &&
          !toggle.contains(e.target)) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => Navbar.init());
