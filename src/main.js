// FreshCart - Main Application Entry Point
// SPA Router, Global State, Keyboard Shortcuts (Shneiderman's Shortcut Rule)

import { renderNavbar } from './components/navbar.js';
import { renderFooter } from './components/footer.js';
import { renderChatbot } from './components/chatbot.js';
import { showToast } from './components/toast.js';
import { renderHome } from './pages/home.js';
import { renderSearch } from './pages/search.js';
import { renderProductDetail } from './pages/product-detail.js';
import { renderCart } from './pages/cart.js';
import { renderCheckout } from './pages/checkout.js';
import { renderOrderTracking } from './pages/order-tracking.js';
import { renderProfile } from './pages/profile.js';
import { renderHelp } from './pages/help.js';
import { renderAccessibility } from './pages/accessibility.js';

// ---- Global State (Cart persisted via localStorage - Asimov's 1st Law) ----
export const state = {
  cart: JSON.parse(localStorage.getItem('freshcart-cart') || '[]'),
  currentPage: 'home',
  theme: localStorage.getItem('freshcart-theme') || 'light',
  fontSize: parseFloat(localStorage.getItem('freshcart-fontsize') || '1'),
  highContrast: localStorage.getItem('freshcart-contrast') === 'true',
  colorBlind: localStorage.getItem('freshcart-colorblind') === 'true',
  searchQuery: '',
  selectedCategory: '',
  lastOrder: null,
};

// ---- Cart Functions ----
export function addToCart(product, qty = 1) {
  const existing = state.cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += qty;
  } else {
    state.cart.push({ ...product, qty });
  }
  saveCart();
  updateCartBadge();
  showToast('success', 'Added to cart', `${product.name} added successfully!`);
}

export function removeFromCart(productId) {
  const item = state.cart.find(i => i.id === productId);
  state.cart = state.cart.filter(i => i.id !== productId);
  saveCart();
  updateCartBadge();
  if (item) {
    showToast('info', 'Removed from cart', `${item.name} removed.`, {
      actionText: 'UNDO',
      actionFn: () => { addToCart(item, item.qty); if (state.currentPage === 'cart') renderCart(); }
    });
  }
}

export function updateCartQty(productId, qty) {
  const item = state.cart.find(i => i.id === productId);
  if (item) {
    if (qty <= 0) {
      removeFromCart(productId);
    } else {
      item.qty = qty;
      saveCart();
      updateCartBadge();
    }
  }
}

export function getCartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
}

export function getCartSavings() {
  return state.cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.qty), 0);
}

export function getCartCount() {
  return state.cart.reduce((sum, item) => sum + item.qty, 0);
}

function saveCart() {
  localStorage.setItem('freshcart-cart', JSON.stringify(state.cart));
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-badge');
  const count = getCartCount();
  badges.forEach(badge => {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
    badge.classList.remove('bounce');
    void badge.offsetWidth; // trigger reflow
    badge.classList.add('bounce');
  });
}

// ---- Router ----
const routes = {
  home: renderHome,
  search: renderSearch,
  'product-detail': renderProductDetail,
  cart: renderCart,
  checkout: renderCheckout,
  'order-tracking': renderOrderTracking,
  profile: renderProfile,
  help: renderHelp,
  accessibility: renderAccessibility,
};

export function navigate(page, params = {}) {
  state.currentPage = page;

  // Show loading bar
  const loadingBar = document.querySelector('.loading-bar');
  if (loadingBar) { loadingBar.classList.add('active'); }

  const container = document.getElementById('page-container');
  container.style.opacity = '0';

  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const renderFn = routes[page];
    if (renderFn) {
      renderFn(container, params);
    } else {
      container.innerHTML = '<div class="container" style="padding:4rem 0;text-align:center;"><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p></div>';
    }
    container.style.opacity = '1';
    if (loadingBar) { setTimeout(() => loadingBar.classList.remove('active'), 300); }

    // Update active nav states
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.page === page);
    });

    // Focus management for accessibility
    const main = document.getElementById('main-content');
    if (main) main.focus();
  }, 150);
}

