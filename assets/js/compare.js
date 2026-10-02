/**
 * LUMORA STUDIO — COMPARISON ENGINE & FLOATING TRAY
 * Allows side-by-side comparison of 2–4 studio lighting products with persistent tray.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'lumora_compare_items_v1';
  const MAX_COMPARE = 4;

  function getCompareItems() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Error reading compare list', e);
      return [];
    }
  }

  function saveCompareItems(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      updateCompareBadges();
      renderFloatingTray();
      updateCompareButtonsInDOM();
      window.dispatchEvent(new CustomEvent('lumora:compare-updated', { detail: list }));
    } catch (e) {
      console.error('Error saving compare items', e);
    }
  }

  function addToCompare(id) {
    const list = getCompareItems();
    if (list.includes(id)) {
      window.LumoraBookmarks?.showToast('Item is already in your comparison', 'info');
      return false;
    }

    if (list.length >= MAX_COMPARE) {
      window.LumoraBookmarks?.showToast(`You can compare a maximum of ${MAX_COMPARE} items at once`, 'info');
      return false;
    }

    const product = window.LUMORA_DATA?.equipment?.find(p => p.id === id);
    list.push(id);
    saveCompareItems(list);
    window.LumoraBookmarks?.showToast(`Added ${product ? product.name : 'product'} to comparison`, 'success');
    return true;
  }

  function removeFromCompare(id) {
    let list = getCompareItems();
    list = list.filter(item => item !== id);
    saveCompareItems(list);
    window.LumoraBookmarks?.showToast('Removed product from comparison', 'info');
  }

  function clearCompare() {
    saveCompareItems([]);
    window.LumoraBookmarks?.showToast('Comparison cleared', 'info');
  }

  function isInCompare(id) {
    return getCompareItems().includes(id);
  }

  function toggleCompare(id) {
    if (isInCompare(id)) {
      removeFromCompare(id);
      return false;
    } else {
      return addToCompare(id);
    }
  }

  function updateCompareBadges() {
    const count = getCompareItems().length;
    document.querySelectorAll('.compare-count-badge').forEach(badge => {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'inline-flex' : 'none';
    });
  }

  function updateCompareButtonsInDOM() {
    const list = getCompareItems();
    document.querySelectorAll('[data-compare-btn]').forEach(btn => {
      const id = btn.getAttribute('data-id');
      if (!id) return;
      const active = list.includes(id);
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      
      const label = btn.querySelector('.btn-text');
      if (label) {
        label.textContent = active ? 'In Comparison' : 'Add to Compare';
      }
    });
  }

  // Floating Tray rendering
  function renderFloatingTray() {
    // Don't show tray on compare.html, login.html, signup.html, forgot-password.html
    const isComparePage = window.location.pathname.includes('compare.html');
    const isAuthPage = window.location.pathname.includes('login.html') || 
                       window.location.pathname.includes('signup.html') || 
                       window.location.pathname.includes('forgot-password.html');
    
    let tray = document.getElementById('lumora-comparison-tray');
    
    if (isAuthPage) {
      if (tray) tray.remove();
      return;
    }

    const list = getCompareItems();

    if (!tray && !isComparePage) {
      tray = document.createElement('div');
      tray.id = 'lumora-comparison-tray';
      tray.className = 'comparison-tray';
      document.body.appendChild(tray);
    }

    if (!tray) return;

    if (list.length === 0 || isComparePage) {
      tray.classList.remove('visible');
      return;
    }

    let slotsHtml = '';
    for (let i = 0; i < MAX_COMPARE; i++) {
      const id = list[i];
      if (id) {
        const item = window.LUMORA_DATA?.equipment?.find(p => p.id === id);
        if (item) {
          slotsHtml += `
            <div class="tray-item-slot filled" title="${item.name}">
              <img src="${item.image}" alt="${item.name}">
              <button type="button" class="tray-item-remove" data-remove-compare="${item.id}" aria-label="Remove ${item.name}">×</button>
            </div>
          `;
        }
      } else {
        slotsHtml += `<div class="tray-item-slot" title="Empty slot"></div>`;
      }
    }

    tray.innerHTML = `
      <div class="tray-items-container">
        <div style="margin-right: 8px;">
          <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">Compare</span>
          <span class="badge badge-accent" style="margin-left: 4px;">${list.length}/${MAX_COMPARE}</span>
        </div>
        ${slotsHtml}
      </div>
      <div class="tray-actions" style="display: flex; align-items: center; gap: 8px;">
        <button type="button" class="btn btn-ghost btn-sm" id="lumora-clear-tray-btn">Clear</button>
        <a href="compare.html" class="btn btn-primary btn-sm">
          Compare Now →
        </a>
      </div>
    `;

    tray.classList.add('visible');

    // Attach clear & remove listeners inside tray
    tray.querySelector('#lumora-clear-tray-btn')?.addEventListener('click', clearCompare);
    tray.querySelectorAll('[data-remove-compare]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        removeFromCompare(btn.getAttribute('data-remove-compare'));
      });
    });
  }

  // Export Global API
  window.LumoraCompare = {
    getAll: getCompareItems,
    add: addToCompare,
    remove: removeFromCompare,
    clear: clearCompare,
    has: isInCompare,
    toggle: toggleCompare,
    updateBadges: updateCompareBadges,
    updateButtons: updateCompareButtonsInDOM,
    renderTray: renderFloatingTray
  };

  // Delegate click events for compare buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-compare-btn]');
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();

    const id = btn.getAttribute('data-id');
    if (id) {
      window.LumoraCompare.toggle(id);
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    updateCompareBadges();
    renderFloatingTray();
    updateCompareButtonsInDOM();
  });
})();
