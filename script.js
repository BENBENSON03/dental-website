// Concern copy and its bundled image live together so the finder works offline.
const concernData = {
  whiter: { label: 'A brighter smile', title: 'A little more light.', text: 'Professional whitening is one of the simplest ways to refresh your smile. We will find a shade that looks natural on you, never overdone.', time: '2–3 weeks', link: 'Professional Whitening', image: 'assets/whiter.jpg', alt: 'Patient smiling after teeth whitening' },
  straighter: { label: 'A clearer line', title: 'Room to smile freely.', text: 'Clear aligners gently guide your teeth into a more balanced position, with a plan designed around your routine and your goals.', time: '4–9 months', link: 'Clear Aligners', image: 'assets/aligners.jpg', alt: 'Patient showing a straight natural smile' },
  damaged: { label: 'Restoring confidence', title: 'Comfort, returned.', text: 'From a single tooth to a more considered restoration plan, we rebuild comfort and function with results that belong in your smile.', time: '8–24 weeks', link: 'Restorative Dentistry', image: 'assets/restorative.jpg', alt: 'Dentist and patient discussing restorative care' },
  balanced: { label: 'A considered shape', title: 'More balance, still you.', text: 'Smile design looks at the whole picture: proportion, shade, gum line and the way you naturally move when you smile.', time: '6–12 weeks', link: 'Smile Design', image: 'assets/smile.jpg', alt: 'Patient with a balanced bright smile' },
  'old-work': { label: 'A fresh beginning', title: 'Better than before.', text: 'Old dental work can be refreshed with a plan that respects what is already there and improves comfort, health and appearance.', time: '6–12 weeks', link: 'Porcelain Veneers', image: 'assets/clinic.jpg', alt: 'Modern calm dental clinic interior' },
  unsure: { label: 'Start with a conversation', title: 'We can work it out.', text: 'You do not need to know the name of a treatment. Bring us what you notice and we will help you find a thoughtful next step.', time: 'Your pace', link: 'Book a Consultation', image: 'assets/practice.jpg', alt: 'Comfortable modern dental treatment room' }
};

// Cache the finder elements once for quick updates after each selection.
const concernButtons = document.querySelectorAll('.concern-button');
const concernImage = document.querySelector('#concern-image');
const concernLabel = document.querySelector('#concern-label');
const concernTitle = document.querySelector('#concern-title');
const concernText = document.querySelector('#concern-text');
const concernTime = document.querySelector('#concern-time');
const concernLink = document.querySelector('#concern-link');

// Update the detail panel without navigating away from the finder.
concernButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const data = concernData[button.dataset.concern];
    concernButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-selected', active);
    });
    // Fade briefly while swapping the image so the change feels deliberate.
    concernImage.style.opacity = '0.3';
    setTimeout(() => {
      concernImage.src = data.image;
      concernImage.alt = data.alt;
      concernLabel.textContent = data.label;
      concernTitle.textContent = data.title;
      concernText.textContent = data.text;
      concernTime.textContent = data.time;
      concernLink.textContent = data.link;
      concernImage.style.opacity = '1';
    }, 180);
  });
});

// Keep the mobile menu easy to dismiss after a visitor chooses a section.
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', isOpen);
  mobileMenu.setAttribute('aria-hidden', !isOpen);
});
document.querySelectorAll('.mobile-menu a').forEach((link) => link.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', false);
  mobileMenu.setAttribute('aria-hidden', true);
}));

// All booking CTAs share one modal and one form state.
const backdrop = document.querySelector('.modal-backdrop');
const modalClose = document.querySelector('.modal-close');
const openModalButtons = document.querySelectorAll('[data-open-consultation]');
const closeModal = () => {
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', true);
  document.body.classList.remove('modal-open');
};
openModalButtons.forEach((button) => button.addEventListener('click', () => {
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', false);
  document.body.classList.add('modal-open');
  document.querySelector('.consultation-form input').focus();
}));
modalClose.addEventListener('click', closeModal);
backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });

// This static demo confirms the enquiry locally without pretending to send data.
document.querySelector('.consultation-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const status = document.querySelector('.form-status');
  status.textContent = 'Thank you. We will be in touch within one working day.';
  event.target.reset();
});

// Reveal content as it enters view so the long page loads calmly.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
