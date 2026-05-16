// Cart Page
// HCI: Visibility of System Status, Closure, Asimov's 1st Law (persistence), 
// Easy Reversal (undo), Error Prevention, Feedback

import { navigate, state, updateCartQty, removeFromCart, getCartTotal, getCartSavings, getCartCount } from '../main.js';
import { showToast } from '../components/toast.js';

export function renderCart(container) {
  function render() {
    if (state.cart.length === 0) {
      container.innerHTML = `
        <div class="container cart-page">
          <div class="cart-empty">
            <div class="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p style="color:var(--color-text-secondary);margin-bottom:var(--space-6);">Looks like you haven't added anything yet. Start shopping!</p>
            <button class="btn btn-primary btn-lg" id="start-shopping">🛍️ Start Shopping</button>
          </div>
        </div>`;
      container.querySelector('#start-shopping')?.addEventListener('click', () => navigate('home'));
      return;
    }

    const total = getCartTotal();
    const savings = getCartSavings();
    const delivery = total >= 299 ? 0 : 40;

    container.innerHTML = `
      <div class="container cart-page">
        <nav class="breadcrumbs"><a href="#" id="cart-home">Home</a><span>›</span><span class="current">Cart (${getCartCount()} items)</span></nav>
        <h1 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-6);">🛒 Your Cart</h1>
        <div class="cart-layout">
          <div class="cart-items">
            ${state.cart.map(item => `
              <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-img">
                  <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'" />
                </div>
                <div class="cart-item-info">
                  <div class="item-name">${item.name}</div>
                  <div class="item-weight">${item.weight}</div>
                  <div style="display:flex;align-items:center;gap:var(--space-3);margin-top:var(--space-2);">
                    <div class="qty-control" style="display:flex;flex-direction:row;align-items:center;border:1.5px solid var(--color-primary-500);border-radius:var(--radius-md);overflow:hidden;">
                      <button class="qty-dec" data-id="${item.id}" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--color-primary-50);color:var(--color-primary-700);font-weight:700;border:none;cursor:pointer;font-size:1.1rem;">−</button>
                      <span class="qty-num" style="width:36px;text-align:center;font-weight:600;font-size:1rem;">${item.qty}</span>
                      <button class="qty-inc" data-id="${item.id}" style="width:36px;height:36px;display:flex;align-items:center;justify-content:center;background:var(--color-primary-50);color:var(--color-primary-700);font-weight:700;border:none;cursor:pointer;font-size:1.1rem;">+</button>
                    </div>
                  </div>
                </div>
                <div class="cart-item-price">₹${item.price * item.qty}</div>
                <button class="cart-item-remove" data-id="${item.id}" aria-label="Remove ${item.name}">🗑️</button>
              </div>`).join('')}
          </div>

          <!-- Bill Summary - Visibility of System Status, Transparency -->
          <div class="cart-summary">
            <h3>Bill Summary</h3>
            <div class="summary-row"><span>Subtotal</span><span>₹${total}</span></div>
            <div class="summary-row"><span>Delivery Fee</span><span>${delivery === 0 ? '<span style="color:var(--color-primary-600);font-weight:600;">FREE</span>' : '₹' + delivery}</span></div>
            ${savings > 0 ? `<div class="summary-row savings"><span>You Save</span><span>-₹${savings}</span></div>` : ''}
            ${delivery > 0 ? `<div style="font-size:var(--font-size-xs);color:var(--color-primary-600);margin-top:var(--space-2);">Add ₹${299 - total} more for FREE delivery!</div>` : ''}
            <div class="summary-total"><span>Total</span><span>₹${total + delivery}</span></div>
            <button class="btn btn-primary btn-full btn-lg" id="proceed-checkout" style="margin-top:var(--space-4);">
              Proceed to Checkout →
            </button>
            <button class="btn btn-outline btn-full" id="continue-shopping" style="margin-top:var(--space-3);">
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>`;

    // Events
    container.querySelector('#cart-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
    container.querySelector('#proceed-checkout')?.addEventListener('click', () => navigate('checkout'));
    container.querySelector('#continue-shopping')?.addEventListener('click', () => navigate('search'));

    container.querySelectorAll('.qty-inc').forEach(btn => {
      btn.addEventListener('click', () => { updateCartQty(parseInt(btn.dataset.id), (state.cart.find(i => i.id === parseInt(btn.dataset.id))?.qty || 0) + 1); render(); });
    });
    container.querySelectorAll('.qty-dec').forEach(btn => {
      btn.addEventListener('click', () => { const id = parseInt(btn.dataset.id); const item = state.cart.find(i => i.id === id); if (item && item.qty > 1) { updateCartQty(id, item.qty - 1); render(); } else { removeFromCart(id); render(); } });
    });
    container.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => { removeFromCart(parseInt(btn.dataset.id)); render(); });
    });
  }
  render();
}
