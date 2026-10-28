document.querySelectorAll('form').forEach(form => form.addEventListener('submit', event => {
  event.preventDefault(); if (!form.reportValidity()) return;
  const feedback = form.querySelector('.form-feedback');
  if (document.querySelector('#new-password')) {
    const password = document.querySelector('#new-password').value;
    if (password !== document.querySelector('#confirm-password').value) { feedback.innerHTML = '<div class="alert alert-danger">Those passwords do not match. Please check and try again.</div>'; return; }
    const user = { name: document.querySelector('#name').value.trim(), role: document.querySelector('#account-role').value };
    localStorage.setItem('kc_user', JSON.stringify(user)); feedback.innerHTML = '<div class="alert alert-success">Demo account created. Opening your dashboard…</div>';
    setTimeout(() => location.href = user.role === 'recycler' ? 'recycler-dashboard.html' : 'collector-dashboard.html', 650); return;
  }
  const role = document.querySelector('#role').value; localStorage.setItem('kc_user', JSON.stringify({ name: 'friend', role }));
  feedback.innerHTML = '<div class="alert alert-success">Demo login successful. Opening your dashboard…</div>';
  setTimeout(() => location.href = role === 'recycler' ? 'recycler-dashboard.html' : 'collector-dashboard.html', 650);
}));
