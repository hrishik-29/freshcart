// Help & Support Page - User Support System (Lecture 20)
// HCI: FAQ, Contextual Help, Multiple support channels, Documentation

import { navigate } from '../main.js';

export function renderHelp(container) {
  const faqs = [
    { q: 'How do I place an order?', a: 'Browse products from the Home page or use Search (press "/" to focus). Add items to your cart, then click the Cart icon (or press C) and follow the 3-step checkout: Address → Payment → Confirm.' },
    { q: 'What are the delivery timings?', a: 'We deliver from 6 AM to 11 PM, 7 days a week. Express delivery takes around 30 minutes. Standard delivery within 2-4 hours.' },
    { q: 'How can I track my order?', a: 'After placing an order, click "Track Order" on the confirmation page. You can also access it from your Profile → Order History.' },
    { q: 'What is your return/refund policy?', a: 'We offer hassle-free returns within 24 hours of delivery. If you receive damaged or wrong products, contact us for an immediate refund.' },
    { q: 'How do I apply a promo code?', a: 'Enter your promo code in the "Apply Coupon" field during checkout. The discount will be reflected immediately in your bill summary.' },
    { q: 'Is Cash on Delivery available?', a: 'Yes! We accept COD along with UPI, Credit/Debit Cards, and Net Banking. Select your preferred payment method during checkout.' },
    { q: 'How do I use keyboard shortcuts?', a: 'Press Shift+? anywhere to see all available shortcuts. Quick keys: H=Home, S=Search, C=Cart, P=Profile, /=Focus search bar.' },
    { q: 'How do I change accessibility settings?', a: 'Visit the Accessibility page from your Profile or the footer. You can adjust font size, enable high contrast mode, color-blind mode, and dark theme.' },
  ];

  container.innerHTML = `
    <div class="container help-page">
      <nav class="breadcrumbs"><a href="#" id="hlp-home">Home</a><span>›</span><span class="current">Help & Support</span></nav>
      <div class="help-hero">
        <h1>🙋 How can we help you?</h1>
        <p style="color:var(--color-text-secondary);max-width:500px;margin:0 auto var(--space-6);">Find answers to common questions or reach out to our support team</p>
        <div style="max-width:500px;margin:0 auto;position:relative;">
          <input type="text" id="help-search" placeholder="Search help articles..." style="padding-left:2.5rem;" aria-label="Search help" />
          <span style="position:absolute;left:var(--space-4);top:50%;transform:translateY(-50%);color:var(--color-text-muted);">🔍</span>
        </div>
      </div>

      <!-- Help Categories -->
      <div class="help-categories" style="cursor:pointer;">
        ${[
      { icon: '📦', title: 'Orders & Delivery', desc: 'Track, modify, or cancel orders', route: 'profile' },
      { icon: '💳', title: 'Payment & Refunds', desc: 'Payment methods and refund status', route: 'checkout' },
      { icon: '🛍️', title: 'Products & Quality', desc: 'Product info, freshness guarantee', route: 'search' },
      { icon: '👤', title: 'Account & Settings', desc: 'Profile, preferences, security', route: 'profile' },
      { icon: '⌨️', title: 'Keyboard Shortcuts', desc: 'Navigate faster with shortcuts', route: 'accessibility' },
      { icon: '♿', title: 'Accessibility', desc: 'Font size, contrast, color-blind mode', route: 'accessibility' },
    ].map(c => `
          <div class="help-cat-card" data-route="${c.route}" role="button" tabindex="0" aria-label="Go to ${c.title}">
            <div class="icon">${c.icon}</div>
            <h3 style="font-size:var(--font-size-sm);margin-bottom:var(--space-1);">${c.title}</h3>
            <p style="font-size:var(--font-size-xs);color:var(--color-text-muted);">${c.desc}</p>
          </div>`).join('')}
      </div>

      <!-- FAQs - Accordion pattern -->
      <div class="faq-section">
        <h2 style="text-align:center;margin-bottom:var(--space-6);">❓ Frequently Asked Questions</h2>
        ${faqs.map((faq, i) => `
          <div class="faq-item" id="faq-${i}">
            <button class="faq-question" aria-expanded="false" aria-controls="faq-answer-${i}">
              <span>${faq.q}</span>
              <span class="arrow">▼</span>
            </button>
            <div class="faq-answer" id="faq-answer-${i}" role="region">
              <p>${faq.a}</p>
            </div>
          </div>`).join('')}
      </div>

      <!-- Contact Section -->
      <div style="margin-top:var(--space-12);text-align:center;">
        <h2 style="margin-bottom:var(--space-6);">📞 Still Need Help?</h2>
        <div class="trust-grid" style="max-width:800px;margin:0 auto;">
          <div class="trust-card">
            <div class="trust-icon">📧</div>
            <h3>Email Us</h3>
            <p>support@freshcart.in<br/>Response within 2 hours</p>
          </div>
          <div class="trust-card">
            <div class="trust-icon">📞</div>
            <h3>Call Us</h3>
            <p>1800-123-4567<br/>24/7 Toll-Free</p>
          </div>
          <div class="trust-card">
            <div class="trust-icon">💬</div>
            <h3>Live Chat</h3>
            <p>Click the chat icon<br/>at bottom-right</p>
          </div>
        </div>
      </div>
    </div>`;

  // Breadcrumb navigation
  container.querySelector('#hlp-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });

  // FAQ accordion
  container.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      container.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
      btn.setAttribute('aria-expanded', !wasOpen);
    });
  });

  // Search FAQ
  container.querySelector('#help-search')?.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    container.querySelectorAll('.faq-item').forEach((item, i) => {
      const match = faqs[i].q.toLowerCase().includes(q) || faqs[i].a.toLowerCase().includes(q) || !q;
      item.style.display = match ? 'block' : 'none';
    });
  });

  // Interactive category cards (Flexibility & Efficiency of Use)
  container.querySelectorAll('.help-cat-card').forEach(card => {
    const handler = () => navigate(card.dataset.route);
    card.addEventListener('click', handler);
    card.addEventListener('keydown', (e) => { if (e.key === 'Enter') handler(); });
  });
}
