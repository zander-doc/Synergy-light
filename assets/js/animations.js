/* ============================================================
   SYNERGY LIGHT - Animations JavaScript
   Scroll animations, counters, parallax, hover effects
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initCounters();
  initTestimonialsSlider();
  initFAQAccordion();
  initStaggerAnimations();
});

/* ----- COUNTER ANIMATION ----- */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.count) || 0;
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    current += increment;

    if (step >= steps) {
      current = target;
      clearInterval(timer);
    }

    // Format number with commas
    element.textContent = Math.floor(current).toLocaleString('en-US') + 
      (element.dataset.suffix || '');
  }, duration / steps);
}

/* ----- TESTIMONIALS SLIDER ----- */
function initTestimonialsSlider() {
  const slider = document.querySelector('.testimonials-slider');
  if (!slider) return;

  const track = slider.querySelector('.testimonials-track');
  const cards = track.querySelectorAll('.testimonial-card');
  const dotsContainer = slider.querySelector('.testimonials-controls');
  const prevBtn = slider.querySelector('.testimonial-nav.prev');
  const nextBtn = slider.querySelector('.testimonial-nav.next');

  if (cards.length === 0) return;

  let currentIndex = 0;
  let autoplayInterval;

  // Create dots
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  function updateSlider() {
    const width = cards[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    
    // Update dots
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateSlider();
    resetAutoplay();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateSlider();
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateSlider();
  }

  function startAutoplay() {
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  // Touch support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoplayInterval);
  });

  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Handle resize
  window.addEventListener('resize', updateSlider);

  // Start autoplay
  startAutoplay();
}

/* ----- FAQ ACCORDION ----- */
function initFAQAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (faqItems.length === 0) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all FAQ items
      faqItems.forEach(other => {
        other.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ----- STAGGER ANIMATIONS ----- */
function initStaggerAnimations() {
  const staggerElements = document.querySelectorAll('[data-stagger]');
  if (staggerElements.length === 0) return;

  staggerElements.forEach(container => {
    const children = container.children;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          Array.from(children).forEach((child, index) => {
            child.style.animationDelay = `${index * 0.1}s`;
            child.classList.add('animate-fade-in-up');
          });
          observer.unobserve(container);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(container);
  });
}