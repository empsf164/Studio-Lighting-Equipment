/**
 * LUMORA STUDIO — THEME SYSTEM
 * Supports Light & Dark modes with instant DOM initialization and persistence.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'lumora_theme_preference';

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to studio dark mode
    return 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);

    // Update all theme toggle button icons across the DOM
    const buttons = document.querySelectorAll('.theme-toggle-btn');
    buttons.forEach(btn => {
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
      btn.innerHTML = theme === 'dark'
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
    });

    window.dispatchEvent(new CustomEvent('lumora:theme-change', { detail: { theme } }));
  }

  // Initial immediate application before full page paint
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  // Global toggle function
  window.LumoraTheme = {
    get: () => document.documentElement.getAttribute('data-theme') || 'dark',
    set: (theme) => applyTheme(theme),
    toggle: () => {
      const current = window.LumoraTheme.get();
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      if (window.LumoraBookmarks) {
        window.LumoraBookmarks.showToast(`Switched to ${next} studio mode`, 'info');
      }
    }
  };

  // Wire up listeners when DOM is ready
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.LumoraTheme.toggle();
      });
    });
  });
})();
