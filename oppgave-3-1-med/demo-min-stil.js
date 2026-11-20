const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

mobileToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('active');
  mobileToggle.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    navLinks.classList.remove('active');
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.focus();
  }
});

const demoForm = document.getElementById('demoContactForm');
const successMessage = document.getElementById('successMessage');

demoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  let valid = true;

  demoForm.querySelectorAll('[required]').forEach((field) => {
    const error = document.getElementById(`${field.id}Error`);
    if (!field.value.trim()) {
      field.classList.add('error');
      if (error) error.textContent = 'This field is required.';
      valid = false;
    } else {
      field.classList.remove('error');
      if (error) error.textContent = '';
    }
  });

  const email = document.getElementById('contactEmail');
  if (email.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    document.getElementById('emailError').textContent = 'Enter a valid email address.';
    valid = false;
  }

  if (valid) {
    demoForm.style.display = 'none';
    successMessage.style.display = 'block';
  }
});
