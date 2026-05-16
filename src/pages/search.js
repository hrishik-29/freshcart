// Search / Product Listing Page
// HCI: Hick's Law (filter chips reduce choices), Recognition over Recall (autocomplete),
// Fitts' Law (large ADD buttons), Gestalt Similarity (consistent cards), Miller's 7±2 (sort options)

import { navigate, state, addToCart, updateCartQty, removeFromCart } from '../main.js';
import { products, categories, searchProducts, getProductsByCategory } from '../data/products.js';

export function renderProductCard(product) {
  const cartItem = state.cart.find(i => i.id === product.id);
  const inCart = cartItem && cartItem.qty > 0;
  const stars = '★'.repeat(Math.floor(product.rating)) + (product.rating % 1 >= 0.5 ? '½' : '');
  const catIcons = { fruits: '🍎', vegetables: '🥦', dairy: '🥛', bakery: '🍞', beverages: '🥤', snacks: '🍿', meat: '🥩', household: '🧹' };
  const fallbackIcon = catIcons[product.category] || '🛒';

  return `
    <div class="product-card" data-id="${product.id}" role="article" tabindex="0" aria-label="${product.name} - ₹${product.price}">
      <div class="card-img">
        <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.onerror=null;this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22><rect fill=%22%23f0fdf4%22 width=%22400%22 height=%22300%22/><text x=%2250%25%22 y=%2245%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2264%22>${fallbackIcon}</text><text x=%2250%25%22 y=%2275%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-size=%2214%22 fill=%22%23999%22>${encodeURIComponent(product.name)}</text></svg>'" />
        ${product.badge ? `<span class="card-badge">${product.badge}</span>` : ''}
        ${product.organic ? `<span class="card-badge organic">🌿 Organic</span>` : ''}
      </div>
      <div class="card-body">
        <div class="card-title">${product.name}</div>
        <div class="card-weight">${product.weight}</div>
        <div class="card-rating">
          <span>${stars}</span>
          <span class="count">(${product.reviews})</span>
          ${product.bought > 1000 ? `<span style="color:var(--color-primary-600);font-weight:600;">• ${(product.bought / 1000).toFixed(1)}k+ bought</span>` : ''}
        </div>
        <div class="card-price-row">
          <div class="card-price">
            ₹${product.price}
            ${product.originalPrice > product.price ? `<span class="original">₹${product.originalPrice}</span>` : ''}
          </div>
          ${inCart ? `
            <div class="qty-control" style="display:flex;flex-direction:row;align-items:center;">
              <button class="qty-dec" data-id="${product.id}" aria-label="Decrease quantity">−</button>
              <span class="qty-num">${cartItem.qty}</span>
              <button class="qty-inc" data-id="${product.id}" aria-label="Increase quantity">+</button>
            </div>` : `
            <button class="add-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">ADD</button>`}
        </div>
      </div>
    </div>`;
}

