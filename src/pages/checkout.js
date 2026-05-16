// Checkout Page - Multi-step flow
// HCI: Closure (progress stepper), Form Fill-in, Error Handling/Prevention,
// Constraints, Locus of Control, Feedback, Asimov's 1st Law

import { navigate, state, getCartTotal, getCartSavings, getCartCount } from '../main.js';
import { showToast } from '../components/toast.js';

export function renderCheckout(container) {
  if (state.cart.length === 0) { navigate('cart'); return; }
  let step = 1;
  const savedForm = JSON.parse(localStorage.getItem('freshcart_address') || 'null');
  let formData = savedForm || { name: '', phone: '', address: '', city: '', pincode: '', paymentMethod: 'upi' };

  function render() {
    const total = getCartTotal();
    const delivery = total >= 299 ? 0 : 40;

    container.innerHTML = `
      <div class="container checkout-page">
        <nav class="breadcrumbs"><a href="#" id="ck-home">Home</a><span>›</span><a href="#" id="ck-cart">Cart</a><span>›</span><span class="current">Checkout</span></nav>

        <!-- Progress Stepper - Shneiderman: Design Dialogues to Yield Closure -->
        <div class="checkout-stepper">
          <div class="step ${step >= 1 ? (step > 1 ? 'completed' : 'active') : ''}">
            <div class="step-circle">${step > 1 ? '✓' : '1'}</div><span>Address</span>
          </div>
          <div class="step-line ${step > 1 ? 'completed' : ''}"></div>
          <div class="step ${step >= 2 ? (step > 2 ? 'completed' : 'active') : ''}">
            <div class="step-circle">${step > 2 ? '✓' : '2'}</div><span>Payment</span>
          </div>
          <div class="step-line ${step > 2 ? 'completed' : ''}"></div>
          <div class="step ${step >= 3 ? 'active' : ''}">
            <div class="step-circle">3</div><span>Confirm</span>
          </div>
        </div>

        <div class="checkout-form">
          ${step === 1 ? renderAddressStep() : step === 2 ? renderPaymentStep(total, delivery) : renderConfirmation(total, delivery)}
        </div>
      </div>`;

    // Events
    container.querySelector('#ck-home')?.addEventListener('click', (e) => { e.preventDefault(); navigate('home'); });
    container.querySelector('#ck-cart')?.addEventListener('click', (e) => { e.preventDefault(); navigate('cart'); });

    if (step === 1) attachAddressEvents();
    else if (step === 2) attachPaymentEvents();
    else attachConfirmEvents();
  }

  function renderAddressStep() {
    return `
      <h2 style="margin-bottom:var(--space-6);">📍 Delivery Address</h2>
      <div class="form-group">
        <label for="ck-name">Full Name *</label>
        <input type="text" id="ck-name" placeholder="Enter your full name" value="${formData.name}" required />
        <div class="error-msg">Name is required</div>
      </div>
      <div class="form-group">
        <label for="ck-phone">Phone Number *</label>
        <input type="tel" id="ck-phone" placeholder="10-digit mobile number" maxlength="10" value="${formData.phone}" required />
        <div class="error-msg">Enter a valid 10-digit phone number</div>
      </div>
      <div class="form-group">
        <label for="ck-address">Address *</label>
        <textarea id="ck-address" rows="3" placeholder="House no, Street, Landmark" style="width:100%;border:1.5px solid var(--color-border);border-radius:var(--radius-md);padding:var(--space-3) var(--space-4);font-family:inherit;resize:vertical;">${formData.address}</textarea>
        <div class="error-msg">Address is required</div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="ck-city">City *</label>
          <input type="text" id="ck-city" placeholder="City" value="${formData.city}" required />
          <div class="error-msg">City is required</div>
        </div>
        <div class="form-group">
          <label for="ck-pin">PIN Code *</label>
          <input type="text" id="ck-pin" placeholder="6-digit PIN" maxlength="6" value="${formData.pincode}" required />
          <div class="error-msg">Enter a valid 6-digit PIN code</div>
        </div>
      </div>
      <div style="display:flex;gap:var(--space-3);margin-top:var(--space-6);">
        <button class="btn btn-outline" id="ck-back" style="flex:1;">← Back to Cart</button>
        <button class="btn btn-primary" id="ck-next1" style="flex:2;">Continue to Payment →</button>
      </div>`;
  }

  function renderPaymentStep(total, delivery) {
    return `
      <h2 style="margin-bottom:var(--space-6);">💳 Payment Method</h2>
      <div style="background:var(--color-bg-secondary);border-radius:var(--radius-lg);padding:var(--space-4);margin-bottom:var(--space-6);">
        <div style="display:flex;justify-content:space-between;"><span>Items (${getCartCount()})</span><span>₹${total}</span></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-2);"><span>Delivery</span><span>${delivery === 0 ? 'FREE' : '₹' + delivery}</span></div>
        <div style="display:flex;justify-content:space-between;margin-top:var(--space-3);padding-top:var(--space-3);border-top:1px solid var(--color-border);font-weight:700;font-size:var(--font-size-lg);"><span>Total</span><span>₹${total + delivery}</span></div>
      </div>
      <!-- Payment options with icons - Recognition over Recall -->
      <div class="payment-methods">
        ${[
        { id: 'upi', icon: '📱', name: 'UPI (Google Pay, PhonePe)', desc: 'Instant payment' },
        { id: 'card', icon: '💳', name: 'Credit / Debit Card', desc: 'Visa, Mastercard, Rupay' },
        { id: 'netbanking', icon: '🏦', name: 'Net Banking', desc: 'All major banks' },
        { id: 'cod', icon: '💵', name: 'Cash on Delivery', desc: 'Pay when you receive' },
      ].map(pm => `
          <div class="payment-option ${formData.paymentMethod === pm.id ? 'selected' : ''}" data-method="${pm.id}" role="radio" tabindex="0" aria-checked="${formData.paymentMethod === pm.id}">
            <span class="pay-icon">${pm.icon}</span>
            <div><div class="pay-name">${pm.name}</div><div style="font-size:var(--font-size-xs);color:var(--color-text-muted);">${pm.desc}</div></div>
          </div>`).join('')}
      </div>
      <div style="display:flex;gap:var(--space-3);margin-top:var(--space-6);">
        <button class="btn btn-outline" id="ck-back2" style="flex:1;">← Back</button>
        <button class="btn btn-primary" id="ck-next2" style="flex:2;">Place Order — ₹${total + delivery} →</button>
      </div>`;
  }

  function renderConfirmation(total, delivery) {
    return `
      <div class="order-confirmation">
        <div class="success-icon">✓</div>
        <h2 style="color:var(--color-primary-600);margin-bottom:var(--space-3);">Order Placed Successfully! 🎉</h2>
        <p style="color:var(--color-text-secondary);margin-bottom:var(--space-2);">Order #FC${Date.now().toString().slice(-6)}</p>
        <p style="color:var(--color-text-secondary);margin-bottom:var(--space-6);">Estimated delivery in <strong>30 minutes</strong></p>
        <div style="background:var(--color-bg-secondary);border-radius:var(--radius-lg);padding:var(--space-4);margin-bottom:var(--space-6);text-align:left;">
          <div style="font-weight:600;margin-bottom:var(--space-2);">Delivery to:</div>
          <div style="color:var(--color-text-secondary);font-size:var(--font-size-sm);">${formData.name}<br/>${formData.address}<br/>${formData.city} - ${formData.pincode}<br/>Phone: ${formData.phone}</div>
        </div>
        <div style="display:flex;gap:var(--space-3);justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary btn-lg" id="track-order">📦 Track Order</button>
          <button class="btn btn-outline btn-lg" id="continue-home">🏠 Continue Shopping</button>
        </div>
      </div>`;
  }

  function attachAddressEvents() {
    container.querySelector('#ck-back')?.addEventListener('click', () => navigate('cart'));
    container.querySelector('#ck-next1')?.addEventListener('click', () => {
      const name = container.querySelector('#ck-name').value.trim();
      const phone = container.querySelector('#ck-phone').value.trim();
      const address = container.querySelector('#ck-address').value.trim();
      const city = container.querySelector('#ck-city').value.trim();
      const pin = container.querySelector('#ck-pin').value.trim();

      let valid = true;
      // Error Prevention - validate all fields
      if (!name) { container.querySelector('#ck-name').closest('.form-group').classList.add('has-error'); valid = false; }
      if (!phone || phone.length !== 10 || !/^\d+$/.test(phone)) { container.querySelector('#ck-phone').closest('.form-group').classList.add('has-error'); valid = false; }
      if (!address) { container.querySelector('#ck-address').closest('.form-group').classList.add('has-error'); valid = false; }
      if (!city) { container.querySelector('#ck-city').closest('.form-group').classList.add('has-error'); valid = false; }
      if (!pin || pin.length !== 6 || !/^\d+$/.test(pin)) { container.querySelector('#ck-pin').closest('.form-group').classList.add('has-error'); valid = false; }

      if (!valid) { showToast('error', 'Missing Information', 'Please fill all required fields correctly.'); return; }

      formData = { ...formData, name, phone, address, city, pincode: pin };
      localStorage.setItem('freshcart_address', JSON.stringify(formData));
      step = 2; render();
    });
    // Remove error on input
    container.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => el.closest('.form-group')?.classList.remove('has-error'));
    });
  }

  function attachPaymentEvents() {
    container.querySelectorAll('.payment-option').forEach(opt => {
      opt.addEventListener('click', () => {
        container.querySelectorAll('.payment-option').forEach(o => { o.classList.remove('selected'); o.setAttribute('aria-checked', 'false'); });
        opt.classList.add('selected');
        opt.setAttribute('aria-checked', 'true');
        formData.paymentMethod = opt.dataset.method;
      });
    });
    container.querySelector('#ck-back2')?.addEventListener('click', () => { step = 1; render(); });
    container.querySelector('#ck-next2')?.addEventListener('click', () => {
      state.lastOrder = { items: [...state.cart], total: getCartTotal(), address: formData };
      state.cart = [];
      localStorage.setItem('freshcart-cart', '[]');
      step = 3; render();
      showToast('success', 'Order Confirmed!', 'Your order has been placed successfully.');
    });
  }

  function attachConfirmEvents() {
    container.querySelector('#track-order')?.addEventListener('click', () => navigate('order-tracking'));
    container.querySelector('#continue-home')?.addEventListener('click', () => navigate('home'));
  }

  render();
}
