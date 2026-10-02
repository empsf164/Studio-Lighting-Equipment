/**
 * LUMORA STUDIO — BOOKMARKS & TOAST NOTIFICATION SYSTEM
 * Handles persistent saving of equipment, setups, and editorial guides with toast feedback.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'lumora_saved_items_v1';

  function getStoredBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : { equipment: [], setups: [], guides: [], comparisons: [] };
    } catch (e) {
      console.error('Error reading bookmarks', e);
      return { equipment: [], setups: [], guides: [], comparisons: [] };
    }
  }

  function saveBookmarksToStorage(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      updateAllBadges();
      updateAllBookmarkButtonsInDOM();
      window.dispatchEvent(new CustomEvent('lumora:bookmarks-updated', { detail: data }));
    } catch (e) {
      console.error('Error saving bookmarks', e);
    }
  }

  function createToastContainer() {
    let container = document.getElementById('lumora-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'lumora-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    return container;
  }

  function showToast(message, type = 'success') {
    const container = createToastContainer();
    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    
    const icon = type === 'success'
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--status-success)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>`;

    toast.innerHTML = `${icon} <span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3200);
  }

  function updateAllBadges() {
    const data = getStoredBookmarks();
    const totalSaved = (data.equipment?.length || 0) + (data.setups?.length || 0) + (data.guides?.length || 0);
    
    document.querySelectorAll('.saved-count-badge').forEach(badge => {
      badge.textContent = totalSaved;
      badge.style.display = totalSaved > 0 ? 'inline-flex' : 'none';
    });
  }

  function isItemSaved(id, type = 'equipment') {
    const data = getStoredBookmarks();
    const list = data[type] || [];
    return list.includes(id);
  }

  function toggleSave(id, type = 'equipment', itemName = 'Item') {
    const data = getStoredBookmarks();
    if (!data[type]) data[type] = [];

    const index = data[type].indexOf(id);
    let isSaved = false;

    if (index > -1) {
      data[type].splice(index, 1);
      showToast(`Removed "${itemName}" from your saved items`, 'info');
      isSaved = false;
    } else {
      data[type].push(id);
      showToast(`Saved "${itemName}" to your studio collection`, 'success');
      isSaved = true;
    }

    saveBookmarksToStorage(data);
    return isSaved;
  }

  function updateAllBookmarkButtonsInDOM() {
    document.querySelectorAll('[data-bookmark-btn]').forEach(btn => {
      const id = btn.getAttribute('data-id');
      const type = btn.getAttribute('data-type') || 'equipment';
      if (!id) return;

      const saved = isItemSaved(id, type);
      btn.classList.toggle('active', saved);
      btn.setAttribute('aria-pressed', saved ? 'true' : 'false');
      
      const icon = btn.querySelector('svg');
      if (icon) {
        if (saved) {
          icon.setAttribute('fill', 'currentColor');
        } else {
          icon.setAttribute('fill', 'none');
        }
      }
    });
  }

  // Export Global API
  window.LumoraBookmarks = {
    getAll: getStoredBookmarks,
    isSaved: isItemSaved,
    toggle: toggleSave,
    showToast: showToast,
    updateBadges: updateAllBadges,
    updateButtons: updateAllBookmarkButtonsInDOM
  };

  // Delegate click events for bookmark buttons across the site
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-bookmark-btn]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    const type = btn.getAttribute('data-type') || 'equipment';
    const name = btn.getAttribute('data-name') || 'Item';
    if (id) {
      window.LumoraBookmarks.toggle(id, type, name);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateAllBadges();
    updateAllBookmarkButtonsInDOM();
  });
})();
