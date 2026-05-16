// Home Page - Landing
// HCI: Inverted Pyramid, F-Pattern, Serial Position, Gestalt, Von Restorff, 
// Color Psychology, Dual-Coding, Persuasion (Scarcity, Social Proof, Authority)

import { navigate, state, addToCart } from '../main.js';
import { categories, getTopDeals, getTrending, products } from '../data/products.js';
import { renderProductCard } from './search.js';

export function renderHome(container) {
  const deals = getTopDeals();
  const trending = getTrending();

  container.innerHTML = `
    <!-- HERO - Inverted Pyramid: Most important content first -->
    <section class="hero" id="hero-section">
      <div class="container">
        <div class="hero-inner">
          <div class="hero-content">
            <h1>Fresh Groceries,<br/><span class="highlight">Delivered in 30 min</span></h1>
            <p>Shop from 1000+ fresh products. From farm to your table with guaranteed freshness and best prices.</p>
            <div class="hero-search">
              <input type="text" id="hero-search-input" placeholder="Search for fruits, vegetables, dairy..." aria-label="Search products" />
              <button class="btn btn-primary btn-lg" id="hero-search-btn">Search</button>
            </div>
            <div class="hero-stats">
              <div class="hero-stat"><div class="num">10K+</div><div class="label">Happy Customers</div></div>
              <div class="hero-stat"><div class="num">1000+</div><div class="label">Products</div></div>
              <div class="hero-stat"><div class="num">30 min</div><div class="label">Avg Delivery</div></div>
              <div class="hero-stat"><div class="num">4.8★</div><div class="label">App Rating</div></div>
            </div>
          </div>
          <div class="hero-image">
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop" alt="Fresh groceries assortment" style="width:350px;height:350px;border-radius:var(--radius-2xl);object-fit:cover;box-shadow:0 20px 40px rgba(0,0,0,0.15);" />
          </div>
        </div>
      </div>
    </section>

    <!-- FREE DELIVERY BANNER - Persuasion: Reciprocity -->
    <section style="background:var(--color-primary-600);color:#fff;padding:var(--space-3) 0;text-align:center;">
      <div class="container" style="display:flex;align-items:center;justify-content:center;gap:var(--space-4);flex-wrap:wrap;font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);">
        <span>🚚 FREE Delivery on orders above ₹299</span>
        <span>•</span>
        <span>🎁 Use code FRESH50 for 50% off on first order</span>
        <span>•</span>
        <span>⭐ Earn loyalty points on every purchase</span>
      </div>
    </section>

    <!-- CATEGORIES - Gestalt: Common Region (cards), Dual-Coding (icon+text), Miller's 7±2 (8 categories) -->
    <section class="section" id="categories-section">
      <div class="container">
        <div class="section-header">
          <h2>🛍️ Shop by Category</h2>
          <a href="#" class="view-all" id="view-all-cats">View All →</a>
        </div>
        <div class="category-grid">
          ${categories.map(c => `
            <div class="category-card" data-cat="${c.id}" role="button" tabindex="0" aria-label="Browse ${c.name}">
              <span class="cat-icon">${c.icon}</span>
              <span class="cat-name">${c.name}</span>
              <span class="cat-count">${c.count} items</span>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- FLASH DEALS - Persuasion: Scarcity (countdown), Von Restorff (contrasting cards) -->
    <section class="section" style="background:var(--color-bg-secondary);" id="deals-section">
      <div class="container">
        <div class="section-header">
          <h2>⚡ Flash Deals</h2>
          <span style="color:var(--color-danger-500);font-weight:var(--font-weight-bold);font-size:var(--font-size-sm);">
            ⏰ Ends in: <span id="deal-timer">02:45:30</span>
          </span>
        </div>
        <div class="flash-deals-scroll">
          ${deals.map(p => `
            <div class="flash-deal-card" data-id="${p.id}" role="button" tabindex="0">
              <div class="deal-discount">${p.badge}</div>
              <div style="width:100%;height:120px;overflow:hidden;border-radius:var(--radius-md);margin-bottom:var(--space-2);">
                <img src="${p.image}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;" loading="lazy" />
              </div>
              <div style="font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);margin-bottom:var(--space-1);">${p.name}</div>
              <div style="font-size:var(--font-size-xs);color:var(--color-text-muted);margin-bottom:var(--space-2);">${p.weight}</div>
              <div style="display:flex;align-items:baseline;gap:var(--space-2);">
                <span style="font-weight:var(--font-weight-bold);">₹${p.price}</span>
                <span style="text-decoration:line-through;font-size:var(--font-size-xs);color:var(--color-text-muted);">₹${p.originalPrice}</span>
              </div>
              <div class="deal-timer" style="margin-top:var(--space-2);">
                🔥 ${p.bought}+ bought
              </div>
            </div>`).join('')}
        </div>
      </div>
    </section>

    <!-- TRENDING - Persuasion: Social Proof ("500+ bought this week") -->
    <section class="section" id="trending-section">
      <div class="container">
        <div class="section-header">
          <h2>🔥 Trending Now</h2>
          <a href="#" class="view-all" id="view-all-trending">View All →</a>
        </div>
        <div class="product-grid">
          ${trending.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- TRUST - Persuasion: Authority -->
    <section class="section" style="background:var(--color-bg-secondary);" id="trust-section">
      <div class="container">
        <div class="section-header"><h2>💚 Why Choose FreshCart?</h2></div>
        <div class="trust-grid">
          <div class="trust-card">
            <div class="trust-icon">🌿</div>
            <h3>100% Fresh Guaranteed</h3>
            <p>Direct from farms. Every product undergoes quality checks before delivery.</p>
          </div>
          <div class="trust-card">
            <div class="trust-icon">⚡</div>
            <h3>30-Min Express Delivery</h3>
            <p>Get your groceries delivered within 30 minutes or it's free!</p>
          </div>
          <div class="trust-card">
            <div class="trust-icon">💰</div>
            <h3>Best Prices Always</h3>
            <p>Price match guarantee. Found it cheaper elsewhere? We'll beat it.</p>
          </div>
          <div class="trust-card">
            <div class="trust-icon">🔒</div>
            <h3>Secure Payments</h3>
            <p>256-bit SSL encryption. UPI, Cards, Net Banking, and Cash on Delivery.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SOCIAL PROOF BANNER - Persuasion: Social Proof -->
    <section class="section">
      <div class="container" style="text-align:center;">
        <h2 style="margin-bottom:var(--space-4);">Trusted by 10,000+ Families</h2>
        <p style="color:var(--color-text-secondary);max-width:600px;margin:0 auto var(--space-8);">Join thousands of happy customers who have made FreshCart their go-to grocery app.</p>
        <div style="display:flex;justify-content:center;gap:var(--space-8);flex-wrap:wrap;">
          <div style="text-align:center;">
            <div style="font-size:var(--font-size-4xl);font-weight:var(--font-weight-extrabold);color:var(--color-primary-600);">4.8★</div>
            <div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">App Store Rating</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:var(--font-size-4xl);font-weight:var(--font-weight-extrabold);color:var(--color-primary-600);">50K+</div>
            <div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">Orders Delivered</div>
          </div>
          <div style="text-align:center;">
            <div style="font-size:var(--font-size-4xl);font-weight:var(--font-weight-extrabold);color:var(--color-primary-600);">99%</div>
            <div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>`;

  // Event Listeners
  // Hero search
  const heroSearch = container.querySelector('#hero-search-input');
  const heroSearchBtn = container.querySelector('#hero-search-btn');
  heroSearchBtn.addEventListener('click', () => {
    state.searchQuery = heroSearch.value.trim();
    state.selectedCategory = '';
    navigate('search');
  });
  heroSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { state.searchQuery = heroSearch.value.trim(); state.selectedCategory = ''; navigate('search'); }
  });

  // Category cards
  container.querySelectorAll('.category-card').forEach(card => {
    const handler = () => { state.selectedCategory = card.dataset.cat; state.searchQuery = ''; navigate('search'); };
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') handler(); });
  });

  // Flash deal cards
  container.querySelectorAll('.flash-deal-card').forEach(card => {
    card.addEventListener('click', () => navigate('product-detail', { id: card.dataset.id }));
  });

  // Product card ADD buttons
  container.querySelectorAll('.product-card .add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.product-card').dataset.id);
      const product = products.find(p => p.id === id);
      if (product) addToCart(product);
    });
  });

  // Product card navigation
  container.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn') || e.target.closest('.qty-control')) return;
      navigate('product-detail', { id: card.dataset.id });
    });
  });

  // View all links
  container.querySelector('#view-all-cats')?.addEventListener('click', (e) => { e.preventDefault(); state.selectedCategory = ''; navigate('search'); });
  container.querySelector('#view-all-trending')?.addEventListener('click', (e) => { e.preventDefault(); state.selectedCategory = ''; navigate('search'); });

  // Countdown timer for deals (Scarcity)
  startDealTimer();
}

function startDealTimer() {
  let totalSeconds = 2 * 3600 + 45 * 60 + 30;
  const timerEl = document.getElementById('deal-timer');
  if (!timerEl) return;

  const tick = () => {
    if (totalSeconds <= 0) return;
    totalSeconds--;
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    if (timerEl) timerEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };
  setInterval(tick, 1000);
}