export function renderSearch(container) {
  let filteredProducts = [];
  let activeFilters = [];
  let sortBy = 'relevance';

  // Determine which products to show
  if (state.selectedCategory) {
    filteredProducts = getProductsByCategory(state.selectedCategory);
  } else if (state.searchQuery) {
    filteredProducts = searchProducts(state.searchQuery);
  } else {
    filteredProducts = [...products];
  }

  const currentCat = categories.find(c => c.id === state.selectedCategory);
  const filterOptions = ['Under ₹100', 'Organic', 'High Rated (4+★)', 'On Sale', 'In Stock'];

  function render() {
    let displayed = [...filteredProducts];
    // Apply filters
    if (activeFilters.includes('Under ₹100')) displayed = displayed.filter(p => p.price < 100);
    if (activeFilters.includes('Organic')) displayed = displayed.filter(p => p.organic);
    if (activeFilters.includes('High Rated (4+★)')) displayed = displayed.filter(p => p.rating >= 4);
    if (activeFilters.includes('On Sale')) displayed = displayed.filter(p => p.originalPrice > p.price);
    if (activeFilters.includes('In Stock')) displayed = displayed.filter(p => p.stock > 0);
    // Apply sort (Miller's 7±2 - max 5 sort options)
    if (sortBy === 'price-low') displayed.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-high') displayed.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') displayed.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popularity') displayed.sort((a, b) => b.bought - a.bought);

    container.innerHTML = `
      <div class="container" style="padding-top:var(--space-4);">
        <!-- Breadcrumbs - Navigation, Closure, Learnability -->
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#" data-page="home">Home</a>
          <span>›</span>
          ${currentCat ? `<span class="current">${currentCat.name}</span>` :
        state.searchQuery ? `<span class="current">Search: "${state.searchQuery}"</span>` :
          `<span class="current">All Products</span>`}
        </nav>

        <h1 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-4);">
          ${currentCat ? `${currentCat.icon} ${currentCat.name}` :
        state.searchQuery ? `Results for "${state.searchQuery}"` : 'All Products'}
        </h1>

        <!-- Category tabs -->
        <div class="filter-bar" style="margin-bottom:var(--space-4);">
          <button class="filter-chip ${!state.selectedCategory ? 'active' : ''}" data-cat="">All</button>
          ${categories.map(c => `
            <button class="filter-chip ${state.selectedCategory === c.id ? 'active' : ''}" data-cat="${c.id}">
              ${c.icon} ${c.name}
            </button>`).join('')}
        </div>

        <!-- Filter Chips - Hick's Law (reduce decision time), Recognition over Recall -->
        <div class="filter-bar">
          ${filterOptions.map(f => `
            <button class="filter-chip ${activeFilters.includes(f) ? 'active' : ''}" data-filter="${f}">
              ${f} ${activeFilters.includes(f) ? '✕' : ''}
            </button>`).join('')}
        </div>

        <!-- Sort & Results Count -->
        <div class="sort-bar">
          <span class="results-count">${displayed.length} products found</span>
          <select id="sort-select" aria-label="Sort products">
            <option value="relevance" ${sortBy === 'relevance' ? 'selected' : ''}>Sort by: Relevance</option>
            <option value="price-low" ${sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
            <option value="price-high" ${sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
            <option value="rating" ${sortBy === 'rating' ? 'selected' : ''}>Rating: Highest</option>
            <option value="popularity" ${sortBy === 'popularity' ? 'selected' : ''}>Popularity</option>
          </select>
        </div>

        <!-- Product Grid - Gestalt Similarity (uniform cards) -->
        ${displayed.length > 0 ? `
          <div class="product-grid">
            ${displayed.map(p => renderProductCard(p)).join('')}
          </div>` : `
          <div style="text-align:center;padding:var(--space-16);">
            <div style="font-size:4rem;margin-bottom:var(--space-4);">🔍</div>
            <h2>No products found</h2>
            <p style="color:var(--color-text-secondary);">Try adjusting your filters or search term</p>
          </div>`}
      </div>`;

    // Attach events
    attachSearchEvents(container, render);
  }

  render();

  function attachSearchEvents(container, rerender) {
    // Breadcrumb home link
    container.querySelector('[data-page="home"]')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });

    // Category tabs
    container.querySelectorAll('[data-cat]').forEach(chip => {
      chip.addEventListener('click', () => {
        state.selectedCategory = chip.dataset.cat;
        if (chip.dataset.cat) {
          filteredProducts = getProductsByCategory(chip.dataset.cat);
        } else {
          filteredProducts = state.searchQuery ? searchProducts(state.searchQuery) : [...products];
        }
        rerender();
      });
    });

    // Filter chips
    container.querySelectorAll('[data-filter]').forEach(chip => {
      chip.addEventListener('click', () => {
        const f = chip.dataset.filter;
        if (activeFilters.includes(f)) activeFilters = activeFilters.filter(x => x !== f);
        else activeFilters.push(f);
        rerender();
      });
    });

    // Sort
    container.querySelector('#sort-select')?.addEventListener('change', (e) => { sortBy = e.target.value; rerender(); });

    // Product card clicks
    container.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.add-btn') || e.target.closest('.qty-control')) return;
        navigate('product-detail', { id: card.dataset.id });
      });
    });

    // ADD buttons (Fitts' Law - large clickable area)
    container.querySelectorAll('.add-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        const product = products.find(p => p.id === id);
        if (product) { addToCart(product); rerender(); }
      });
    });

    // Qty controls
    container.querySelectorAll('.qty-inc').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); updateCartQty(parseInt(btn.dataset.id), (state.cart.find(i => i.id === parseInt(btn.dataset.id))?.qty || 0) + 1); rerender(); });
    });
    container.querySelectorAll('.qty-dec').forEach(btn => {
      btn.addEventListener('click', (e) => { e.stopPropagation(); const id = parseInt(btn.dataset.id); const item = state.cart.find(i => i.id === id); if (item) { updateCartQty(id, item.qty - 1); rerender(); } });
    });
  }
}
