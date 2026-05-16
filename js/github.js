/**
 * github.js — GitHub API Integration (Public Repos)
 */

'use strict';

const GitHubRepos = (() => {
  // ⚙️ Replace with your actual GitHub username
  const USERNAME = 'abhiverma9769';
  const API_URL  = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=6&type=owner`;

  const LANG_COLORS = {
    Dart:       '#00B4AB',
    JavaScript: '#F7DF1E',
    TypeScript: '#3178C6',
    Python:     '#3572A5',
    Swift:      '#F05138',
    Kotlin:     '#7F52FF',
  };

  function langDot(lang) {
    const color = LANG_COLORS[lang] || '#64748B';
    return `<span style="width:10px;height:10px;border-radius:50%;background:${color};display:inline-block;"></span>`;
  }

  function renderRepos(repos) {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;

    if (!repos.length) {
      grid.innerHTML = '<p class="repos-loading">No public repositories found.</p>';
      return;
    }

    grid.innerHTML = repos.map(repo => `
      <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-card">
        <div class="repo-card-name">📦 ${repo.name}</div>
        <div class="repo-card-desc">${repo.description || 'No description provided.'}</div>
        <div class="repo-card-meta">
          ${repo.language ? `<span>${langDot(repo.language)} ${repo.language}</span>` : ''}
          <span>⭐ ${repo.stargazers_count}</span>
          <span>🍴 ${repo.forks_count}</span>
        </div>
      </a>
    `).join('');
  }

  function renderSkeletons(grid) {
    grid.innerHTML = Array.from({ length: 6 }, () => `
      <div class="repo-card skeleton" style="height:100px;"></div>
    `).join('');
  }

  async function fetchRepos() {
    const grid = document.getElementById('repos-grid');
    if (!grid) return;

    renderSkeletons(grid);

    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const repos = await res.json();
      // Filter out forks
      renderRepos(repos.filter(r => !r.fork));
    } catch (err) {
      console.warn('GitHub repos fetch failed:', err.message);
      grid.innerHTML = `<p class="repos-loading" style="color:var(--color-text-muted)">
        Couldn't load repos right now. <a href="https://github.com/${USERNAME}" target="_blank" style="color:var(--color-primary)">View on GitHub →</a>
      </p>`;
    }
  }

  function init() {
    const section = document.getElementById('github-repos');
    if (!section) return;

    // Only fetch when section is near viewport
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchRepos();
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    observer.observe(section);
  }

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => GitHubRepos.init());
