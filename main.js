/**
 * USMAN PHARMACY - Main Functional Script
 * Handles Mobile Menu, Accessible Accordions, Form Validation, & Interactive UI
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileMenu();
  initAccordions();
  initFormValidation();
  initBackToTop();
});

/* --- 1. Sticky Header Shrink --- */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* --- 2. Mobile Navigation Logic (Zero Layout Bleed) --- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const overlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileMenu || !overlay) return;

  function openMenu() {
    mobileMenu.classList.add('active');
    overlay.classList.add('active');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  hamburgerBtn.addEventListener('click', openMenu);
  if (closeMenuBtn) closeMenuBtn.addEventListener('click', closeMenu);
  overlay.addEventListener('click', closeMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Accessible Escape Key Close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      closeMenu();
    }
  });
}

/* --- 3. Accessible Accordion Component --- */
function initAccordions() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isExpanded = header.getAttribute('aria-expanded') === 'true';

      // Close other active accordions
      document.querySelectorAll('.accordion-item').forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherHeader = otherItem.querySelector('.accordion-header');
          const otherContent = otherItem.querySelector('.accordion-content');
          if (otherHeader) otherHeader.setAttribute('aria-expanded', 'false');
          if (otherContent) otherContent.style.maxHeight = null;
        }
      });

      // Toggle current accordion
      if (isExpanded) {
        header.setAttribute('aria-expanded', 'false');
        item.classList.remove('active');
        item.querySelector('.accordion-content').style.maxHeight = null;
      } else {
        header.setAttribute('aria-expanded', 'true');
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

/* --- 4. Frontend Form Validation (No False Claims) --- */
function initFormValidation() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const message = document.getElementById('message');

    // Simple Name check
    if (!name.value.trim()) {
      showFieldError(name, 'name-error');
      isValid = false;
    } else {
      clearFieldError(name, 'name-error');
    }

    // Phone check (Basic length)
    if (!phone.value.trim() || phone.value.trim().length < 8) {
      showFieldError(phone, 'phone-error');
      isValid = false;
    } else {
      clearFieldError(phone, 'phone-error');
    }

    // Message check
    if (!message.value.trim()) {
      showFieldError(message, 'message-error');
      isValid = false;
    } else {
      clearFieldError(message, 'message-error');
    }

    if (isValid) {
      // Clear form inputs
      form.reset();
      
      // Transparent status message
      feedback.className = 'form-feedback success';
      feedback.innerHTML = '<strong>Thank you!</strong> Your message has been received on the frontend. Please note: for urgent medicine availability or immediate local delivery orders, please call the pharmacy directly at <a href="tel:+923234106544" style="text-decoration:underline;">0323 4106544</a>.';
      feedback.classList.remove('hidden');
    }
  });

  function showFieldError(field, errorId) {
    field.classList.add('invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.classList.add('visible');
  }

  function clearFieldError(field, errorId) {
    field.classList.remove('invalid');
    const errEl = document.getElementById(errorId);
    if (errEl) errEl.classList.remove('visible');
  }
}

/* --- 5. Back To Top Button --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
