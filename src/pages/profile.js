// Profile Page
// HCI: Locus of Control, Flexibility, Personalization, Form Fill-in

import { navigate, state, setTheme } from '../main.js';

export function renderProfile(container) {
    const user = { name: 'Hrishik Reddy', email: 'hrishik@example.com', phone: '9876543210' };

    container.innerHTML = `
    <div class="container profile-page">
      <nav class="breadcrumbs"><a href="#" id="pf-home">Home</a><span>›</span><span class="current">My Account</span></nav>
      
      <div class="profile-grid">
        <div class="profile-sidebar">
          <div class="profile-avatar">HR</div>
          <h3 style="margin-bottom:var(--space-1);">${user.name}</h3>
          <p style="font-size:var(--font-size-sm);color:var(--color-text-muted);">${user.email}</p>
          <nav class="profile-nav">
            <button class="profile-nav-item active" data-tab="info">👤 Personal Info</button>
            <button class="profile-nav-item" data-tab="orders">📦 Order History</button>
            <button class="profile-nav-item" data-tab="addresses">📍 Saved Addresses</button>
            <button class="profile-nav-item" data-tab="preferences">⚙️ Preferences</button>
            <button class="profile-nav-item" data-tab="accessibility" id="pf-acc">♿ Accessibility</button>
          </nav>
        </div>

        <div class="profile-content" id="profile-tab-content">
          <!-- Default: Personal Info -->
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-6);">👤 Personal Information</h2>
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" value="${user.name}" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Email</label>
              <input type="email" value="${user.email}" />
            </div>
            <div class="form-group">
              <label>Phone</label>
              <input type="tel" value="${user.phone}" />
            </div>
          </div>
          <div class="form-group">
            <label>Dietary Preferences</label>
            <div style="display:flex;gap:var(--space-2);flex-wrap:wrap;margin-top:var(--space-2);">
              ${['Vegetarian', 'Vegan', 'Gluten-Free', 'Organic Only', 'No Preference'].map(p =>
        `<button class="filter-chip" data-pref="${p}">${p}</button>`
    ).join('')}
            </div>
          </div>
          <button class="btn btn-primary" style="margin-top:var(--space-4);">Save Changes</button>
        </div>
      </div>
    </div>`;

    // Navigation
    container.querySelector('#pf-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
    container.querySelector('#pf-acc')?.addEventListener('click', () => navigate('accessibility'));

    // Tab switching
    const tabContent = container.querySelector('#profile-tab-content');
    container.querySelectorAll('.profile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
            container.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const tab = item.dataset.tab;

            if (tab === 'info') {
                tabContent.innerHTML = `
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-6);">👤 Personal Information</h2>
          <div class="form-group"><label>Full Name</label><input type="text" value="${user.name}" /></div>
          <div class="form-row"><div class="form-group"><label>Email</label><input type="email" value="${user.email}" /></div><div class="form-group"><label>Phone</label><input type="tel" value="${user.phone}" /></div></div>
          <button class="btn btn-primary" style="margin-top:var(--space-4);">Save Changes</button>`;
            } else if (tab === 'orders') {
                tabContent.innerHTML = `
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-6);">📦 Order History</h2>
          ${[
                        { id: 'FC892341', date: 'Apr 18, 2026', items: 5, total: 847, status: 'Delivered' },
                        { id: 'FC891023', date: 'Apr 15, 2026', items: 3, total: 432, status: 'Delivered' },
                        { id: 'FC889912', date: 'Apr 10, 2026', items: 8, total: 1245, status: 'Delivered' },
                    ].map(o => `
            <div style="display:flex;align-items:center;justify-content:space-between;padding:var(--space-4);border:1px solid var(--color-border);border-radius:var(--radius-lg);margin-bottom:var(--space-3);">
              <div>
                <div style="font-weight:600;">Order #${o.id}</div>
                <div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">${o.date} • ${o.items} items</div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:600;">₹${o.total}</div>
                <div style="font-size:var(--font-size-xs);color:var(--color-primary-600);font-weight:600;">✓ ${o.status}</div>
              </div>
            </div>`).join('')}`;
            } else if (tab === 'addresses') {
                tabContent.innerHTML = `
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-6);">📍 Saved Addresses</h2>
          <div style="border:1px solid var(--color-border);border-radius:var(--radius-lg);padding:var(--space-4);margin-bottom:var(--space-3);">
            <div style="display:flex;justify-content:space-between;margin-bottom:var(--space-2);">
              <span style="font-weight:600;">🏠 Home</span>
              <span style="font-size:var(--font-size-xs);background:var(--color-primary-100);color:var(--color-primary-700);padding:2px 8px;border-radius:var(--radius-full);">Default</span>
            </div>
            <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);">123, MG Road, Koramangala<br/>Bangalore - 560034<br/>Phone: 9876543210</p>
          </div>
          <button class="btn btn-outline btn-full">+ Add New Address</button>`;
            } else if (tab === 'preferences') {
                tabContent.innerHTML = `
          <h2 style="font-size:var(--font-size-xl);margin-bottom:var(--space-6);">⚙️ Preferences</h2>
          <div class="setting-group">
            <h3>🎨 Appearance</h3>
            <div class="setting-row">
              <div><div class="setting-label">Dark Mode</div><div class="setting-desc">Switch between light and dark theme</div></div>
              <div class="toggle-switch ${state.theme === 'dark' ? 'active' : ''}" id="pref-dark" role="switch" aria-checked="${state.theme === 'dark'}" tabindex="0"></div>
            </div>
          </div>
          <div class="setting-group">
            <h3>🔔 Notifications</h3>
            <div class="setting-row">
              <div><div class="setting-label">Order Updates</div><div class="setting-desc">Get notified about order status</div></div>
              <div class="toggle-switch active" role="switch" aria-checked="true" tabindex="0"></div>
            </div>
            <div class="setting-row">
              <div><div class="setting-label">Deal Alerts</div><div class="setting-desc">Get notified about new deals</div></div>
              <div class="toggle-switch active" role="switch" aria-checked="true" tabindex="0"></div>
            </div>
          </div>`;
                tabContent.querySelector('#pref-dark')?.addEventListener('click', function () {
                    this.classList.toggle('active');
                    setTheme(this.classList.contains('active') ? 'dark' : 'light');
                    document.getElementById('theme-icon').textContent = state.theme === 'dark' ? '☀️' : '🌙';
                });
                tabContent.querySelectorAll('.toggle-switch:not(#pref-dark)').forEach(sw => {
                    sw.addEventListener('click', function () { this.classList.toggle('active'); });
                });
            } else if (tab === 'accessibility') {
                navigate('accessibility');
            }
        });
    });

    // Dietary prefs
    container.querySelectorAll('[data-pref]').forEach(btn => {
        btn.addEventListener('click', function () { this.classList.toggle('active'); });
    });
}
