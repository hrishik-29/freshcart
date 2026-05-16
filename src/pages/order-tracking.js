// Order Tracking Page
// HCI: Visibility of System Status (timeline), Feedback, Mental Model (delivery tracking)

import { navigate, state } from '../main.js';

export function renderOrderTracking(container) {
    const order = state.lastOrder;
    const orderId = 'FC' + Date.now().toString().slice(-6);

    container.innerHTML = `
    <div class="container tracking-page">
      <nav class="breadcrumbs"><a href="#" id="tk-home">Home</a><span>›</span><span class="current">Order Tracking</span></nav>
      <h1 style="font-size:var(--font-size-2xl);margin-bottom:var(--space-6);">📦 Order Tracking</h1>
      
      <div class="tracking-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-6);padding-bottom:var(--space-4);border-bottom:1px solid var(--color-border);">
          <div>
            <div style="font-weight:var(--font-weight-bold);font-size:var(--font-size-lg);">Order #${orderId}</div>
            <div style="font-size:var(--font-size-sm);color:var(--color-text-muted);">Placed just now</div>
          </div>
          <div style="background:var(--color-primary-100);color:var(--color-primary-700);padding:var(--space-2) var(--space-4);border-radius:var(--radius-full);font-size:var(--font-size-sm);font-weight:var(--font-weight-semibold);">
            In Progress
          </div>
        </div>

        <!-- Delivery Timeline - Visibility of System Status -->
        <div style="margin-bottom:var(--space-6);">
          <div style="display:flex;align-items:center;gap:var(--space-2);margin-bottom:var(--space-3);">
            <span style="font-size:1.2rem;">🕐</span>
            <span style="font-weight:var(--font-weight-semibold);">Estimated Delivery:</span>
            <span style="color:var(--color-primary-600);font-weight:var(--font-weight-bold);">30 minutes</span>
          </div>
          <div style="background:var(--color-bg-secondary);border-radius:var(--radius-full);height:8px;overflow:hidden;">
            <div style="background:var(--color-primary-500);height:100%;width:35%;border-radius:var(--radius-full);transition:width 1s ease;" id="delivery-progress"></div>
          </div>
        </div>

        <!-- Timeline Steps -->
        <div class="tracking-timeline">
          <div class="timeline-step completed">
            <div class="timeline-dot"></div>
            <h4>✅ Order Confirmed</h4>
            <div class="time">Just now — Your order has been received</div>
          </div>
          <div class="timeline-step current">
            <div class="timeline-dot"></div>
            <h4>📋 Being Prepared</h4>
            <div class="time">Estimated 10 min — Items being picked and packed</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot"></div>
            <h4>🚚 Out for Delivery</h4>
            <div class="time">Estimated 20 min — Rider assigned</div>
          </div>
          <div class="timeline-step">
            <div class="timeline-dot"></div>
            <h4>📍 Delivered</h4>
            <div class="time">Estimated 30 min — At your doorstep</div>
          </div>
        </div>

        <!-- Delivery Map Placeholder -->
        <div style="margin-top:var(--space-8);background:var(--color-bg-secondary);border-radius:var(--radius-xl);padding:var(--space-8);text-align:center;">
          <div style="font-size:4rem;margin-bottom:var(--space-3);">🗺️</div>
          <p style="color:var(--color-text-secondary);font-size:var(--font-size-sm);">Live tracking map will appear here once the order is picked up</p>
        </div>

        ${order ? `
        <div style="margin-top:var(--space-6);padding-top:var(--space-6);border-top:1px solid var(--color-border);">
          <h3 style="font-size:var(--font-size-base);margin-bottom:var(--space-3);">Order Summary</h3>
          ${order.items.map(i => `
            <div style="display:flex;justify-content:space-between;padding:var(--space-2) 0;font-size:var(--font-size-sm);">
              <span>${i.name} × ${i.qty}</span><span>₹${i.price * i.qty}</span>
            </div>`).join('')}
          <div style="display:flex;justify-content:space-between;padding-top:var(--space-3);margin-top:var(--space-3);border-top:1px solid var(--color-border);font-weight:var(--font-weight-bold);">
            <span>Total</span><span>₹${order.total}</span>
          </div>
        </div>` : ''}

        <div style="margin-top:var(--space-6);display:flex;gap:var(--space-3);">
          <button class="btn btn-outline btn-full" id="tk-help">Need Help?</button>
          <button class="btn btn-primary btn-full" id="tk-home-btn">Back to Home</button>
        </div>
      </div>
    </div>`;

    container.querySelector('#tk-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
    container.querySelector('#tk-home-btn')?.addEventListener('click', () => navigate('home'));
    container.querySelector('#tk-help')?.addEventListener('click', () => navigate('help'));

    // Simulate progress
    let progress = 35;
    const progressBar = container.querySelector('#delivery-progress');
    const interval = setInterval(() => {
        progress += 2;
        if (progressBar) progressBar.style.width = Math.min(progress, 95) + '%';
        if (progress >= 95) clearInterval(interval);
    }, 3000);
}
