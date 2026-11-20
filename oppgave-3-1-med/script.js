// World Conquest - War Room Interface

// Hamburger menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
  hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.focus();
  }
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navigation scroll effect
const mainNav = document.querySelector('.main-nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    mainNav.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.6)';
  } else {
    mainNav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// Enlist button handlers
const enlistButtons = document.querySelectorAll('.enlist-btn, .primary-order');
enlistButtons.forEach(button => {
  button.addEventListener('click', () => {
    alert('Campaign deployment in progress. Join the command center for updates.');
  });
});

// Intel/Learn More handlers
const intelButtons = document.querySelectorAll('.secondary-order, .intel-order');
intelButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    if (button.tagName === 'BUTTON') {
      const commandSection = document.querySelector('#command');
      if (commandSection) {
        commandSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Faction profile interaction
const factionProfiles = document.querySelectorAll('.faction-profile');
factionProfiles.forEach(profile => {
  profile.addEventListener('click', () => {
    const designation = profile.querySelector('.faction-designation').textContent;
    alert(`${designation} selected. Faction briefing available in command center.`);
  });
});

// Map grid animation on scroll
const mapOverlay = document.querySelector('.map-overlay');
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  if (mapOverlay) {
    mapOverlay.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.02}deg)`;
  }
});

// Intersection observer for fade-in effects
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -80px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('.territories-briefing, .command-doctrine, .faction-roster, .final-orders').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(40px)';
  section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  fadeObserver.observe(section);
});

// Operation briefs stagger
const operationBriefs = document.querySelectorAll('.operation-brief');
operationBriefs.forEach((brief, index) => {
  brief.style.opacity = '0';
  brief.style.transform = 'translateY(30px)';
  brief.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
});

const briefObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

operationBriefs.forEach(brief => briefObserver.observe(brief));

// Strategic grid pulsing effect
const strategicGrid = document.querySelector('.strategic-grid');
if (strategicGrid) {
  setInterval(() => {
    strategicGrid.style.opacity = Math.random() * 0.3 + 0.7;
  }, 3000);
}

// Contact form validation and local confirmation
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // Reset previous errors
  document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
  document.querySelectorAll('.form-input, .form-textarea').forEach(el => el.classList.remove('error'));
  
  let isValid = true;
  
  // Validate name
  const name = document.getElementById('commanderName');
  if (name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Commander name is required';
    name.classList.add('error');
    isValid = false;
  }
  
  // Validate email
  const email = document.getElementById('email');
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.value.trim() === '') {
    document.getElementById('emailError').textContent = 'Email address is required';
    email.classList.add('error');
    isValid = false;
  } else if (!emailPattern.test(email.value)) {
    document.getElementById('emailError').textContent = 'Please enter a valid email address';
    email.classList.add('error');
    isValid = false;
  }
  
  // Validate message
  const message = document.getElementById('message');
  if (message.value.trim() === '') {
    document.getElementById('messageError').textContent = 'Message is required';
    message.classList.add('error');
    isValid = false;
  } else if (message.value.trim().length < 10) {
    document.getElementById('messageError').textContent = 'Message must be at least 10 characters';
    message.classList.add('error');
    isValid = false;
  }
  
  if (isValid) {
    // Hide form and show success message
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    
    // This project has no backend, so the form only confirms local validation.
    console.log('Form submitted:', {
      name: name.value,
      email: email.value,
      message: message.value
    });
    
    // Reset form after 5 seconds
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      formSuccess.style.display = 'none';
    }, 5000);
  }
});

console.log('🗺️ World Conquest Command Center Active');
