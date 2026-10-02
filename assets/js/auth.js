/**
 * LUMORA STUDIO — AUTHENTICATION & SESSION MANAGER
 * Front-end simulation of authenticated session state with localStorage persistence.
 */

(function () {
  'use strict';

  const SESSION_KEY = 'lumora_user_session_v1';

  function getCurrentUser() {
    try {
      const data = localStorage.getItem(SESSION_KEY);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Error reading session', e);
      return null;
    }
  }

  function setSession(user) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      updateAuthUI();
      window.dispatchEvent(new CustomEvent('lumora:auth-state-changed', { detail: user }));
    } catch (e) {
      console.error('Error setting session', e);
    }
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    updateAuthUI();
    window.dispatchEvent(new CustomEvent('lumora:auth-state-changed', { detail: null }));
    window.LumoraBookmarks?.showToast('Signed out of Lumora Studio', 'info');
  }

  function login(email, password) {
    // Front-end simulation
    const name = email.split('@')[0];
    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
    
    const user = {
      id: 'usr_' + Date.now().toString(36),
      name: formattedName || 'Studio Creator',
      email: email,
      role: 'Lighting Designer / Filmmaker',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80`,
      joined: 'October 2026'
    };

    setSession(user);
    window.LumoraBookmarks?.showToast(`Welcome back, ${user.name}`, 'success');
    return user;
  }

  function signup(name, email, password, discipline = 'Cinematography') {
    const user = {
      id: 'usr_' + Date.now().toString(36),
      name: name,
      email: email,
      role: discipline || 'Visual Artist',
      avatar: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80`,
      joined: 'October 2026'
    };

    setSession(user);
    window.LumoraBookmarks?.showToast(`Account created. Welcome to Lumora Studio!`, 'success');
    return user;
  }

  function updateAuthUI() {
    const user = getCurrentUser();
    const authContainers = document.querySelectorAll('.user-nav-auth');

    authContainers.forEach(container => {
      if (user) {
        container.innerHTML = `
          <div class="user-profile-menu-wrapper" style="position: relative;">
            <button type="button" class="btn btn-secondary btn-sm" id="lumora-user-menu-btn" style="display: flex; align-items: center; gap: 8px;">
              <span style="width: 22px; height: 22px; border-radius: 50%; background: var(--accent); color: #000; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 0.75rem;">
                ${user.name.charAt(0)}
              </span>
              <span style="font-weight: 600;">${user.name}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </button>
            <div class="user-dropdown-popover" id="lumora-user-dropdown" style="display: none; position: absolute; right: 0; top: 100%; margin-top: 8px; width: 220px; background: var(--bg-secondary); border: 1px solid var(--border-medium); border-radius: var(--radius-md); box-shadow: var(--shadow-lg); padding: 8px; z-index: 1200;">
              <div style="padding: 8px; border-bottom: 1px solid var(--border-subtle); margin-bottom: 6px;">
                <p style="font-size: 0.85rem; font-weight: 600; color: var(--text-primary);">${user.name}</p>
                <p style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</p>
              </div>
              <a href="saved.html" style="display: flex; align-items: center; gap: 8px; padding: 8px; font-size: 0.85rem; color: var(--text-secondary); border-radius: 4px; transition: background 0.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
                Saved Collections
              </a>
              <a href="setup-builder.html" style="display: flex; align-items: center; gap: 8px; padding: 8px; font-size: 0.85rem; color: var(--text-secondary); border-radius: 4px; transition: background 0.2s;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/></svg>
                My Lighting Setups
              </a>
              <button type="button" id="lumora-logout-action-btn" style="width: 100%; text-align: left; display: flex; align-items: center; gap: 8px; padding: 8px; font-size: 0.85rem; color: var(--status-danger); border-radius: 4px; margin-top: 4px; border-top: 1px solid var(--border-subtle);">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Sign Out
              </button>
            </div>
          </div>
        `;

        const menuBtn = container.querySelector('#lumora-user-menu-btn');
        const popover = container.querySelector('#lumora-user-dropdown');
        if (menuBtn && popover) {
          menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            popover.style.display = popover.style.display === 'block' ? 'none' : 'block';
          });

          document.addEventListener('click', () => {
            popover.style.display = 'none';
          });
        }

        container.querySelector('#lumora-logout-action-btn')?.addEventListener('click', (e) => {
          e.preventDefault();
          clearSession();
        });

      } else {
        container.innerHTML = `
          <a href="login.html" class="btn btn-ghost btn-sm">Login</a>
          <a href="signup.html" class="btn btn-outline btn-sm">Sign Up</a>
        `;
      }
    });

    // Also update mobile drawer auth block if present
    const mobileAuth = document.getElementById('mobile-drawer-auth');
    if (mobileAuth) {
      if (user) {
        mobileAuth.innerHTML = `
          <div style="padding: 12px; background: var(--bg-tertiary); border-radius: var(--radius-sm); margin-bottom: 8px;">
            <p style="font-weight: 600; color: var(--text-primary);">${user.name}</p>
            <p style="font-size: 0.75rem; color: var(--text-muted);">${user.email}</p>
          </div>
          <button type="button" class="btn btn-secondary btn-sm" id="mobile-logout-btn" style="width: 100%;">Sign Out</button>
        `;
        mobileAuth.querySelector('#mobile-logout-btn')?.addEventListener('click', clearSession);
      } else {
        mobileAuth.innerHTML = `
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <a href="login.html" class="btn btn-secondary btn-sm" style="text-align: center;">Login</a>
            <a href="signup.html" class="btn btn-primary btn-sm" style="text-align: center;">Sign Up</a>
          </div>
        `;
      }
    }
  }

  // Export Global API
  window.LumoraAuth = {
    getUser: getCurrentUser,
    login: login,
    signup: signup,
    logout: clearSession,
    updateUI: updateAuthUI
  };

  document.addEventListener('DOMContentLoaded', () => {
    updateAuthUI();
  });
})();
