// ===== NAV: état au scroll =====
const nav = document.getElementById('nav');
const toTop = document.getElementById('toTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 40);
  toTop.classList.toggle('show', y > 600);
}, { passive: true });

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ===== MENU MOBILE =====
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== FILTRE GALERIE =====
const filters = document.querySelectorAll('.filter');
const frames = document.querySelectorAll('.frame');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(f => f.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.filter;
    frames.forEach(frame => {
      const match = cat === 'all' || frame.dataset.cat === cat;
      frame.classList.toggle('hide', !match);
    });
  });
});

// ===== SCROLL REVEAL =====
const revealTargets = document.querySelectorAll(
  '.why__item, .service, .frame, .about__img, .about__body, .section-title'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => io.observe(el));

// ===== FORMULAIRE DE CONTACT =====
const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  // Ouvre le client mail avec les infos pré-remplies.
  // À remplacer par un vrai backend (Formspree, Resend, etc.) — voir README.
  const mailto = `mailto:contact@franckyrakoto.com?subject=${encodeURIComponent('Projet: ' + subject)}&body=${encodeURIComponent(`Nom: ${name}\nEmail: ${email}\n\n${message}`)}`;
  window.location.href = mailto;

  note.textContent = "Votre client mail va s'ouvrir pour finaliser l'envoi.";
  form.reset();
});

// ===== ANNÉE FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();
