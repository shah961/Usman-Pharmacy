/**
 * USMAN PHARMACY - GSAP Animations Module
 * Handles lightweight, subtle scroll reveals and entrance animations.
 * Automatically respects prefers-reduced-motion settings.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion || typeof gsap === 'undefined') {
    return; // Skip non-essential animations gracefully
  }

  initGSAPAnimations();
});

function initGSAPAnimations() {
  // 1. Hero Entrance Animation
  const heroTitle = document.querySelector('.hero-title');
  const heroBadge = document.querySelector('.hero-badge');
  const heroDesc = document.querySelector('.hero-description');
  const heroActions = document.querySelector('.hero-actions');
  const heroImage = document.querySelector('.hero-visual');

  if (heroTitle) {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out', duration: 0.8 } });

    if (heroBadge) tl.from(heroBadge, { opacity: 0, y: -10 });
    tl.from(heroTitle, { opacity: 0, y: 20 }, '-=0.6');
    if (heroDesc) tl.from(heroDesc, { opacity: 0, y: 15 }, '-=0.5');
    if (heroActions) tl.from(heroActions, { opacity: 0, y: 15 }, '-=0.5');
    if (heroImage) tl.from(heroImage, { opacity: 0, scale: 0.96 }, '-=0.6');
  }

  // 2. IntersectionObserver-driven Card Reveal
  const animateCards = document.querySelectorAll('.card, .category-card, .trust-item');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target, 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
          );
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    animateCards.forEach(card => observer.observe(card));
  }
}
