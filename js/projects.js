/**
 * projects.js — Project Data, Cards, Tilt Effect, Modal
 */

'use strict';

// ── Project Data ───────────────────────────────────────────────────
const PROJECTS = [
  {
    id: 1,
    number: '01',
    emoji: '🏢',
    title: 'Admintree – HR & Business Management',
    problem: 'Businesses lacked a unified mobile platform for HR operations — tracking attendance, managing payroll, handling leaves, and giving managers role-specific dashboards all in one app.',
    solution: 'Built a comprehensive Flutter-based HR management app with GetX state management, Firebase real-time sync, and REST APIs. Implemented role-based dashboards so admins, managers, and employees each see relevant data.',
    description: 'End-to-end HR & business management app live on the Google Play Store.',
    tech: ['Flutter', 'GetX', 'Firebase', 'REST API'],
    features: [
      'Employee management with profile & records',
      'Attendance tracking with clock-in/out',
      'Payroll management and salary slips',
      'Leave management with approval workflows',
      'Role-based dashboards (Admin / Manager / Employee)',
      'Live on Google Play Store',
    ],
    github: 'https://github.com/abhiverma9769',
    live: 'https://play.google.com/store/apps/details?id=com.admintree.app',
    image: 'assets/images/project-ecommerce.png',
    featured: true,
  },
  {
    id: 2,
    number: '02',
    emoji: '💼',
    title: '3 Click – Role-Based Job Portal',
    problem: 'Job seekers, employers, and placement agents needed a single platform that handles very different workflows — posting jobs, applying, and brokering placements — without UI confusion.',
    solution: 'Developed a Provider-state-managed Flutter app with a role-detection login system that renders entirely different UIs for Employer, Employee, and Agent roles, backed by Firebase and real-time push notifications.',
    description: 'Multi-role job portal for employers, employees, and agents — live on Play Store.',
    tech: ['Flutter', 'GetX', 'Firebase', 'FCM'],
    features: [
      'Three distinct role-based experiences (Employer / Employee / Agent)',
      'Real-time job postings and status updates',
      'Push notifications via Firebase Cloud Messaging',
      'Pixel-perfect responsive UI across screen sizes',
      'Firebase Auth with role-aware onboarding',
      'Live on Google Play Store',
    ],
    github: 'https://github.com/abhiverma9769',
    live: 'https://play.google.com/store/apps/details?id=com.three.click',
    image: null,
    featured: false,
  },
  {
    id: 3,
    number: '03',
    emoji: '📊',
    title: 'Fusion Code CRM',
    problem: 'The sales team at Fusion Code was losing leads due to manual tracking on spreadsheets — no visibility into follow-up history, lead status, or pipeline analytics.',
    solution: 'Built an internal Flutter CRM app with GetX controllers managing lead state, REST API integration for data sync, status filtering, and a dashboard with key sales metrics visualized with charts.',
    description: 'Internal CRM for lead management, follow-ups, and sales analytics.',
    tech: ['Flutter', 'GetX', 'REST API', 'Firebase', 'FCM'],
    features: [
      'Lead management with full lifecycle tracking',
      'Follow-up scheduling and history log',
      'Status filtering (New / In Progress / Closed)',
      'Dashboard analytics with charts',
      'Clean GetX MVC architecture',
      'Integrated with company REST API backend',
    ],
    github: 'https://github.com/abhiverma9769',
    live: null,
    image: null,
    featured: false,
  },
  {
    id: 4,
    number: '04',
    emoji: '🔧',
    title: 'Garage Management Software',
    problem: 'Auto repair garages managed vehicle service records, billing, and customer info on paper — leading to lost records, billing errors, and poor customer experience.',
    solution: 'Developed a Flutter-based garage management app with Firebase backend, service job tracking per vehicle, digital billing generation, and customer record management with search and filter.',
    description: 'Digital management system for auto garages — services, billing, and customer records.',
    tech: ['Flutter', 'Firebase', 'API Integration', 'GetX'],
    features: [
      'Vehicle service job tracking and status updates',
      'Customer profile and vehicle history management',
      'Digital billing and invoice generation',
      'Record management with search and filters',
      'Firebase Firestore for real-time data sync',
      'Responsive UI for tablet and phone',
    ],
    github: 'https://github.com/abhiverma9769',
    live: null,
    image: null,
    featured: false,
  },
];

