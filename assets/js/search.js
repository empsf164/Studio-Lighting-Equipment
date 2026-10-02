/**
 * LUMORA STUDIO — GLOBAL SEARCH MODAL
 * Keyboard-driven fast search across equipment catalog, lighting setups, and editorial guides.
 */

(function () {
  'use strict';

  let searchModal = null;
  let searchInput = null;
  let resultsContainer = null;
  let selectedIndex = -1;

  function createSearchModal() {
    if (document.getElementById('lumora-search-modal')) return;

    searchModal = document.createElement('div');
    searchModal.id = 'lumora-search-modal';
    searchModal.className = 'search-modal-overlay';
    searchModal.setAttribute('role', 'dialog');
    searchModal.setAttribute('aria-modal', 'true');
    searchModal.setAttribute('aria-label', 'Search studio lighting catalog');

    searchModal.innerHTML = `
      <div class="search-modal-container">
        <div class="search-modal-input-bar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--text-muted);">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input 
            type="text" 
            class="search-modal-input" 
            id="lumora-global-search-input" 
            placeholder="Search lights, softboxes, setups, or color science guides..." 
            autocomplete="off" 
            spellcheck="false"
          >
          <button type="button" class="btn btn-ghost btn-sm" id="lumora-search-close-btn" style="padding: 4px 8px; font-size: 0.75rem;">
            ESC
          </button>
        </div>
        <div class="search-modal-results" id="lumora-search-results">
          <div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">
            Type at least 2 characters to search equipment, setups, or guides.
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(searchModal);
    searchInput = document.getElementById('lumora-global-search-input');
    resultsContainer = document.getElementById('lumora-search-results');

    // Event listeners
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    document.getElementById('lumora-search-close-btn')?.addEventListener('click', closeSearch);

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value.trim());
    });

    searchInput.addEventListener('keydown', handleKeyNavigation);
  }

  function openSearch() {
    createSearchModal();
    searchModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      searchInput.value = '';
      searchInput.focus();
      renderDefaultSuggestions();
    }, 50);
  }

  function closeSearch() {
    if (!searchModal) return;
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
    selectedIndex = -1;
  }

  function renderDefaultSuggestions() {
    if (!resultsContainer) return;
    const popularEquipment = window.LUMORA_DATA?.equipment?.slice(0, 3) || [];
    const featuredGuides = window.LUMORA_DATA?.guides?.slice(0, 2) || [];

    let html = `
      <div>
        <div class="search-group-title">Featured Equipment</div>
        ${popularEquipment.map(item => `
          <a href="equipment-details.html?id=${item.id}" class="search-result-item">
            <div class="search-result-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/></svg>
            </div>
            <div class="search-result-info">
              <h4>${item.name}</h4>
              <p>${item.power} • ${item.cct} • ${item.mount}</p>
            </div>
          </a>
        `).join('')}
      </div>
      <div style="margin-top: 12px;">
        <div class="search-group-title">Popular Lighting Guides</div>
        ${featuredGuides.map(guide => `
          <a href="guide-details.html?id=${guide.id}" class="search-result-item">
            <div class="search-result-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <div class="search-result-info">
              <h4>${guide.title}</h4>
              <p>${guide.category} • ${guide.readTime}</p>
            </div>
          </a>
        `).join('')}
      </div>
    `;

    resultsContainer.innerHTML = html;
  }

  function performSearch(query) {
    if (!resultsContainer) return;
    if (query.length < 2) {
      renderDefaultSuggestions();
      return;
    }

    const q = query.toLowerCase();
    const data = window.LUMORA_DATA || {};

    // Match equipment
    const matchedEquipment = (data.equipment || []).filter(item => 
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.mount.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.useCases.some(u => u.toLowerCase().includes(q))
    );

    // Match setups
    const matchedSetups = (data.setups || []).filter(setup => 
      setup.title.toLowerCase().includes(q) ||
      setup.category.toLowerCase().includes(q) ||
      setup.desiredLook.toLowerCase().includes(q) ||
      setup.purpose.toLowerCase().includes(q)
    );

    // Match guides
    const matchedGuides = (data.guides || []).filter(guide => 
      guide.title.toLowerCase().includes(q) ||
      guide.category.toLowerCase().includes(q) ||
      guide.excerpt.toLowerCase().includes(q)
    );

    const totalMatches = matchedEquipment.length + matchedSetups.length + matchedGuides.length;

    if (totalMatches === 0) {
      resultsContainer.innerHTML = `
        <div style="padding: 32px; text-align: center; color: var(--text-muted);">
          <p style="font-size: 1.1rem; color: var(--text-primary); margin-bottom: 6px;">No studio gear or guides found for "${query}"</p>
          <p style="font-size: 0.85rem;">Try searching for terms like "COB", "Softbox", "300W", "Interview", or "CRI".</p>
        </div>
      `;
      return;
    }

    let html = '';

    if (matchedEquipment.length > 0) {
      html += `
        <div>
          <div class="search-group-title">Equipment (${matchedEquipment.length})</div>
          ${matchedEquipment.map(item => `
            <a href="equipment-details.html?id=${item.id}" class="search-result-item">
              <div class="search-result-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/></svg>
              </div>
              <div class="search-result-info">
                <h4>${item.name}</h4>
                <p>${item.category} • ${item.power} • ${item.mount}</p>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }

    if (matchedSetups.length > 0) {
      html += `
        <div style="margin-top: 12px;">
          <div class="search-group-title">Lighting Setups (${matchedSetups.length})</div>
          ${matchedSetups.map(setup => `
            <a href="setup-builder.html?setup=${setup.id}" class="search-result-item">
              <div class="search-result-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              </div>
              <div class="search-result-info">
                <h4>${setup.title}</h4>
                <p>${setup.category} • ${setup.desiredLook} • ${setup.difficulty}</p>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }

    if (matchedGuides.length > 0) {
      html += `
        <div style="margin-top: 12px;">
          <div class="search-group-title">Education & Guides (${matchedGuides.length})</div>
          ${matchedGuides.map(guide => `
            <a href="guide-details.html?id=${guide.id}" class="search-result-item">
              <div class="search-result-icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
              </div>
              <div class="search-result-info">
                <h4>${guide.title}</h4>
                <p>${guide.category} • ${guide.readTime}</p>
              </div>
            </a>
          `).join('')}
        </div>
      `;
    }

    resultsContainer.innerHTML = html;
    selectedIndex = -1;
  }

  function handleKeyNavigation(e) {
    const items = resultsContainer.querySelectorAll('.search-result-item');
    if (!items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % items.length;
      updateHighlight(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedIndex = (selectedIndex - 1 + items.length) % items.length;
      updateHighlight(items);
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      items[selectedIndex].click();
    } else if (e.key === 'Escape') {
      closeSearch();
    }
  }

  function updateHighlight(items) {
    items.forEach((item, idx) => {
      item.classList.toggle('highlighted', idx === selectedIndex);
      if (idx === selectedIndex) {
        item.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  // Keyboard shortcut listener for Cmd+K / Ctrl+K / '/'
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchModal && searchModal.classList.contains('active')) {
        closeSearch();
      } else {
        openSearch();
      }
    } else if (e.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      e.preventDefault();
      openSearch();
    } else if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
      closeSearch();
    }
  });

  window.LumoraSearch = {
    open: openSearch,
    close: closeSearch
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.search-trigger-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openSearch();
      });
    });
  });
})();
