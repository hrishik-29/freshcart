// Footer Component - Gestalt: Proximity (grouped links), Web Usability conventions
import { navigate } from '../main.js';

export function renderFooter(container) {
    container.innerHTML = `
    <div class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-col">
            <h4 style="font-size:1.2rem;text-transform:none;letter-spacing:0;">🛒 FreshCart</h4>
            <p>Your premium online grocery store. Fresh produce, organic products, and daily essentials delivered to your doorstep in minutes.</p>
            <div class="footer-social">
              <a href="#" aria-label="Facebook">📘</a>
              <a href="#" aria-label="Twitter">🐦</a>
              <a href="#" aria-label="Instagram">📸</a>
              <a href="#" aria-label="YouTube">📺</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#" data-page="home">Home</a></li>
              <li><a href="#" data-page="search">All Products</a></li>
              <li><a href="#" data-page="cart">My Cart</a></li>
              <li><a href="#" data-page="profile">My Account</a></li>
              <li><a href="#" data-page="order-tracking">Track Order</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#" data-page="help">Help Center</a></li>
              <li><a href="#" data-page="help">FAQs</a></li>
              <li><a href="#" data-page="help">Contact Us</a></li>
              <li><a href="#" data-page="accessibility">Accessibility</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Contact</h4>
            <ul>
              <li>📧 support@freshcart.in</li>
              <li>📞 1800-123-4567</li>
              <li>🕐 24/7 Customer Support</li>
              <li>📍 Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 FreshCart. All rights reserved. | CS23B1083 - HCI End Sem Project</span>
          <span>Designed with ❤️ applying HCI Principles</span>
        </div>
      </div>
    </div>`;

    container.querySelectorAll('[data-page]').forEach(link => {
        link.addEventListener('click', (e) => { e.preventDefault(); navigate(link.dataset.page); });
    });
}
