const observer = new MutationObserver(() => {
    const statusEl = document.getElementById('status');
    const cardEl = document.getElementById('popupCard');
    if (statusEl && cardEl) {
        if (statusEl.classList.contains('loading')) {
            cardEl.classList.add('is-loading');
        } else {
            cardEl.classList.remove('is-loading');
        }
    }
});
const statusTarget = document.getElementById('status');
if (statusTarget) {
    observer.observe(statusTarget, { attributes: true, attributeFilter: ['class'] });
}
