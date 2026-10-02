/**
 * LUMORA STUDIO — MAIN CORE APPLICATION
 * Coordinates header sticky interactions, mobile navigation, hero lighting simulator,
 * compare matrix table rendering, saved items hub, and page lifecycle.
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. NAVBAR & MOBILE DRAWER CONTROLLER
  // --------------------------------------------------------------------------
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileDrawer = document.getElementById('mobile-nav-drawer');
    const drawerOverlay = document.getElementById('mobile-drawer-overlay');
    const drawerCloseBtn = document.getElementById('mobile-drawer-close');
    const equipmentAccordionToggle = document.getElementById('mobile-equipment-accordion-btn');
    const equipmentAccordionContent = document.getElementById('mobile-equipment-accordion');

    // Sticky shadow
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });

    function openMobileDrawer() {
      mobileDrawer?.classList.add('active');
      drawerOverlay?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeMobileDrawer() {
      mobileDrawer?.classList.remove('active');
      drawerOverlay?.classList.remove('active');
      document.body.style.overflow = '';
    }

    mobileToggle?.addEventListener('click', openMobileDrawer);
    drawerCloseBtn?.addEventListener('click', closeMobileDrawer);
    drawerOverlay?.addEventListener('click', closeMobileDrawer);

    // Mobile equipment accordion toggle
    equipmentAccordionToggle?.addEventListener('click', (e) => {
      e.preventDefault();
      equipmentAccordionContent?.classList.toggle('open');
      const arrow = equipmentAccordionToggle.querySelector('.caret');
      if (arrow) {
        arrow.style.transform = equipmentAccordionContent?.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileDrawer();
    });
  }

  // --------------------------------------------------------------------------
  // 2. HERO INTERACTIVE STUDIO LIGHTING SIMULATOR (index.html)
  // --------------------------------------------------------------------------
  function initHeroSimulator() {
    const intensitySlider = document.getElementById('sim-intensity');
    const cctSlider = document.getElementById('sim-cct');
    const beamSlider = document.getElementById('sim-beam');

    const intensityVal = document.getElementById('sim-intensity-val');
    const cctVal = document.getElementById('sim-cct-val');
    const beamVal = document.getElementById('sim-beam-val');

    const beamGlow = document.getElementById('sim-beam-glow');
    const bustSvg = document.getElementById('sim-studio-bust');

    if (!intensitySlider || !cctSlider || !beamSlider) return;

    // Convert Kelvin CCT to RGB Color
    function kelvinToRGB(kelvin) {
      const temp = kelvin / 100;
      let red, green, blue;

      if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        if (temp <= 19) {
          blue = 0;
        } else {
          blue = temp - 10;
          blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
      } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
      }

      const clamp = (x) => Math.round(Math.min(255, Math.max(0, x)));
      return `rgb(${clamp(red)}, ${clamp(green)}, ${clamp(blue)})`;
    }

    function updateSimulator() {
      const intensity = parseInt(intensitySlider.value, 10);
      const cct = parseInt(cctSlider.value, 10);
      const beam = parseInt(beamSlider.value, 10);

      if (intensityVal) intensityVal.textContent = `${intensity}%`;
      if (cctVal) cctVal.textContent = `${cct}K`;
      if (beamVal) beamVal.textContent = `${beam}°`;

      const lightRgb = kelvinToRGB(cct);
      const opacity = intensity / 100;
      const sizeMultiplier = beam / 55;

      if (beamGlow) {
        beamGlow.style.backgroundColor = lightRgb;
        beamGlow.style.opacity = (opacity * 0.85).toString();
        beamGlow.style.transform = `translate(-50%, -50%) scale(${sizeMultiplier})`;
        beamGlow.style.boxShadow = `0 0 ${40 * opacity}px ${lightRgb}`;
      }

      if (bustSvg) {
        bustSvg.style.filter = `drop-shadow(0 15px 25px rgba(0,0,0,0.8)) brightness(${0.5 + (opacity * 0.75)})`;
        bustSvg.querySelectorAll('.light-fill').forEach(el => {
          el.style.fill = lightRgb;
          el.style.fillOpacity = (opacity * 0.7).toString();
        });
      }
    }

    intensitySlider.addEventListener('input', updateSimulator);
    cctSlider.addEventListener('input', updateSimulator);
    beamSlider.addEventListener('input', updateSimulator);

    updateSimulator();
  }

  // --------------------------------------------------------------------------
  // 3. COMPARE PAGE CONTROLLER (compare.html)
  // --------------------------------------------------------------------------
  function initComparePage() {
    const root = document.getElementById('compare-page-root');
    if (!root) return;

    function renderCompareView() {
      const ids = window.LumoraCompare?.getAll() || [];
      const products = ids.map(id => window.LUMORA_DATA?.equipment?.find(p => p.id === id)).filter(Boolean);

      if (products.length === 0) {
        root.innerHTML = `
          <div style="padding: 80px 20px; text-align: center; background: var(--bg-card); border-radius: var(--radius-lg); border: 1px dashed var(--border-medium); max-width: 680px; margin-inline: auto;">
            <svg width="54" height="54" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-inline: auto; margin-bottom: 16px;"><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></svg>
            <h2 style="font-size: 1.5rem; margin-bottom: 8px;">No Equipment in Comparison</h2>
            <p style="color: var(--text-secondary); margin-bottom: 24px;">Browse the studio equipment catalog and click the "Compare" button on any product cards to view detailed side-by-side photometric specifications.</p>
            <a href="equipment.html" class="btn btn-primary btn-lg">Explore Studio Gear →</a>
          </div>
        `;
        return;
      }

      root.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-6); flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <span class="eyebrow">Technical Matrix</span>
            <h1 style="font-size: 2rem;">Comparing ${products.length} Products</h1>
          </div>
          <div style="display: flex; gap: var(--space-3);">
            <button type="button" class="btn btn-secondary btn-sm" id="lumora-save-comparison-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
              Save Comparison
            </button>
            <button type="button" class="btn btn-ghost btn-sm" id="lumora-clear-all-compare-btn">
              Clear All
            </button>
            <a href="equipment.html" class="btn btn-primary btn-sm">+ Add More Gear</a>
          </div>
        </div>

        <div class="compare-table-wrapper">
          <table class="compare-table" style="background: var(--bg-card); border-collapse: separate; border-spacing: 0; width: 100%;">
            <thead>
              <tr style="border-bottom: 2px solid var(--border-medium);">
                <th style="padding: 20px; text-align: left; width: 220px; background: var(--bg-tertiary); color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase;">
                  Specification
                </th>
                ${products.map(p => `
                  <th style="padding: 20px; text-align: center; vertical-align: top; background: var(--bg-secondary); border-left: 1px solid var(--border-subtle); min-width: 240px;">
                    <div style="position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px;">
                      <button type="button" class="tray-item-remove" data-remove-compare="${p.id}" style="position: static; align-self: flex-end;" title="Remove ${p.name}">×</button>
                      <img src="${p.image}" alt="${p.name}" style="height: 110px; object-fit: contain; margin-bottom: 6px;">
                      <span class="badge badge-accent">${p.category}</span>
                      <h4 style="font-size: 1rem; line-height: 1.3;"><a href="equipment-details.html?id=${p.id}">${p.name}</a></h4>
                      <span style="font-family: var(--font-mono); font-size: 1.2rem; font-weight: 700; color: var(--text-primary);">$${p.price}</span>
                    </div>
                  </th>
                `).join('')}
              </tr>
            </thead>
            <tbody>
              ${renderSpecRow("Power Rating", products, p => p.power)}
              ${renderSpecRow("Color Temperature", products, p => p.cct)}
              ${renderSpecRow("Color Fidelity (CRI / TLCI)", products, p => `${p.cri} / ${p.tlci}`)}
              ${renderSpecRow("Photometric Output", products, p => p.lux)}
              ${renderSpecRow("Mount Compatibility", products, p => p.mount)}
              ${renderSpecRow("Dimming Range", products, p => p.dimming)}
              ${renderSpecRow("Native Beam Angle", products, p => p.beamAngle)}
              ${renderSpecRow("Wireless & DMX", products, p => p.wireless)}
              ${renderSpecRow("Power Source", products, p => p.powerSource)}
              ${renderSpecRow("Weight", products, p => p.weight)}
              ${renderSpecRow("Dimensions", products, p => p.dimensions)}
              ${renderSpecRow("Primary Use Cases", products, p => p.useCases.join(', '))}
            </tbody>
          </table>
        </div>
      `;

      root.querySelectorAll('[data-remove-compare]').forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-remove-compare');
          window.LumoraCompare?.remove(id);
          renderCompareView();
        });
      });

      document.getElementById('lumora-clear-all-compare-btn')?.addEventListener('click', () => {
        window.LumoraCompare?.clear();
        renderCompareView();
      });

      document.getElementById('lumora-save-comparison-btn')?.addEventListener('click', () => {
        window.LumoraBookmarks?.showToast('Comparison snapshot saved to your collection', 'success');
      });
    }

    function renderSpecRow(label, products, extractor) {
      return `
        <tr style="border-bottom: 1px solid var(--border-subtle);">
          <td style="padding: 14px 20px; font-weight: 600; color: var(--text-secondary); background: var(--bg-tertiary); font-size: 0.875rem;">
            ${label}
          </td>
          ${products.map(p => `
            <td style="padding: 14px 20px; text-align: center; border-left: 1px solid var(--border-subtle); font-family: var(--font-mono); font-size: 0.875rem; color: var(--text-primary);">
              ${extractor(p) || '—'}
            </td>
          `).join('')}
        </tr>
      `;
    }

    renderCompareView();
  }

  // --------------------------------------------------------------------------
  // 4. SAVED COLLECTIONS HUB (saved.html)
  // --------------------------------------------------------------------------
  function initSavedHub() {
    const root = document.getElementById('saved-hub-root');
    if (!root) return;

    const tabs = root.querySelectorAll('.tab-btn');
    let currentTab = 'equipment';

    function renderSavedContent() {
      const data = window.LumoraBookmarks?.getAll() || { equipment: [], setups: [], guides: [] };
      const user = window.LumoraAuth?.getUser();

      const equipmentItems = (data.equipment || []).map(id => window.LUMORA_DATA?.equipment?.find(e => e.id === id)).filter(Boolean);
      const setupItems = (data.setups || []).map(id => window.LUMORA_DATA?.setups?.find(s => s.id === id)).filter(Boolean);
      const guideItems = (data.guides || []).map(id => window.LUMORA_DATA?.guides?.find(g => g.id === id)).filter(Boolean);

      // Tab count tags
      document.getElementById('saved-count-equip').textContent = equipmentItems.length;
      document.getElementById('saved-count-setups').textContent = setupItems.length;
      document.getElementById('saved-count-guides').textContent = guideItems.length;

      // Container
      const displayContainer = document.getElementById('saved-items-display');
      if (!displayContainer) return;

      if (currentTab === 'equipment') {
        if (equipmentItems.length === 0) {
          displayContainer.innerHTML = renderEmptyState("No saved studio equipment", "Bookmark fixtures, softboxes, and accessories while browsing to build your shortlist.", "equipment.html", "Discover Equipment");
        } else {
          displayContainer.innerHTML = `<div class="grid grid-3" style="gap: var(--space-6);">${equipmentItems.map(p => `
            <div class="card" style="display: flex; flex-direction: column; gap: var(--space-3);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <span class="badge badge-accent">${p.category}</span>
                <button type="button" class="btn-icon active" data-bookmark-btn data-id="${p.id}" data-type="equipment" data-name="${p.name}" title="Remove">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
              <img src="${p.image}" alt="${p.name}" style="height: 140px; object-fit: contain; margin-inline: auto;">
              <h4 style="font-size: 1.05rem;"><a href="equipment-details.html?id=${p.id}">${p.name}</a></h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">${p.power} • ${p.cct}</p>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
                <span style="font-family: var(--font-mono); font-weight: 700;">$${p.price}</span>
                <a href="equipment-details.html?id=${p.id}" class="btn btn-outline btn-sm">Specs →</a>
              </div>
            </div>
          `).join('')}</div>`;
        }
      } else if (currentTab === 'setups') {
        if (setupItems.length === 0) {
          displayContainer.innerHTML = renderEmptyState("No saved lighting setups", "Configure personalized stage blueprints using our Setup Builder and save them here.", "setup-builder.html", "Open Setup Builder");
        } else {
          displayContainer.innerHTML = `<div class="grid grid-2" style="gap: var(--space-6);">${setupItems.map(s => `
            <div class="card card-tech" style="padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-4);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <span class="badge badge-accent">${s.category} Setup</span>
                  <h3 style="font-size: 1.25rem; margin-top: 4px;">${s.title}</h3>
                </div>
                <button type="button" class="btn-icon active" data-bookmark-btn data-id="${s.id}" data-type="setups" data-name="${s.title}" title="Remove">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">${s.purpose}</p>
              <div style="margin-top: auto; display: flex; justify-content: space-between; align-items: center; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
                <span style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-muted);">${s.equipmentCount} Studio Fixtures</span>
                <a href="setup-builder.html?setup=${s.id}" class="btn btn-primary btn-sm">Load Blueprint →</a>
              </div>
            </div>
          `).join('')}</div>`;
        }
      } else if (currentTab === 'guides') {
        if (guideItems.length === 0) {
          displayContainer.innerHTML = renderEmptyState("No bookmarked guides", "Save educational lighting articles and color science breakdowns for quick reference.", "guides.html", "Explore Guides");
        } else {
          displayContainer.innerHTML = `<div class="grid grid-3" style="gap: var(--space-6);">${guideItems.map(g => `
            <div class="card" style="display: flex; flex-direction: column; gap: var(--space-3);">
              <div style="position: relative; border-radius: var(--radius-sm); overflow: hidden; aspect-ratio: 16/9;">
                <img src="${g.image}" alt="${g.title}" style="width: 100%; height: 100%; object-fit: cover;">
                <span class="badge badge-accent" style="position: absolute; top: 8px; left: 8px;">${g.category}</span>
              </div>
              <h4 style="font-size: 1.05rem;"><a href="guide-details.html?id=${g.id}">${g.title}</a></h4>
              <p style="font-size: 0.85rem; color: var(--text-secondary);">${g.readTime} • ${g.author}</p>
              <div style="margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                <a href="guide-details.html?id=${g.id}" class="btn btn-ghost btn-sm" style="padding-left: 0;">Read Guide →</a>
                <button type="button" class="btn-icon active" data-bookmark-btn data-id="${g.id}" data-type="guides" data-name="${g.title}">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                </button>
              </div>
            </div>
          `).join('')}</div>`;
        }
      }
    }

    function renderEmptyState(title, desc, actionUrl, actionText) {
      return `
        <div style="padding: 60px 20px; text-align: center; background: var(--bg-card); border-radius: var(--radius-md); border: 1px dashed var(--border-medium); max-width: 540px; margin-inline: auto;">
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="1.5" style="margin-inline: auto; margin-bottom: 14px;"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          <h3 style="font-size: 1.25rem; margin-bottom: 8px;">${title}</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">${desc}</p>
          <a href="${actionUrl}" class="btn btn-secondary btn-sm">${actionText} →</a>
        </div>
      `;
    }

    tabs.forEach(btn => {
      btn.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        renderSavedContent();
      });
    });

    window.addEventListener('lumora:bookmarks-updated', renderSavedContent);
    renderSavedContent();
  }

  // --------------------------------------------------------------------------
  // 5. GLOBAL INITIALIZATION
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroSimulator();
    initComparePage();
    initSavedHub();
  });
})();
