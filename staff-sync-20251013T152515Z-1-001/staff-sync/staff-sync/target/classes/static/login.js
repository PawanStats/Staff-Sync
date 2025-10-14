document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('form');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('mt-4', 'p-3', 'rounded-lg', 'text-sm', 'hidden', 'text-center');
  loginForm.parentElement.appendChild(messageDiv);

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      messageDiv.textContent = 'Please enter both email and password.';
      messageDiv.classList.remove('hidden', 'text-green-500');
      messageDiv.classList.add('text-red-500', 'bg-neutral-100', 'dark:bg-neutral-800');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
      localStorage.setItem('token', data.token);
      messageDiv.textContent = 'Login successful! Redirecting to Employees...';
      messageDiv.classList.remove('hidden', 'text-red-500');
      messageDiv.classList.add('text-green-500', 'bg-neutral-100', 'dark:bg-neutral-800');
      setTimeout(() => {
        window.location.href = 'Employees.html';
      }, 1500);
    } catch (error) {
      messageDiv.textContent = error.message;
      messageDiv.classList.remove('hidden', 'text-green-500');
      messageDiv.classList.add('text-red-500', 'bg-neutral-100', 'dark:bg-neutral-800');
    }
  });
});