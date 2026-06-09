// Google Apps Script integration
const API_URL = 'https://script.google.com/macros/s/AKfycbyd61CwRGy0aInI9IsN_Rr5tWZXggucgXFClijc5eXJsAvry-ZdHiUjgkNjJc7wQMxmtw/exec';

async function fetchGuestName(token) {
  try {
    const response = await fetch(`${API_URL}?token=${encodeURIComponent(token)}`);
    const data = await response.json();
    if (data.status === 'ok' && data.name) {
      return data.name;
    }
    return null;
  } catch (error) {
    console.error('Error fetching guest name:', error);
    return null;
  }
}

async function initGuestName() {
  const urlParams = new URLSearchParams(window.location.search);
  let token = urlParams.get('code');
  if (!token) {
    token = localStorage.getItem('weddingToken');
  }
  if (token) {
    localStorage.setItem('weddingToken', token);
    if (urlParams.has('code')) {
      urlParams.delete('code');
      const newUrl = window.location.pathname + (urlParams.toString() ? '?' + urlParams.toString() : '');
      window.history.replaceState({}, document.title, newUrl);
    }
    const name = await fetchGuestName(token);
    if (name) {
      const guestNameEl = document.getElementById('guestName');
      const formGuestNameEl = document.getElementById('formGuestName');
      if (guestNameEl) {
        guestNameEl.textContent = `Дорогой(ая) ${name}!`;
      }
      if (formGuestNameEl) {
        formGuestNameEl.textContent = name;
      }
    }
  }
}

// Initialize guest name on page load
initGuestName();

// Timer
function updateTimer() {
  const weddingDate = new Date('2026-09-12T15:00:00').getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance > 0) {
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
}

setInterval(updateTimer, 1000);
updateTimer();

// RSVP Form
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('formGuestName').textContent || 'Гость';
  alert('Спасибо, ' + name + '! Ваше подтверждение получено.');
  this.reset();
});

// Scroll Animation
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

// Parallax effect on hero
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  if (scrolled < window.innerHeight) {
    hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
  }
});
