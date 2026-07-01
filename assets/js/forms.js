/* ============================================================
   SYNERGY LIGHT - Form Validation & Submission
   ============================================================ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initQuoteForm();
  initNewsletterForm();
});

/* ----- CONTACT FORM ----- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: form.querySelector('#contact-name'),
    email: form.querySelector('#contact-email'),
    phone: form.querySelector('#contact-phone'),
    city: form.querySelector('#contact-city'),
    message: form.querySelector('#contact-message'),
    privacy: form.querySelector('#contact-privacy')
  };

  const successMessage = form.querySelector('.form-success');

  // Real-time validation
  Object.values(fields).forEach(field => {
    if (!field) return;
    field.addEventListener('blur', () => validateField(field));
    field.addEventListener('input', () => {
      if (field.closest('.form-group')?.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  function validateField(field) {
    const group = field.closest('.form-group');
    if (!group) return true;

    const error = group.querySelector('.form-error');
    let isValid = true;
    let errorMessage = '';

    if (field.hasAttribute('required') && !field.value.trim()) {
      isValid = false;
      errorMessage = 'Este campo es requerido';
    }

    if (field.type === 'email' && field.value.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Ingresa un email válido';
      }
    }

    if (field.id === 'contact-phone' && field.value.trim()) {
      const phoneRegex = /^[\d\s\-\(\)\+]{7,15}$/;
      if (!phoneRegex.test(field.value.trim())) {
        isValid = false;
        errorMessage = 'Ingresa un teléfono válido';
      }
    }

    if (field.type === 'checkbox' && field.hasAttribute('required') && !field.checked) {
      isValid = false;
      errorMessage = 'Debes aceptar la política de privacidad';
    }

    group.classList.toggle('error', !isValid);
    if (error) {
      error.textContent = errorMessage;
    }

    return isValid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isFormValid = true;
    Object.values(fields).forEach(field => {
      if (field && !validateField(field)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) return;

    // Submit to Formspree
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      
      const response = await fetch('https://formspree.io/f/xrbqpklm', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        form.style.display = 'none';
        if (successMessage) {
          successMessage.classList.add('show');
        }
        showToast('Mensaje enviado con éxito. Te contactaremos pronto.', 'success');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el envío');
      }
    } catch (error) {
      console.error('Error:', error);
      showToast('Error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos por WhatsApp.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ----- QUOTE FORM (Quick Quote) ----- */
function initQuoteForm() {
  const form = document.getElementById('quote-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      form.reset();
      showToast('Cotización solicitada. Te llamaremos pronto.', 'success');
      
      // Redirect to WhatsApp as backup
      const name = form.querySelector('#quote-name')?.value || '';
      const phone = form.querySelector('#quote-phone')?.value || '';
      const message = `Hola, soy ${name}. Solicito una cotización. Mi teléfono es ${phone}.`;
      const whatsappUrl = `https://wa.me/1${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
      
      // Open WhatsApp in new tab (optional, commented by default)
      // window.open(whatsappUrl, '_blank');
    } catch (error) {
      showToast('Error al enviar. Intenta de nuevo.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

/* ----- NEWSLETTER FORM ----- */
function initNewsletterForm() {
  const forms = document.querySelectorAll('.footer-newsletter');
  if (forms.length === 0) return;

  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const email = input.value.trim();

      if (!email) {
        showToast('Ingresa tu email para suscribirte', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast('Ingresa un email válido', 'error');
        return;
      }

      const submitBtn = form.querySelector('button');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = '...';
      submitBtn.disabled = true;

      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        input.value = '';
        showToast('¡Suscrito con éxito! Gracias.', 'success');
      } catch (error) {
        showToast('Error al suscribir. Intenta de nuevo.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
}

/* ----- TOAST NOTIFICATION ----- */
function showToast(message, type = 'success') {
  // Remove existing toast
  const existingToast = document.querySelector('.toast');
  if (existingToast) {
    existingToast.remove();
  }

  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.innerHTML = `
    <span class="toast-icon ${type}">
      ${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
    </span>
    <span class="toast-text">${message}</span>
  `;

  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}