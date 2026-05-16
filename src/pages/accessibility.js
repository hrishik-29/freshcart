// Accessibility Settings Page
// HCI: Universal Design (7 principles), Equitable Use, Flexibility in Use,
// Perceptible Information, Tolerance for Error

import { navigate, state, setTheme, setFontSize, setHighContrast, setColorBlind } from '../main.js';

export function renderAccessibility(container) {
    container.innerHTML = `
    <div class="accessibility-page">
      <nav class="breadcrumbs"><a href="#" id="ac-home">Home</a><span>›</span><span class="current">Accessibility</span></nav>
      <h1 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-2);">♿ Accessibility Settings</h1>
      <p style="color:var(--color-text-secondary);margin-bottom:var(--space-8);">Customize your experience. We follow Universal Design principles to make FreshCart usable for everyone.</p>

      <!-- Font Size - Universal Design: Flexibility in Use -->
      <div class="setting-group">
        <h3>🔤 Font Size</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">Adjust text size for better readability (Universal Design: Flexibility in Use)</p>
        <div class="setting-row">
          <div><div class="setting-label">Text Size: <strong id="font-size-label">${Math.round(state.fontSize * 100)}%</strong></div></div>
          <input type="range" class="range-slider" id="font-slider" min="0.8" max="1.5" step="0.1" value="${state.fontSize}" aria-label="Font size adjustment" />
        </div>
        <div style="display:flex;justify-content:space-between;font-size:var(--font-size-xs);color:var(--color-text-muted);margin-top:var(--space-1);">
          <span>Small</span><span>Default</span><span>Large</span>
        </div>
      </div>

      <!-- Display Theme - Universal Design: Equitable Use -->
      <div class="setting-group">
        <h3>🎨 Display Theme</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">Choose a theme that works best for you</p>
        <div class="setting-row">
          <div><div class="setting-label">Dark Mode</div><div class="setting-desc">Reduces eye strain in low-light environments</div></div>
          <div class="toggle-switch ${state.theme === 'dark' ? 'active' : ''}" id="dark-toggle" role="switch" aria-checked="${state.theme === 'dark'}" tabindex="0"></div>
        </div>
      </div>

      <!-- High Contrast - Universal Design: Perceptible Information -->
      <div class="setting-group">
        <h3>🔲 High Contrast</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">Increases contrast for better text visibility (Universal Design: Perceptible Information)</p>
        <div class="setting-row">
          <div><div class="setting-label">High Contrast Mode</div><div class="setting-desc">Maximum contrast between text and background</div></div>
          <div class="toggle-switch ${state.highContrast ? 'active' : ''}" id="contrast-toggle" role="switch" aria-checked="${state.highContrast}" tabindex="0"></div>
        </div>
      </div>

      <!-- Color Blind - Universal Design: Equitable Use -->
      <div class="setting-group">
        <h3>👁️ Color Vision</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">Adapts colors for color vision deficiency (Universal Design: Equitable Use)</p>
        <div class="setting-row">
          <div><div class="setting-label">Color Blind Friendly Mode</div><div class="setting-desc">Uses distinguishable colors for all visual indicators</div></div>
          <div class="toggle-switch ${state.colorBlind ? 'active' : ''}" id="colorblind-toggle" role="switch" aria-checked="${state.colorBlind}" tabindex="0"></div>
        </div>
      </div>

      <!-- Keyboard Navigation -->
      <div class="setting-group">
        <h3>⌨️ Keyboard Navigation</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--space-4);">All features are accessible via keyboard</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-3);">
          ${[
            { key: 'H', action: 'Go to Home' },
            { key: 'S', action: 'Go to Search' },
            { key: 'C', action: 'Go to Cart' },
            { key: 'P', action: 'Go to Profile' },
            { key: '/', action: 'Focus Search Bar' },
            { key: '?', action: 'Show All Shortcuts' },
            { key: 'Tab', action: 'Next Element' },
            { key: 'Esc', action: 'Close Popup' },
        ].map(s => `
            <div class="shortcut-item">
              <span class="shortcut-key">${s.key}</span>
              <span style="font-size:var(--font-size-sm);">${s.action}</span>
            </div>`).join('')}
        </div>
      </div>

      <!-- Screen Reader Info -->
      <div class="setting-group">
        <h3>📢 Screen Reader Support</h3>
        <p style="font-size:var(--font-size-sm);color:var(--color-text-secondary);">
          FreshCart is designed with ARIA landmarks, labels, and roles for screen reader compatibility. 
          All interactive elements have descriptive labels, and important updates are announced via live regions.
        </p>
        <ul style="font-size:var(--font-size-sm);color:var(--color-text-secondary);padding-left:var(--space-5);margin-top:var(--space-3);">
          <li>Skip-to-content link available (Tab at page top)</li>
          <li>All images have alt text descriptions</li>
          <li>Form fields have associated labels</li>
          <li>Cart updates announced via ARIA live regions</li>
          <li>Semantic HTML5 structure throughout</li>
        </ul>
      </div>
    </div>`;

    // Events
    container.querySelector('#ac-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });

    container.querySelector('#font-slider')?.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        setFontSize(val);
        container.querySelector('#font-size-label').textContent = Math.round(val * 100) + '%';
    });

    container.querySelector('#dark-toggle')?.addEventListener('click', function () {
        this.classList.toggle('active');
        setTheme(this.classList.contains('active') ? 'dark' : 'light');
        document.getElementById('theme-icon').textContent = state.theme === 'dark' ? '☀️' : '🌙';
    });

    container.querySelector('#contrast-toggle')?.addEventListener('click', function () {
        this.classList.toggle('active');
        setHighContrast(this.classList.contains('active'));
    });

    container.querySelector('#colorblind-toggle')?.addEventListener('click', function () {
        this.classList.toggle('active');
        setColorBlind(this.classList.contains('active'));
    });
}
