// Navbar Component - Persistent Navigation
// HCI: Web Usability (logo linked to home), Mental Models (familiar layout),
// Recognition over Recall (search autocomplete), Miller's 7±2 (limited nav items)

import { navigate, state, getCartCount } from '../main.js';
import { products, categories } from '../data/products.js';

export function renderNavbar(container) {
  const cartCount = getCartCount();
  container.innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <div class="navbar-inner">
        <a href="#" class="navbar-logo" id="logo-link" aria-label="FreshCart Home">
          <span class="logo-icon">🛒</span>
          <span>Fresh<span style="color:var(--color-primary-400)">Cart</span></span>
        </a>

        <div class="navbar-search" role="search">
          <span class="search-icon" aria-hidden="true">🔍</span>
          <input type="text" id="nav-search" placeholder="Search for groceries..." 
                 aria-label="Search products" autocomplete="off" />
          <div class="search-autocomplete" id="search-dropdown" role="listbox"></div>
        </div>

        <div class="navbar-actions">
          <button class="nav-btn" id="nav-help" aria-label="Help" title="Help">
            <span>❓</span><span class="nav-label">Help</span>
          </button>
          <button class="nav-btn" id="nav-profile" aria-label="Profile" title="Profile">
            <span>👤</span><span class="nav-label">Account</span>
          </button>
          <button class="nav-btn" id="nav-cart" aria-label="Cart" title="Cart">
            <span>🛒</span><span class="nav-label">Cart</span>
            <span class="cart-badge" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
          </button>
          <button class="nav-btn" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
            <span id="theme-icon">${state.theme === 'dark' ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Bottom Navigation for Mobile (Serial Position Effect: Home first, Account last) -->
    <div class="bottom-nav" aria-label="Mobile navigation">
      <div class="bottom-nav-inner">
        <a href="#" class="bottom-nav-item active" data-page="home">
          <span class="icon">🏠</span>Home
        </a>
        <a href="#" class="bottom-nav-item" data-page="search">
          <span class="icon">🔍</span>Search
        </a>
        <a href="#" class="bottom-nav-item" data-page="cart">
          <span class="icon">🛒</span>Cart
        </a>
        <a href="#" class="bottom-nav-item" data-page="help">
          <span class="icon">❓</span>Help
        </a>
        <a href="#" class="bottom-nav-item" data-page="profile">
          <span class="icon">👤</span>Account
        </a>
      </div>
    </div>`;

  // Event Listeners
  container.querySelector('#logo-link').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
  container.querySelector('#nav-cart').addEventListener('click', () => navigate('cart'));
  container.querySelector('#nav-profile').addEventListener('click', () => navigate('profile'));
  container.querySelector('#nav-help').addEventListener('click', () => navigate('help'));

  // Theme toggle
  container.querySelector('#theme-toggle').addEventListener('click', () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    import('../main.js').then(m => m.setTheme(newTheme));
    document.getElementById('theme-icon').textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // Search autocomplete (Recognition over Recall)
  const searchInput = container.querySelector('#nav-search');
  const dropdown = container.querySelector('#search-dropdown');

  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (q.length < 2) { dropdown.classList.remove('active'); return; }

    const results = products.filter(p =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.category.toLowerCase().includes(q.toLowerCase())
    ).slice(0, 6); // Miller's 7±2

    const catResults = categories.filter(c => c.name.toLowerCase().includes(q.toLowerCase()));

    if (results.length === 0 && catResults.length === 0) {
      dropdown.classList.remove('active'); return;
    }

    dropdown.innerHTML =
      catResults.map(c => `<div class="search-autocomplete-item" data-type="cat" data-id="${c.id}">
        <span>${c.icon}</span><span>${c.name}</span><span style="color:var(--color-text-muted);font-size:12px">${c.count} items</span>
      </div>`).join('') +
      results.map(p => `<div class="search-autocomplete-item" data-type="product" data-id="${p.id}">
        <span>🏷️</span><span>${p.name}</span><span style="color:var(--color-text-muted);font-size:12px">₹${p.price}</span>
      </div>`).join('');

    dropdown.classList.add('active');
  });

  dropdown.addEventListener('click', (e) => {
    const item = e.target.closest('.search-autocomplete-item');
    if (!item) return;
    if (item.dataset.type === 'cat') {
      state.selectedCategory = item.dataset.id;
      state.searchQuery = '';
      navigate('search');
    } else {
      navigate('product-detail', { id: item.dataset.id });
    }
    dropdown.classList.remove('active');
    searchInput.value = '';
  });

  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      state.searchQuery = searchInput.value.trim();
      state.selectedCategory = '';
      navigate('search');
      dropdown.classList.remove('active');
    }
    if (e.key === 'Escape') { dropdown.classList.remove('active'); searchInput.blur(); }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-search')) dropdown.classList.remove('active');
  });

  // Bottom nav
  container.querySelectorAll('.bottom-nav-item').forEach(item => {
    item.addEventListener('click', (e) => { e.preventDefault(); navigate(item.dataset.page); });
  });
}
