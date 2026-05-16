// Product Detail Page
// HCI: Dual-Coding (image+text), Social Proof, Scarcity, Feedback, Progressive Disclosure, Visual Balance

import { navigate, state, addToCart } from '../main.js';
import { getProductById, products, getProductsByCategory } from '../data/products.js';
import { renderProductCard } from './search.js';

export function renderProductDetail(container, params = {}) {
    const product = getProductById(params.id);
    if (!product) { container.innerHTML = '<div class="container" style="padding:4rem;text-align:center"><h2>Product not found</h2></div>'; return; }

    const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '') + '☆'.repeat(5 - Math.ceil(product.rating));
    const related = getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4);
    let qty = 1;

    container.innerHTML = `
    <div class="container product-detail">
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#" data-nav="home">Home</a><span>›</span>
        <a href="#" data-nav="search" data-cat="${product.category}">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</a><span>›</span>
        <span class="current">${product.name}</span>
      </nav>

      <div class="product-detail-grid">
        <!-- Image - Dual-Coding Theory: visual + text together -->
        <div class="product-detail-img">
          <img src="${product.image}" alt="${product.name}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22400%22><rect fill=%22%23f0fdf4%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2272%22>🛒</text></svg>'" />
        </div>

        <div class="product-detail-info">
          <h1>${product.name}</h1>
          <div class="rating-row">
            <span class="rating-stars">${stars}</span>
            <span style="font-weight:600;">${product.rating}</span>
            <span class="rating-count">(${product.reviews} reviews)</span>
            <span style="color:var(--color-primary-600);">• ${product.bought}+ bought</span>
          </div>
          <div class="price-row">
            <span class="current-price">₹${product.price}</span>
            ${product.originalPrice > product.price ? `
              <span class="original-price">₹${product.originalPrice}</span>
              <span class="save-badge">Save ₹${product.originalPrice - product.price}</span>` : ''}
          </div>

          <!-- Scarcity indicator - Persuasion Psychology -->
          <div class="stock-indicator">
            ${product.stock <= 10
            ? `<span class="stock-low">🔴 Only ${product.stock} left! Order soon</span>`
            : `<span class="stock-ok">✅ In Stock</span>`}
          </div>

          <p style="color:var(--color-text-secondary);margin-bottom:var(--space-4);">Weight: ${product.weight}</p>
          ${product.organic ? '<p style="color:var(--color-primary-600);font-weight:600;margin-bottom:var(--space-4);">🌿 Certified Organic Product</p>' : ''}

          <!-- Quantity Selector - Direct Manipulation -->
          <div class="qty-selector">
            <label>Quantity:</label>
            <div class="qty-controls">
              <button id="qty-dec" aria-label="Decrease quantity">−</button>
              <span class="qty-value" id="qty-display">${qty}</span>
              <button id="qty-inc" aria-label="Increase quantity">+</button>
            </div>
          </div>

          <!-- Large Add button - Fitts' Law -->
          <button class="btn btn-primary detail-add-btn btn-full" id="detail-add-btn">
            🛒 Add to Cart — ₹<span id="total-price">${product.price}</span>
          </button>

          <!-- Description - Progressive Disclosure -->
          <div class="product-desc">
            <h3>About this product</h3>
            <div class="expandable" id="desc-expandable">
              <p style="color:var(--color-text-secondary);line-height:1.8;">${product.desc}</p>
              <p style="color:var(--color-text-secondary);line-height:1.8;margin-top:var(--space-4);">
                <strong>Storage:</strong> Store in cool, dry place. Refrigerate after opening.<br/>
                <strong>Shelf Life:</strong> 5-7 days from delivery.<br/>
                <strong>Source:</strong> Sourced from verified farms across India.
              </p>
            </div>
          </div>

          <!-- Nutritional Info -->
          <div style="margin-top:var(--space-6);padding:var(--space-4);background:var(--color-bg-secondary);border-radius:var(--radius-lg);">
            <h3 style="font-size:var(--font-size-base);margin-bottom:var(--space-3);">📊 Quick Facts</h3>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:var(--space-3);text-align:center;">
              <div><div style="font-weight:700;color:var(--color-primary-600);">100%</div><div style="font-size:var(--font-size-xs);color:var(--color-text-muted);">Natural</div></div>
              <div><div style="font-weight:700;color:var(--color-primary-600);">No</div><div style="font-size:var(--font-size-xs);color:var(--color-text-muted);">Preservatives</div></div>
              <div><div style="font-weight:700;color:var(--color-primary-600);">Farm</div><div style="font-size:var(--font-size-xs);color:var(--color-text-muted);">Fresh</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Related Products - Learnability, Cross-sell -->
      ${related.length > 0 ? `
        <div class="section">
          <div class="section-header"><h2>You might also like</h2></div>
          <div class="product-grid">${related.map(p => renderProductCard(p)).join('')}</div>
        </div>` : ''}
    </div>`;

    // Events
    container.querySelector('[data-nav="home"]').addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
    container.querySelector('[data-nav="search"]').addEventListener('click', (e) => {
        e.preventDefault(); state.selectedCategory = e.target.dataset.cat; navigate('search');
    });

    const qtyDisplay = container.querySelector('#qty-display');
    const totalPrice = container.querySelector('#total-price');
    container.querySelector('#qty-dec').addEventListener('click', () => { if (qty > 1) { qty--; qtyDisplay.textContent = qty; totalPrice.textContent = product.price * qty; } });
    container.querySelector('#qty-inc').addEventListener('click', () => { if (qty < product.stock) { qty++; qtyDisplay.textContent = qty; totalPrice.textContent = product.price * qty; } });

    // Add to cart with feedback animation
    container.querySelector('#detail-add-btn').addEventListener('click', () => {
        addToCart(product, qty);
        const btn = container.querySelector('#detail-add-btn');
        btn.textContent = '✅ Added!';
        btn.style.background = 'var(--color-primary-700)';
        setTimeout(() => { btn.innerHTML = `🛒 Add to Cart — ₹<span id="total-price">${product.price * qty}</span>`; btn.style.background = ''; }, 1500);
    });

    // Related product events
    container.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.add-btn') || e.target.closest('.qty-control')) return;
            navigate('product-detail', { id: card.dataset.id });
        });
    });
    container.querySelectorAll('.product-card .add-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const p = products.find(p => p.id === parseInt(btn.dataset.id));
            if (p) addToCart(p);
        });
    });
}