// ---- Theme & Accessibility ----
export function setTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('freshcart-theme', theme);
}

export function setFontSize(scale) {
  state.fontSize = scale;
  document.documentElement.style.setProperty('--font-scale', scale);
  localStorage.setItem('freshcart-fontsize', scale);
}

export function setHighContrast(enabled) {
  state.highContrast = enabled;
  document.documentElement.setAttribute('data-contrast', enabled ? 'high' : 'normal');
  localStorage.setItem('freshcart-contrast', enabled);
}

export function setColorBlind(enabled) {
  state.colorBlind = enabled;
  document.documentElement.setAttribute('data-colorblind', enabled);
  localStorage.setItem('freshcart-colorblind', enabled);
}

// ---- Keyboard Shortcuts (Shneiderman: Enable Shortcuts for Frequent Users) ----
function initKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Don't trigger shortcuts when typing in inputs
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    if (e.key === '?' && e.shiftKey) {
      e.preventDefault();
      showShortcutsModal();
    }
    if (e.key === 'h' || e.key === 'H') { e.preventDefault(); navigate('home'); }
    if (e.key === 's' || e.key === 'S') { e.preventDefault(); navigate('search'); setTimeout(() => { const searchInput = document.querySelector('.navbar-search input') || document.querySelector('.hero-search input'); if (searchInput) searchInput.focus(); }, 200); }
    if (e.key === 'c' || e.key === 'C') { e.preventDefault(); navigate('cart'); }
    if (e.key === 'p' || e.key === 'P') { e.preventDefault(); navigate('profile'); }
    if (e.key === '/' || e.key === 'F3') { e.preventDefault(); const searchInput = document.querySelector('.navbar-search input'); if (searchInput) searchInput.focus(); }
  });
}

function showShortcutsModal() {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = `
    <div class="modal-overlay open" id="shortcuts-modal">
      <div class="modal-box" style="max-width:500px;">
        <h3>⌨️ Keyboard Shortcuts</h3>
        <p style="margin-bottom:var(--space-4);">Navigate faster with these shortcuts:</p>
        <div class="shortcuts-grid">
          <div class="shortcut-item"><span class="shortcut-key">H</span> Home</div>
          <div class="shortcut-item"><span class="shortcut-key">S</span> Search</div>
          <div class="shortcut-item"><span class="shortcut-key">C</span> Cart</div>
          <div class="shortcut-item"><span class="shortcut-key">P</span> Profile</div>
          <div class="shortcut-item"><span class="shortcut-key">/</span> Focus Search</div>
          <div class="shortcut-item"><span class="shortcut-key">?</span> Shortcuts</div>
        </div>
        <div class="modal-actions" style="margin-top:var(--space-6);">
          <button class="btn btn-primary" onclick="document.getElementById('shortcuts-modal').remove()">Got it!</button>
        </div>
      </div>
    </div>`;
  modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) modal.innerHTML = '';
  });
}

// ---- Init ----
function init() {
  // Apply saved preferences
  setTheme(state.theme);
  setFontSize(state.fontSize);
  setHighContrast(state.highContrast);
  setColorBlind(state.colorBlind);

  // Add loading bar
  const loadingBar = document.createElement('div');
  loadingBar.className = 'loading-bar';
  document.body.appendChild(loadingBar);

  // Render shell
  renderNavbar(document.getElementById('navbar-container'));
  renderFooter(document.getElementById('footer-container'));
  renderChatbot(document.getElementById('chatbot-container'));

  // Render initial page
  navigate('home');

  // Init keyboard shortcuts
  initKeyboardShortcuts();

  // Update cart badge on init
  updateCartBadge();

  // Page transition style
  const container = document.getElementById('page-container');
  container.style.transition = 'opacity 0.15s ease';
}

document.addEventListener('DOMContentLoaded', init);
