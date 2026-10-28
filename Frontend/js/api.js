/* Frontend demo helpers. Replace DEMO_MODE and endpoint paths when Flask is ready. */
window.KC = {
  DEMO_MODE: true,
  API_BASE_URL: 'http://127.0.0.1:5000/api',
  getSaved(key, fallback = []) { try { return JSON.parse(localStorage.getItem(`kc_${key}`)) ?? fallback; } catch { return fallback; } },
  save(key, value) { localStorage.setItem(`kc_${key}`, JSON.stringify(value)); },
  async request(path, options = {}) {
    if (this.DEMO_MODE) throw new Error('The Flask API is not connected yet. This screen is showing demo behaviour.');
    const response = await fetch(`${this.API_BASE_URL}${path}`, { ...options, headers: { ...(options.headers || {}) } });
    if (!response.ok) throw new Error('The request could not be completed. Please try again.');
    return response.json();
  }
};
document.querySelectorAll('form[data-demo-form]:not([data-save])').forEach(form => form.addEventListener('submit', event => {
  if (form.querySelector('#new-password') || form.querySelector('#role') || form.id === 'identify-form') return;
  event.preventDefault(); if (!form.reportValidity()) return;
  const feedback = form.querySelector('.form-feedback');
  if (feedback) feedback.innerHTML = '<div class="alert alert-success mb-0">Saved in this demo. Connect the Flask API to save this securely.</div>';
}));
