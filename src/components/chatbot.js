// Chatbot Widget - User Support System (Lecture 20)
// Provides contextual help, quick replies, and guided assistance

import { navigate } from '../main.js';

export function renderChatbot(container) {
    const quickReplies = [
        { text: '🔍 How to search?', answer: 'Use the search bar at the top or press "/" to focus. Type any product name and we\'ll suggest results instantly!' },
        { text: '🛒 How to checkout?', answer: 'Add items to cart, click Cart icon (or press C), review your items, then click "Proceed to Checkout". Follow the 3-step process: Address → Payment → Confirm!' },
        { text: '📦 Track my order', answer: 'Go to Order Tracking from your Profile or after placing an order. You\'ll see real-time status updates!' },
        { text: '⌨️ Keyboard shortcuts?', answer: 'Press Shift+? to see all shortcuts. Quick ones: H=Home, S=Search, C=Cart, P=Profile, /=Focus Search' },
        { text: '♿ Accessibility?', answer: 'Visit our Accessibility page to adjust font size, enable high contrast, color-blind mode, or dark theme. We believe in Universal Design!' },
        { text: '💬 Contact support', answer: 'Email: support@freshcart.in | Phone: 1800-123-4567 (24/7) | Or visit our Help Center for detailed FAQs.' },
    ];

    container.innerHTML = `
    <button class="chatbot-trigger" id="chatbot-toggle" aria-label="Open help chat">💬</button>
    <div class="chatbot-panel" id="chatbot-panel">
      <div class="chatbot-header">
        <h4>🤖 FreshCart Help</h4>
        <button id="chatbot-close" style="background:none;border:none;color:#fff;font-size:1.2rem;cursor:pointer;">✕</button>
      </div>
      <div class="chatbot-body" id="chatbot-body">
        <div class="chat-msg bot">Hi! 👋 I'm here to help you with FreshCart. What do you need?</div>
        <div class="chat-quick-replies" id="chat-replies">
          ${quickReplies.map((q, i) => `<button class="chat-quick-reply" data-idx="${i}">${q.text}</button>`).join('')}
        </div>
      </div>
      <div class="chatbot-input">
        <input type="text" id="chat-input" placeholder="Type a question..." aria-label="Chat message" />
        <button id="chat-send" aria-label="Send message">➤</button>
      </div>
    </div>`;

    const toggle = container.querySelector('#chatbot-toggle');
    const panel = container.querySelector('#chatbot-panel');
    const closeBtn = container.querySelector('#chatbot-close');
    const body = container.querySelector('#chatbot-body');
    const input = container.querySelector('#chat-input');

    toggle.addEventListener('click', () => { panel.classList.toggle('open'); if (panel.classList.contains('open')) input.focus(); });
    closeBtn.addEventListener('click', () => panel.classList.remove('open'));

    // Quick replies
    container.querySelector('#chat-replies').addEventListener('click', (e) => {
        const btn = e.target.closest('.chat-quick-reply');
        if (!btn) return;
        const idx = parseInt(btn.dataset.idx);
        const q = quickReplies[idx];
        addMsg('user', q.text);
        setTimeout(() => addMsg('bot', q.answer), 500);
    });

    // Free text input
    const sendMsg = () => {
        const text = input.value.trim();
        if (!text) return;
        addMsg('user', text);
        input.value = '';
        setTimeout(() => {
            const lower = text.toLowerCase();
            let response = "I'm not sure about that. Try our Help Center for more information, or call 1800-123-4567!";
            if (lower.includes('search') || lower.includes('find')) response = "Use the search bar at the top or press '/' to focus it. Start typing and suggestions will appear!";
            else if (lower.includes('cart') || lower.includes('order')) response = "Press 'C' to go to your cart. From there you can checkout in 3 easy steps!";
            else if (lower.includes('deliver')) response = "We deliver within 30 minutes in most areas. Minimum order ₹200 for free delivery!";
            else if (lower.includes('return') || lower.includes('refund')) response = "We offer hassle-free returns within 24 hours. Contact support for immediate refund processing.";
            else if (lower.includes('help') || lower.includes('support')) response = "Visit our Help page for FAQs, tutorials, and contact options. Press the Help button in the navbar!";
            addMsg('bot', response);
        }, 700);
    };

    container.querySelector('#chat-send').addEventListener('click', sendMsg);
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });

    function addMsg(type, text) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${type}`;
        msg.textContent = text;
        // Insert before quick replies or at end
        const replies = body.querySelector('.chat-quick-replies');
        if (replies) body.insertBefore(msg, replies);
        else body.appendChild(msg);
        body.scrollTop = body.scrollHeight;
    }
}
