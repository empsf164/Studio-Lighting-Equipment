/**
 * LUMORA STUDIO — EQUIPMENT ENGINE
 * Handles equipment catalog rendering, multi-facet filtering, sorting, and dynamic detail pages.
 */

(function () {
  'use strict';

  function renderEquipmentCard(product) {
    const isSaved = window.LumoraBookmarks?.isSaved(product.id, 'equipment');
    const inCompare = window.LumoraCompare?.has(product.id);

    return `
      <div class="product-card" data-product-id="${product.id}" data-category="${product.type}">
        <div class="product-media-wrapper">
          <span class="badge badge-accent product-badge-type">${product.category}</span>
          <div class="product-card-actions">
            <button 
              type="button" 
              class="btn-icon ${isSaved ? 'active' : ''}" 
              data-bookmark-btn 
              data-id="${product.id}" 
              data-type="equipment" 
              data-name="${product.name}" 
              aria-label="Save ${product.name}"
              title="Save to Collection"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
              </svg>
            </button>
          </div>
          <img src="${product.image}" alt="${product.name}" class="product-media-img" loading="lazy">
        </div>

        <div class="product-info">
          <span class="product-category-meta">${product.category}</span>
          <h3 class="product-title">
            <a href="equipment-details.html?id=${product.id}">${product.name}</a>
          </h3>
          <p class="product-desc">${product.description}</p>
          
          <div class="product-specs-grid">
            <div class="spec-item">
              <span class="spec-key">Power Output</span>
              <span class="spec-val">${product.power}</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">Color Temp</span>
              <span class="spec-val">${product.cct}</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">CRI / TLCI</span>
              <span class="spec-val">${product.cri} / ${product.tlci}</span>
            </div>
            <div class="spec-item">
              <span class="spec-key">Mount Type</span>
              <span class="spec-val">${product.mount}</span>
            </div>
          </div>
        </div>

        <div class="product-card-footer">
          <div>
            <span class="product-price">$${product.price}</span>
          </div>
          <div style="display: flex; gap: 6px;">
            <button 
              type="button" 
              class="btn btn-secondary btn-sm ${inCompare ? 'active' : ''}" 
              data-compare-btn 
              data-id="${product.id}"
              title="Add to side-by-side comparison"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
              <span class="btn-text">${inCompare ? 'Comparing' : 'Compare'}</span>
            </button>
            <a href="equipment-details.html?id=${product.id}" class="btn btn-outline btn-sm">
              Details
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // EQUIPMENT CATALOG PAGE (equipment.html)
  // --------------------------------------------------------------------------
  function initEquipmentCatalogPage() {
    const grid = document.getElementById('equipment-catalog-grid');
    if (!grid) return;

    const searchInput = document.getElementById('filter-search');
    const sortSelect = document.getElementById('filter-sort');
    const countDisplay = document.getElementById('results-count-number');
    const activeChipsContainer = document.getElementById('active-filter-chips');
    const clearFiltersBtn = document.getElementById('clear-all-filters-btn');

    // Parse URL params for initial state
    const urlParams = new URLSearchParams(window.location.search);
    let currentCategory = urlParams.get('category') || 'all';
    let currentMount = urlParams.get('mount') || 'all';
    let currentUseCase = urlParams.get('useCase') || 'all';
    let currentMinPrice = 0;
    let currentMaxPrice = 5000;
    let currentMinPower = 0;
    let currentMinCri = 0;
    let currentSort = 'recommended';
    let searchQuery = urlParams.get('q') || '';

    if (searchInput && searchQuery) {
      searchInput.value = searchQuery;
    }

    function applyFilters() {
      let items = [...(window.LUMORA_DATA?.equipment || [])];

      // Text Search
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        items = items.filter(item => 
          item.name.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.mount.toLowerCase().includes(q) ||
          item.useCases.some(u => u.toLowerCase().includes(q))
        );
      }

      // Category filter
      if (currentCategory !== 'all') {
        items = items.filter(item => item.type === currentCategory || item.category.toLowerCase().includes(currentCategory.toLowerCase()));
      }

      // Mount filter
      if (currentMount !== 'all') {
        items = items.filter(item => item.mount.toLowerCase().includes(currentMount.toLowerCase()));
      }

      // Use case filter
      if (currentUseCase !== 'all') {
        items = items.filter(item => item.useCases.some(u => u.toLowerCase().includes(currentUseCase.toLowerCase())));
      }

      // Price filter
      const priceSlider = document.getElementById('filter-price-max');
      if (priceSlider) {
        currentMaxPrice = parseInt(priceSlider.value, 10) || 5000;
        items = items.filter(item => item.price <= currentMaxPrice);
      }

      // Power filter
      const powerRadio = document.querySelector('input[name="filter-power"]:checked');
      if (powerRadio && powerRadio.value !== 'all') {
        const val = parseInt(powerRadio.value, 10);
        items = items.filter(item => item.powerNum >= val);
      }

      // CRI filter
      const criRadio = document.querySelector('input[name="filter-cri"]:checked');
      if (criRadio && criRadio.value !== 'all') {
        const val = parseInt(criRadio.value, 10);
        items = items.filter(item => item.criNum >= val);
      }

      // Sort
      if (sortSelect) {
        currentSort = sortSelect.value;
      }

      if (currentSort === 'price-low') {
        items.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price-high') {
        items.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'highest-cri') {
        items.sort((a, b) => (b.criNum || 0) - (a.criNum || 0));
      } else if (currentSort === 'highest-power') {
        items.sort((a, b) => (b.powerNum || 0) - (a.powerNum || 0));
      } else if (currentSort === 'rating') {
        items.sort((a, b) => b.rating - a.rating);
      }

      // Render Grid
      if (countDisplay) countDisplay.textContent = items.length;

      if (items.length === 0) {
        grid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 60px var(--space-4); text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-medium);">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-inline: auto; margin-bottom: 16px;"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            <h3 style="font-size: 1.25rem; margin-bottom: 8px;">No matching studio equipment found</h3>
            <p style="color: var(--text-secondary); max-width: 420px; margin-inline: auto; margin-bottom: 20px;">Try loosening your filters or resetting to view our full lineup of lights, softboxes, and accessories.</p>
            <button type="button" class="btn btn-secondary btn-sm" id="empty-state-reset-btn">Reset All Filters</button>
          </div>
        `;
        document.getElementById('empty-state-reset-btn')?.addEventListener('click', resetAllFilters);
      } else {
        grid.innerHTML = items.map(renderEquipmentCard).join('');
      }

      renderActiveFilterChips();
      window.LumoraBookmarks?.updateButtons();
      window.LumoraCompare?.updateButtons();
    }

    function renderActiveFilterChips() {
      if (!activeChipsContainer) return;
      let chipsHtml = '';

      if (searchQuery) {
        chipsHtml += `<span class="tag-chip active" data-clear="search">Query: "${searchQuery}" ×</span>`;
      }
      if (currentCategory !== 'all') {
        chipsHtml += `<span class="tag-chip active" data-clear="category">Category: ${currentCategory} ×</span>`;
      }
      if (currentMount !== 'all') {
        chipsHtml += `<span class="tag-chip active" data-clear="mount">Mount: ${currentMount} ×</span>`;
      }
      if (currentUseCase !== 'all') {
        chipsHtml += `<span class="tag-chip active" data-clear="useCase">Use Case: ${currentUseCase} ×</span>`;
      }
      if (currentMaxPrice < 5000) {
        chipsHtml += `<span class="tag-chip active" data-clear="price">Max $${currentMaxPrice} ×</span>`;
      }

      activeChipsContainer.innerHTML = chipsHtml;

      activeChipsContainer.querySelectorAll('[data-clear]').forEach(chip => {
        chip.addEventListener('click', () => {
          const type = chip.getAttribute('data-clear');
          if (type === 'search') {
            searchQuery = '';
            if (searchInput) searchInput.value = '';
          } else if (type === 'category') {
            currentCategory = 'all';
            document.querySelectorAll('input[name="filter-category"]').forEach(r => r.checked = r.value === 'all');
          } else if (type === 'mount') {
            currentMount = 'all';
            document.querySelectorAll('input[name="filter-mount"]').forEach(r => r.checked = r.value === 'all');
          } else if (type === 'useCase') {
            currentUseCase = 'all';
          } else if (type === 'price') {
            const priceSlider = document.getElementById('filter-price-max');
            if (priceSlider) {
              priceSlider.value = 5000;
              document.getElementById('price-max-val').textContent = '$5,000';
            }
          }
          applyFilters();
        });
      });
    }

    function resetAllFilters() {
      searchQuery = '';
      currentCategory = 'all';
      currentMount = 'all';
      currentUseCase = 'all';
      currentMaxPrice = 5000;
      if (searchInput) searchInput.value = '';
      const priceSlider = document.getElementById('filter-price-max');
      if (priceSlider) {
        priceSlider.value = 5000;
        document.getElementById('price-max-val').textContent = '$5,000';
      }
      document.querySelectorAll('input[type="radio"]').forEach(r => {
        if (r.value === 'all') r.checked = true;
      });
      applyFilters();
    }

    // Attach listeners
    searchInput?.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });

    sortSelect?.addEventListener('change', () => {
      applyFilters();
    });

    document.querySelectorAll('input[name="filter-category"]').forEach(radio => {
      if (radio.value === currentCategory) radio.checked = true;
      radio.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        applyFilters();
      });
    });

    document.querySelectorAll('input[name="filter-mount"]').forEach(radio => {
      if (radio.value === currentMount) radio.checked = true;
      radio.addEventListener('change', (e) => {
        currentMount = e.target.value;
        applyFilters();
      });
    });

    document.querySelectorAll('input[name="filter-power"], input[name="filter-cri"]').forEach(radio => {
      radio.addEventListener('change', applyFilters);
    });

    const priceSlider = document.getElementById('filter-price-max');
    const priceDisplay = document.getElementById('price-max-val');
    priceSlider?.addEventListener('input', (e) => {
      if (priceDisplay) priceDisplay.textContent = `$${parseInt(e.target.value, 10).toLocaleString()}`;
      applyFilters();
    });

    clearFiltersBtn?.addEventListener('click', resetAllFilters);

    // Initial render
    applyFilters();
  }

  // --------------------------------------------------------------------------
  // EQUIPMENT DETAILS PAGE (equipment-details.html)
  // --------------------------------------------------------------------------
  function initEquipmentDetailsPage() {
    const container = document.getElementById('equipment-details-root');
    if (!container) return;

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id') || 'lumora-x600-cob';
    const product = window.LUMORA_DATA?.equipment?.find(p => p.id === productId) || window.LUMORA_DATA?.equipment?.[0];

    if (!product) return;

    // Update Page Meta Title
    document.title = `${product.name} — Technical Specs & Details | LUMORA STUDIO`;

    const isSaved = window.LumoraBookmarks?.isSaved(product.id, 'equipment');
    const inCompare = window.LumoraCompare?.has(product.id);

    container.innerHTML = `
      <div class="product-details-grid" style="display: grid; grid-template-columns: 1.1fr 1fr; gap: var(--space-12); align-items: start;">
        
        <!-- Left: Gallery & Interactive Lighting Preview -->
        <div class="product-gallery-column" style="display: flex; flex-direction: column; gap: var(--space-6);">
          <div class="product-main-gallery-view" style="background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); padding: var(--space-8); text-align: center; position: relative;">
            <span class="badge badge-accent" style="position: absolute; top: var(--space-4); left: var(--space-4);">${product.category}</span>
            <img id="main-product-img" src="${product.image}" alt="${product.name}" style="max-height: 380px; width: 100%; object-fit: contain; margin-inline: auto; transition: opacity 0.2s;">
          </div>
          
          <div class="gallery-thumbnails" style="display: flex; gap: var(--space-3); overflow-x: auto;">
            ${(product.gallery || [product.image]).map((img, idx) => `
              <button type="button" class="gallery-thumb-btn ${idx === 0 ? 'active' : ''}" data-src="${img}" style="width: 72px; height: 72px; border-radius: var(--radius-sm); border: 2px solid ${idx === 0 ? 'var(--accent)' : 'var(--border-subtle)'}; background: var(--bg-tertiary); overflow: hidden; padding: 4px;">
                <img src="${img}" alt="Preview thumbnail ${idx + 1}" style="width: 100%; height: 100%; object-fit: contain;">
              </button>
            `).join('')}
          </div>

          <!-- Interactive CCT / Output Simulator Preview Widget -->
          <div class="card card-tech" style="padding: var(--space-6);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
              <h4 style="font-size: 0.95rem; font-family: var(--font-heading); display: flex; align-items: center; gap: 8px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
                Photometric Output Preview
              </h4>
              <span class="badge badge-accent">${product.power}</span>
            </div>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 12px;">Simulated spectral dispersion and illuminance at 1 meter distance:</p>
            <div style="height: 12px; border-radius: 6px; background: linear-gradient(90deg, #ff9329 0%, #ffe3a0 45%, #e1efff 100%); margin-bottom: 8px;"></div>
            <div style="display: flex; justify-content: space-between; font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
              <span>2700K Warm Tungsten</span>
              <span>4500K Neutral</span>
              <span>6500K Daylight</span>
            </div>
          </div>
        </div>

        <!-- Right: Technical Specification Panel & Actions -->
        <div class="product-info-column" style="display: flex; flex-direction: column; gap: var(--space-6);">
          <div>
            <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
              <span class="eyebrow">${product.category}</span>
              <span style="color: var(--text-muted);">•</span>
              <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-secondary);">SKU: LUM-${product.id.toUpperCase().slice(-6)}</span>
            </div>
            <h1 style="font-size: clamp(1.75rem, 3vw, 2.4rem); margin-bottom: var(--space-3);">${product.name}</h1>
            <p class="lead" style="margin-bottom: var(--space-4);">${product.description}</p>
            
            <div style="display: flex; align-items: baseline; gap: var(--space-4); padding-bottom: var(--space-6); border-bottom: 1px solid var(--border-subtle);">
              <span style="font-family: var(--font-mono); font-size: 2rem; font-weight: 700; color: var(--text-primary);">$${product.price}</span>
              <span style="font-size: 0.9rem; color: var(--status-success); display: inline-flex; align-items: center; gap: 4px;">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                In Stock • Global Express Freight Ready
              </span>
            </div>
          </div>

          <!-- Key Quick Specs Grid -->
          <div class="grid grid-2" style="gap: var(--space-3);">
            <div class="card" style="padding: var(--space-3) var(--space-4);">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Color Fidelity</span>
              <p style="font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; color: var(--accent);">CRI ${product.cri} / TLCI ${product.tlci}</p>
            </div>
            <div class="card" style="padding: var(--space-3) var(--space-4);">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Max Output</span>
              <p style="font-family: var(--font-mono); font-weight: 700; font-size: 1.1rem; color: var(--text-primary);">${product.lux || product.power}</p>
            </div>
            <div class="card" style="padding: var(--space-3) var(--space-4);">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Mount Type</span>
              <p style="font-family: var(--font-mono); font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">${product.mount}</p>
            </div>
            <div class="card" style="padding: var(--space-3) var(--space-4);">
              <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase;">Control Protocol</span>
              <p style="font-family: var(--font-mono); font-weight: 600; font-size: 0.95rem; color: var(--text-primary);">${product.wireless}</p>
            </div>
          </div>

          <!-- Action Buttons -->
          <div style="display: flex; flex-wrap: wrap; gap: var(--space-3); padding-block: var(--space-4); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle);">
            <a href="setup-builder.html?add=${product.id}" class="btn btn-primary btn-lg" style="flex: 1 1 200px;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
              Build into Setup
            </a>
            <button 
              type="button" 
              class="btn btn-secondary ${inCompare ? 'active' : ''}" 
              data-compare-btn 
              data-id="${product.id}"
              style="padding: 0.85rem 1.4rem;"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
              <span class="btn-text">${inCompare ? 'In Comparison' : 'Add to Compare'}</span>
            </button>
            <button 
              type="button" 
              class="btn btn-icon ${isSaved ? 'active' : ''}" 
              data-bookmark-btn 
              data-id="${product.id}" 
              data-type="equipment" 
              data-name="${product.name}" 
              style="width: 48px; height: 48px;"
              title="Save to Collection"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            </button>
          </div>

          <!-- Interactive Specification Tabs -->
          <div class="product-tabs-wrapper" style="margin-top: var(--space-4);">
            <div class="tabs-nav" role="tablist">
              <button type="button" class="tab-btn active" data-tab="overview">Overview</button>
              <button type="button" class="tab-btn" data-tab="specifications">Full Specifications</button>
              <button type="button" class="tab-btn" data-tab="compatibility">Compatibility</button>
              <button type="button" class="tab-btn" data-tab="use-cases">Use Cases</button>
            </div>

            <!-- Tab 1: Overview -->
            <div class="tab-pane active" id="tab-overview">
              <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 16px;">
                Engineered for uncompromising cinematographers and studio professionals, the <strong>${product.name}</strong> incorporates advanced optical multi-coatings with industry-leading thermal dissipation. Delivering benchmark color fidelity across all dimming curves, it seamlessly integrates with professional lighting workflows.
              </p>
              <ul style="display: flex; flex-direction: column; gap: 8px; color: var(--text-secondary); font-size: 0.95rem;">
                <li style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent);">✓</span> Dimming Range: ${product.dimming}
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent);">✓</span> Native Beam Angle: ${product.beamAngle}
                </li>
                <li style="display: flex; align-items: center; gap: 8px;">
                  <span style="color: var(--accent);">✓</span> Power Supply: ${product.powerSource}
                </li>
              </ul>
            </div>

            <!-- Tab 2: Specifications Table -->
            <div class="tab-pane" id="tab-specifications">
              <table style="width: 100%; font-size: 0.9rem; border-collapse: collapse;">
                <tbody>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Rated Power Consumption</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.power}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Correlated Color Temp (CCT)</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.cct}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Color Accuracy (CRI / TLCI)</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.cri} / ${product.tlci}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Photometric Illuminance</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.lux}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Accessory Mount Standard</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.mount}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Wireless & Network Control</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.wireless}</td></tr>
                  <tr style="border-bottom: 1px solid var(--border-subtle);"><td style="padding: 10px 0; color: var(--text-muted);">Weight (Fixture / Head)</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.weight}</td></tr>
                  <tr><td style="padding: 10px 0; color: var(--text-muted);">Physical Dimensions</td><td style="padding: 10px 0; font-family: var(--font-mono); font-weight: 600; text-align: right;">${product.dimensions}</td></tr>
                </tbody>
              </table>
            </div>

            <!-- Tab 3: Compatibility -->
            <div class="tab-pane" id="tab-compatibility">
              <p style="color: var(--text-secondary); margin-bottom: 16px;">
                The <strong>${product.name}</strong> is fully compatible with standard <strong>${product.mount}</strong> accessories and the following Lumora modular modifier ecosystem:
              </p>
              <div class="grid grid-2" style="gap: var(--space-3);">
                ${(product.compatibleModifiers || []).map(modId => {
                  const mod = window.LUMORA_DATA?.equipment?.find(m => m.id === modId);
                  if (!mod) return '';
                  return `
                    <a href="equipment-details.html?id=${mod.id}" class="card" style="padding: var(--space-3); display: flex; align-items: center; gap: 10px; text-decoration: none;">
                      <img src="${mod.image}" alt="${mod.name}" style="width: 44px; height: 44px; object-fit: contain;">
                      <div>
                        <h5 style="font-size: 0.85rem; font-weight: 600;">${mod.name}</h5>
                        <span style="font-size: 0.75rem; color: var(--accent);">$${mod.price}</span>
                      </div>
                    </a>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Tab 4: Use Cases -->
            <div class="tab-pane" id="tab-use-cases">
              <div style="display: flex; flex-wrap: wrap; gap: var(--space-2); margin-bottom: 16px;">
                ${product.useCases.map(uc => `
                  <span class="badge badge-accent" style="padding: 6px 12px; font-size: 0.8rem;">${uc}</span>
                `).join('')}
              </div>
              <p style="color: var(--text-secondary); line-height: 1.7;">
                Optimized for commercial studio rigs, high-frame-rate slow motion without strobe flicker, and precision broadcast applications requiring strict spectral stability over continuous multi-hour runs.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Tab Switching Logic
    const tabButtons = container.querySelectorAll('.tab-btn');
    const tabPanes = container.querySelectorAll('.tab-pane');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute('data-tab');
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${target}`)?.classList.add('active');
      });
    });

    // Gallery Thumbnail Switching
    const mainImg = document.getElementById('main-product-img');
    container.querySelectorAll('.gallery-thumb-btn').forEach(thumb => {
      thumb.addEventListener('click', () => {
        container.querySelectorAll('.gallery-thumb-btn').forEach(t => t.style.borderColor = 'var(--border-subtle)');
        thumb.style.borderColor = 'var(--accent)';
        if (mainImg) {
          mainImg.style.opacity = '0';
          setTimeout(() => {
            mainImg.src = thumb.getAttribute('data-src');
            mainImg.style.opacity = '1';
          }, 150);
        }
      });
    });

    // Render Related Equipment
    const relatedContainer = document.getElementById('related-equipment-grid');
    if (relatedContainer) {
      const related = window.LUMORA_DATA?.equipment?.filter(p => p.id !== product.id).slice(0, 3) || [];
      relatedContainer.innerHTML = related.map(renderEquipmentCard).join('');
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initEquipmentCatalogPage();
    initEquipmentDetailsPage();
  });
})();
