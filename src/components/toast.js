// Toast Notification System - Shneiderman: Informative Feedback
// Supports success, error, info types with optional undo action (Easy Reversal)

export function showToast(type = 'success', title = '', message = '', options = {}) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { success: '✅', error: '❌', info: 'ℹ️' };
    const id = 'toast-' + Date.now();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.id = id;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
    <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    ${options.actionText ? `<button class="toast-action" id="${id}-action">${options.actionText}</button>` : ''}
    <button class="toast-close" aria-label="Close notification">✕</button>`;

    container.appendChild(toast);

    // Action button (e.g., UNDO)
    if (options.actionText && options.actionFn) {
        toast.querySelector(`#${id}-action`).addEventListener('click', () => {
            options.actionFn();
            removeToast(toast);
        });
    }

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => removeToast(toast));

    // Auto dismiss
    setTimeout(() => removeToast(toast), options.duration || 4000);
}

function removeToast(toast) {
    if (!toast || !toast.parentNode) return;
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
}
