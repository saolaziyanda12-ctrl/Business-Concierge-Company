const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.main-nav');
const contactDialog = document.querySelector('.contact-dialog');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
  navigation?.classList.toggle('open', !isOpen);
});

navigation?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'Open navigation');
    navigation.classList.remove('open');
  });
});

document.querySelectorAll('[data-contact-open]').forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    contactDialog?.showModal();
    contactDialog?.querySelector('input[name="name"]')?.focus();
  });
});

contactDialog?.querySelector('.dialog-close')?.addEventListener('click', () => contactDialog.close());
contactDialog?.addEventListener('click', (event) => {
  if (event.target === contactDialog) contactDialog.close();
});

document.querySelectorAll('.contact-form').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = new FormData(form).get('name')?.toString().trim();
    const formStatus = form.querySelector('.form-status');
    if (formStatus) {
      formStatus.textContent = `Thanks${name ? `, ${name}` : ''}. This website’s contact form is not connected to an inbox yet, so your message has not been sent.`;
    }
  });
});

const revealItems = document.querySelectorAll('.service-row, .industry-grid > div, .tech-card');
const sectionRevealItems = document.querySelectorAll('.approach-main, .section-heading, .industries-intro, .tech-heading, .contact-intro');
const allRevealItems = [...revealItems, ...sectionRevealItems];
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  sectionRevealItems.forEach((item) => item.classList.add('section-reveal'));
  allRevealItems.forEach((item) => item.classList.add('reveal-ready'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });

  allRevealItems.forEach((item) => revealObserver.observe(item));
}