// ── Render Project Cards ───────────────────────────────────────────
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = PROJECTS.map((p, i) => `
    <article class="project-card tilt-card" data-id="${p.id}" role="button" tabindex="0" aria-label="View ${p.title} details" style="animation: fade-in-up 0.6s cubic-bezier(0.4,0,0.2,1) ${i * 0.12}s both;">
      <div class="tilt-shine"></div>
      <div class="project-img-wrap">
        ${p.image
      ? `<img src="${p.image}" alt="${p.title}" loading="lazy">`
      : `<div class="project-img-placeholder">${p.emoji}</div>`}
        <div class="project-overlay">
          <button class="btn btn-primary btn-icon" onclick="openModal(${p.id})" aria-label="View details">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          ${p.github ? `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline btn-icon" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>` : ''}
        </div>
      </div>
      <div class="project-body">
        <p class="project-number">${p.number}</p>
        <h3 class="project-title">${p.title}</h3>
        <p class="project-desc">${p.description}</p>
        <div class="project-tags">
          ${p.tech.map(t => `<span class="tag">${t}</span>`).join('')}
        </div>
      </div>
    </article>
  `).join('');

  // Init tilt on cards
  initTilt();

  // Re-observe any new .reveal elements added dynamically
  if (window._revealObserver) {
    grid.querySelectorAll('.reveal').forEach(el => window._revealObserver.observe(el));
  }

  // Keyboard accessibility
  grid.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') openModal(parseInt(card.dataset.id));
    });
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a, button')) openModal(parseInt(card.dataset.id));
    });
  });
}

// ── Tilt Effect ────────────────────────────────────────────────────
function initTilt() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);

      card.style.transform = `perspective(900px) rotateY(${dx * 7}deg) rotateX(${-dy * 7}deg) scale3d(1.02,1.02,1.02)`;

      // Shine position
      const shine = card.querySelector('.tilt-shine');
      if (shine) {
        const mx = ((e.clientX - rect.left) / rect.width) * 100;
        const my = ((e.clientY - rect.top) / rect.height) * 100;
        shine.style.background = `radial-gradient(circle at ${mx}% ${my}%, rgba(255,255,255,0.08) 0%, transparent 60%)`;
        shine.style.opacity = '1';
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      const shine = card.querySelector('.tilt-shine');
      if (shine) shine.style.opacity = '0';
    });
  });
}

// ── Modal ──────────────────────────────────────────────────────────
function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;

  const backdrop = document.getElementById('project-modal');
  if (!backdrop) return;

  backdrop.querySelector('.modal-title').textContent = p.title;
  backdrop.querySelector('.modal-problem').textContent = p.problem;
  backdrop.querySelector('.modal-solution').textContent = p.solution;

  const featuresList = backdrop.querySelector('.modal-features');
  featuresList.innerHTML = p.features.map(f => `<div class="modal-feature-item">${f}</div>`).join('');

  const techWrap = backdrop.querySelector('.modal-tech');
  techWrap.innerHTML = p.tech.map(t => `<span class="tag">${t}</span>`).join('');

  const linksWrap = backdrop.querySelector('.modal-links');
  linksWrap.innerHTML = '';
  if (p.github) {
    linksWrap.innerHTML += `<a href="${p.github}" target="_blank" rel="noopener" class="btn btn-outline">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
      View on GitHub</a>`;
  }
  if (p.live) {
    linksWrap.innerHTML += `<a href="${p.live}" target="_blank" rel="noopener" class="btn btn-primary">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      Live Demo</a>`;
  }

  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const backdrop = document.getElementById('project-modal');
  backdrop?.classList.remove('open');
  document.body.style.overflow = '';
}

// ── Init ───────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('project-modal')?.addEventListener('click', e => {
    if (e.target.id === 'project-modal') closeModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });
});

window.openModal = openModal;
window.closeModal = closeModal;
