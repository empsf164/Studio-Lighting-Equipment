/**
 * LUMORA STUDIO — INTERACTIVE LIGHTING SETUP BUILDER
 * Workflow tool generating customized studio lighting blueprints, 2D floorplan diagrams, and equipment bills of materials.
 */

(function () {
  'use strict';

  function initSetupBuilder() {
    const root = document.getElementById('setup-builder-root');
    if (!root) return;

    // State
    const state = {
      shootingType: 'Interview',
      studioSize: 'Medium',
      desiredLook: 'Cinematic'
    };

    // Check query params if any
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('setup')) {
      const found = window.LUMORA_DATA?.setups?.find(s => s.id === urlParams.get('setup'));
      if (found) {
        state.shootingType = found.shootingType;
        state.studioSize = found.studioSize;
        state.desiredLook = found.desiredLook;
      }
    }

    function findMatchingSetup() {
      const setups = window.LUMORA_DATA?.setups || [];
      // Try exact match on shootingType
      let match = setups.find(s => s.shootingType.toLowerCase() === state.shootingType.toLowerCase());
      if (!match) {
        match = setups[0];
      }
      return match;
    }

    function renderStudioFloorplan(setup) {
      const diagram = setup.diagram || {
        subject: { x: 50, y: 50 },
        lights: [
          { name: "Key Light", x: 75, y: 70, angle: 225, color: "#f59e0b" },
          { name: "Fill Light", x: 25, y: 65, angle: 315, color: "#9ca3af" }
        ]
      };

      let lightsHtml = diagram.lights.map((light, idx) => {
        return `
          <div class="light-node" style="top: ${light.y}%; left: ${light.x}%;">
            <div class="light-node-icon" style="border-color: ${light.color}; color: ${light.color};">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="transform: rotate(${light.angle}deg);">
                <polygon points="12 2 15 8 9 8 12 2"/>
                <circle cx="12" cy="14" r="5"/>
                <line x1="12" y1="19" x2="12" y2="23"/>
              </svg>
            </div>
            <span class="light-node-label">${light.name}</span>
          </div>
        `;
      }).join('');

      return `
        <div class="studio-canvas-container" id="studio-floorplan-canvas">
          <div class="studio-grid-lines"></div>
          
          <!-- Subject Node -->
          <div class="subject-node" style="top: ${diagram.subject.y}%; left: ${diagram.subject.x}%;">
            <div class="subject-node-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
            </div>
            <span class="light-node-label" style="background: var(--bg-elevated); color: var(--accent);">Subject / Camera Axis</span>
          </div>

          <!-- Lights -->
          ${lightsHtml}

          <!-- Studio Dimensions Legend -->
          <div style="position: absolute; bottom: 12px; left: 12px; font-family: var(--font-mono); font-size: 0.72rem; color: var(--text-muted); background: var(--bg-glass); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border-subtle);">
            Stage Scale: ${state.studioSize} Room (${state.studioSize === 'Small' ? '4m × 4m' : state.studioSize === 'Medium' ? '8m × 6m' : '14m × 10m'})
          </div>
        </div>
      `;
    }

    function renderWorkflowUI() {
      const setup = findMatchingSetup();
      const user = window.LumoraAuth?.getUser();
      const isSaved = window.LumoraBookmarks?.isSaved(setup.id, 'setups');

      root.innerHTML = `
        <div class="setup-builder-grid">
          
          <!-- Left: Parameter Selectors -->
          <div class="card setup-configurator-card" style="padding: var(--space-6); display: flex; flex-direction: column; gap: var(--space-5);">
            <div style="border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-4);">
              <span class="eyebrow">Studio System Configurator</span>
              <h2 style="font-size: 1.35rem; margin-top: 4px;">Define Parameters</h2>
              <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
                Select your production constraints to generate an optimized lighting plan.
              </p>
            </div>

            <!-- Shooting Type -->
            <div class="form-group">
              <label class="form-label" for="param-shooting-type">1. Production / Shooting Type</label>
              <select class="form-select" id="param-shooting-type">
                ${['Interview', 'Portrait', 'Fashion', 'Product', 'YouTube', 'Cinematic'].map(type => `
                  <option value="${type}" ${state.shootingType === type ? 'selected' : ''}>${type}</option>
                `).join('')}
              </select>
            </div>

            <!-- Studio Size -->
            <div class="form-group">
              <label class="form-label">2. Studio Footprint</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px;">
                ${['Small', 'Medium', 'Large'].map(sz => `
                  <button type="button" class="btn btn-sm ${state.studioSize === sz ? 'btn-primary' : 'btn-secondary'}" data-size-btn="${sz}">
                    ${sz}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Desired Look -->
            <div class="form-group">
              <label class="form-label" for="param-desired-look">3. Visual Mood / Contrast Look</label>
              <select class="form-select" id="param-desired-look">
                ${['Soft', 'Dramatic', 'Natural', 'High Contrast', 'Cinematic', 'Clean Commercial'].map(lk => `
                  <option value="${lk}" ${state.desiredLook === lk ? 'selected' : ''}>${lk}</option>
                `).join('')}
              </select>
            </div>

            <!-- Save / Export Action -->
            <div style="margin-top: auto; padding-top: var(--space-4); border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: var(--space-3);">
              <button 
                type="button" 
                class="btn ${isSaved ? 'btn-secondary' : 'btn-primary'} btn-lg" 
                id="lumora-save-setup-btn"
                style="width: 100%;"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                <span>${isSaved ? 'Setup Saved in Collection' : 'Save This Lighting Setup'}</span>
              </button>
              
              ${!user ? `
                <p style="font-size: 0.78rem; color: var(--text-muted); text-align: center;">
                  <a href="login.html" style="color: var(--accent); text-decoration: underline;">Sign in</a> to sync custom blueprints across your devices.
                </p>
              ` : `
                <p style="font-size: 0.78rem; color: var(--status-success); text-align: center; display: flex; align-items: center; justify-content: center; gap: 4px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
                  Logged in as ${user.name}
                </p>
              `}
            </div>
          </div>

          <!-- Right: Dynamic Blueprint & Bill of Materials -->
          <div class="setup-main-content-col" style="display: flex; flex-direction: column; gap: var(--space-6); min-width: 0; width: 100%;">
            
            <!-- Setup Header Card -->
            <div class="card card-tech" style="padding: var(--space-6);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: var(--space-3); margin-bottom: var(--space-3);">
                <div>
                  <div style="display: flex; gap: 6px; margin-bottom: 6px;">
                    <span class="badge badge-accent">${setup.category} Setup</span>
                    <span class="badge">${setup.difficulty} Level</span>
                    <span class="badge">${setup.equipmentCount} Fixtures</span>
                  </div>
                  <h3 style="font-size: 1.5rem;">${setup.title}</h3>
                </div>
                <button type="button" class="btn btn-outline btn-sm" id="lumora-print-blueprint-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
                  Export Specs
                </button>
              </div>
              <p style="color: var(--text-secondary); line-height: 1.6;">${setup.purpose}</p>
            </div>

            <!-- 2D Top-Down Interactive Studio Canvas -->
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
                <h4 style="font-size: 1rem; font-family: var(--font-heading); color: var(--text-primary);">
                  Top-Down Placement Blueprint
                </h4>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">2D Overhead Coordinate Grid</span>
              </div>
              ${renderStudioFloorplan(setup)}
            </div>

            <!-- Detailed Equipment Breakdown Roles -->
            <div>
              <h4 style="font-size: 1rem; font-family: var(--font-heading); color: var(--text-primary); margin-bottom: var(--space-3);">
                Recommended Gear List & Settings
              </h4>
              <div class="setup-gear-list-grid" id="setup-gear-list-grid">
                
                ${setup.keyLight ? `
                  <div class="card" style="padding: var(--space-4); border-left: 3px solid var(--accent);">
                    <span class="badge badge-accent" style="margin-bottom: 6px;">${setup.keyLight.role}</span>
                    <h5 style="font-size: 1rem; margin-bottom: 4px;">${setup.keyLight.item}</h5>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">Modifier: <strong>${setup.keyLight.modifier}</strong></p>
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: var(--bg-tertiary); padding: 6px; border-radius: 4px;">
                      ⚙ Settings: ${setup.keyLight.power}<br>
                      📍 Position: ${setup.keyLight.position}
                    </div>
                  </div>
                ` : ''}

                ${setup.fillLight ? `
                  <div class="card" style="padding: var(--space-4); border-left: 3px solid #9ca3af;">
                    <span class="badge" style="margin-bottom: 6px;">${setup.fillLight.role}</span>
                    <h5 style="font-size: 1rem; margin-bottom: 4px;">${setup.fillLight.item}</h5>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">Modifier: <strong>${setup.fillLight.modifier}</strong></p>
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: var(--bg-tertiary); padding: 6px; border-radius: 4px;">
                      ⚙ Settings: ${setup.fillLight.power}<br>
                      📍 Position: ${setup.fillLight.position}
                    </div>
                  </div>
                ` : ''}

                ${setup.rimLight ? `
                  <div class="card" style="padding: var(--space-4); border-left: 3px solid #3b82f6;">
                    <span class="badge" style="margin-bottom: 6px;">${setup.rimLight.role}</span>
                    <h5 style="font-size: 1rem; margin-bottom: 4px;">${setup.rimLight.item}</h5>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">Modifier: <strong>${setup.rimLight.modifier}</strong></p>
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: var(--bg-tertiary); padding: 6px; border-radius: 4px;">
                      ⚙ Settings: ${setup.rimLight.power}<br>
                      📍 Position: ${setup.rimLight.position}
                    </div>
                  </div>
                ` : ''}

                ${setup.backgroundLight ? `
                  <div class="card" style="padding: var(--space-4); border-left: 3px solid #10b981;">
                    <span class="badge" style="margin-bottom: 6px;">${setup.backgroundLight.role}</span>
                    <h5 style="font-size: 1rem; margin-bottom: 4px;">${setup.backgroundLight.item}</h5>
                    <p style="font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 6px;">Modifier: <strong>${setup.backgroundLight.modifier}</strong></p>
                    <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted); background: var(--bg-tertiary); padding: 6px; border-radius: 4px;">
                      ⚙ Settings: ${setup.backgroundLight.power}<br>
                      📍 Position: ${setup.backgroundLight.position}
                    </div>
                  </div>
                ` : ''}
              </div>
            </div>
          </div>
        </div>
      `;

      // Attach interaction events
      const shootingSelect = document.getElementById('param-shooting-type');
      shootingSelect?.addEventListener('change', (e) => {
        state.shootingType = e.target.value;
        renderWorkflowUI();
      });

      const lookSelect = document.getElementById('param-desired-look');
      lookSelect?.addEventListener('change', (e) => {
        state.desiredLook = e.target.value;
        renderWorkflowUI();
      });

      root.querySelectorAll('[data-size-btn]').forEach(btn => {
        btn.addEventListener('click', () => {
          state.studioSize = btn.getAttribute('data-size-btn');
          renderWorkflowUI();
        });
      });

      document.getElementById('lumora-save-setup-btn')?.addEventListener('click', () => {
        window.LumoraBookmarks?.toggle(setup.id, 'setups', setup.title);
        renderWorkflowUI();
      });

      document.getElementById('lumora-print-blueprint-btn')?.addEventListener('click', () => {
        window.print();
      });
    }

    renderWorkflowUI();
  }

  document.addEventListener('DOMContentLoaded', initSetupBuilder);
})();
