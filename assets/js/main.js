/* ============================================================
   SYNERGY LIGHT - Main JavaScript
   Empresa de EnergÃ­a ElÃ©ctrica Residencial en Texas
   ============================================================ */

'use strict';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initSmoothScroll();
  initScrollAnimations();
  initLazyLoading();
  initBackToTop();
  initParticles();
  initHeaderPremium();
});

/* ----- SMOOTH SCROLL ----- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ----- SCROLL ANIMATIONS (Intersection Observer) ----- */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .fade-in-up');
  
  if (animatedElements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));
}

/* ----- LAZY LOADING IMAGES ----- */
function initLazyLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback for browsers that don't support lazy loading
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length === 0) return;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
  }
}

/* ----- BACK TO TOP BUTTON ----- */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ----- PARTICLES BACKGROUND ----- */
function initParticles() {
  const container = document.querySelector('.hero-particles');
  if (!container) return;

  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    const size = Math.random() * 4 + 2;
    const posX = Math.random() * 100;
    const delay = Math.random() * 15;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = posX + '%';
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    
    container.appendChild(particle);
  }
}

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   HEADER PREMIUM - FUNCIONALIDAD
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

function initHeaderPremium() {
  const header = document.getElementById('header');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  
  // Efecto sticky al hacer scroll
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }
  
  // MenÃº hamburguesa funcionalidad
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Cerrar menÃº al hacer click en un link
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    
    // Cerrar menÃº al hacer click fuera
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Selector de idioma funcionalidad
  const langBtns = document.querySelectorAll('.lang-btn');
  langBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const lang = this.getAttribute('data-lang');
      
      // Remover active de todos los botones
      langBtns.forEach(b => b.classList.remove('active'));
      
      // Agregar active al botÃ³n clickeado
      this.classList.add('active');
      
      // AquÃ­ puedes agregar la lÃ³gica de traducciÃ³n
      console.log(`Idioma cambiado a: ${lang}`);
    });
  });
}

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   EFECTO RIPPLE EN BOTONES PREMIUM
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn-hero-premium').forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.style.width = '20px';
      ripple.style.height = '20px';
      ripple.style.marginLeft = '-10px';
      ripple.style.marginTop = '-10px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   VERIFICACIÃ“N DE CÃ“DIGO POSTAL
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

function verificarCodigo() {
  const zipInput = document.getElementById('zipCode');
  const zipStatus = document.getElementById('zipStatus');
  const zip = zipInput.value.trim();
  
  // Validar formato (5 dÃ­gitos)
  const zipRegex = /^\d{5}$/;
  
  if (!zip) {
    zipStatus.textContent = 'âš ï¸� Ingresa un cÃ³digo postal';
    zipStatus.className = 'paso-status error';
    return;
  }
  
  if (!zipRegex.test(zip)) {
    zipStatus.textContent = 'â�Œ CÃ³digo postal invÃ¡lido (5 dÃ­gitos)';
    zipStatus.className = 'paso-status error';
    return;
  }
  
  // Simular verificaciÃ³n (en producciÃ³n, conectar con API)
  zipStatus.textContent = 'â�³ Verificando...';
  zipStatus.className = 'paso-status';
  
  setTimeout(() => {
    // SimulaciÃ³n: cÃ³digos de Texas comienzan con 75, 76, 77, 78, 79
    const texasPrefixes = ['75', '76', '77', '78', '79'];
    const isTexas = texasPrefixes.some(prefix => zip.startsWith(prefix));
    
    if (isTexas) {
      zipStatus.innerHTML = 'âœ… Â¡Excelente! EstÃ¡s en nuestra zona de cobertura';
      zipStatus.className = 'paso-status success';
      
      // Scroll suave al paso 2
      setTimeout(() => {
        const paso2 = document.querySelector('[data-paso="2"]');
        if (paso2) {
          paso2.scrollIntoView({ behavior: 'smooth', block: 'center' });
          paso2.style.transform = 'scale(1.05)';
          setTimeout(() => {
            paso2.style.transform = '';
          }, 1000);
        }
      }, 1000);
    } else {
      zipStatus.innerHTML = 'âš ï¸� CÃ³digo fuera de Texas. ContÃ¡ctanos para mÃ¡s info';
      zipStatus.className = 'paso-status error';
    }
  }, 1500);
}

// Permitir Enter en el input
document.addEventListener('DOMContentLoaded', function() {
  const zipInput = document.getElementById('zipCode');
  if (zipInput) {
    zipInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        verificarCodigo();
      }
    });
    
    // Solo permitir nÃºmeros
    zipInput.addEventListener('input', function(e) {
      this.value = this.value.replace(/[^0-9]/g, '');
    });
  }
});

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   CONTADOR ANIMADO DE CLIENTES
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

function animateCounter() {
  const counter = document.querySelector('.counter-number');
  if (!counter) return;
  
  const target = parseInt(counter.getAttribute('data-target'));
  const duration = 2000; // 2 segundos
  const step = target / (duration / 16); // 60fps
  let current = 0;
  
  const updateCounter = () => {
    current += step;
    if (current < target) {
      counter.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      counter.textContent = target.toLocaleString();
    }
  };
  
  // Iniciar cuando sea visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        updateCounter();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });
  
  observer.observe(counter);
}

// Iniciar contador cuando cargue la pÃ¡gina
document.addEventListener('DOMContentLoaded', animateCounter);

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   SCROLL SUAVE A VERIFICACIÃ“N
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

function scrollToVerification() {
  const zipInput = document.getElementById('zipCode');
  if (zipInput) {
    zipInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => zipInput.focus(), 500);
  }
}

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   MAPA INTERACTIVO - TOOLTIP Y HOVER
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

document.addEventListener('DOMContentLoaded', function() {
  const zones = document.querySelectorAll('.zone');
  const tooltip = document.getElementById('mapTooltip');
  if (!zones.length || !tooltip) return;
  
  const tooltipTitle = tooltip.querySelector('.tooltip-title');
  const tooltipInfo = tooltip.querySelector('.tooltip-info');
  const mapWrapper = document.querySelector('.texas-map-interactive-wrapper');
  if (!tooltipTitle || !tooltipInfo || !mapWrapper) return;
  
  zones.forEach(zone => {
    // Mouse enter - mostrar tooltip
    zone.addEventListener('mouseenter', function(e) {
      const zoneName = this.getAttribute('data-zone');
      const zoneInfo = this.getAttribute('data-info');
      
      tooltipTitle.textContent = zoneName;
      tooltipInfo.textContent = zoneInfo;
      tooltip.classList.add('active');
    });
    
    // Mouse move - seguir el cursor
    zone.addEventListener('mousemove', function(e) {
      const rect = mapWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Posicionar tooltip cerca del cursor pero sin tapar
      let tooltipX = x + 20;
      let tooltipY = y + 20;
      
      // Evitar que se salga del contenedor
      const tooltipWidth = tooltip.offsetWidth;
      const tooltipHeight = tooltip.offsetHeight;
      
      if (tooltipX + tooltipWidth > rect.width) {
        tooltipX = x - tooltipWidth - 20;
      }
      if (tooltipY + tooltipHeight > rect.height) {
        tooltipY = y - tooltipHeight - 20;
      }
      
      tooltip.style.left = tooltipX + 'px';
      tooltip.style.top = tooltipY + 'px';
    });
    
    // Mouse leave - ocultar tooltip
    zone.addEventListener('mouseleave', function() {
      tooltip.classList.remove('active');
    });
    
    // Click - scroll a informaciÃ³n de la zona
    zone.addEventListener('click', function() {
      const zoneName = this.getAttribute('data-zone');
      console.log('Zona seleccionada:', zoneName);
      // AquÃ­ puedes agregar navegaciÃ³n o modal
    });
  });
});

/* â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�
   SLIDER DE TESTIMONIOS
   â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•�â•� */

let currentTestimonialGroup = 1;
const totalTestimonialGroups = 3;

function changeTestimonialGroup(direction) {
  // Ocultar grupo actual
  const currentGroup = document.querySelector(`.testimonios-group[data-group="${currentTestimonialGroup}"]`);
  if (currentGroup) {
    currentGroup.classList.remove('active');
  }
  
  // Calcular nuevo grupo
  currentTestimonialGroup += direction;
  
  // Loop infinito
  if (currentTestimonialGroup > totalTestimonialGroups) {
    currentTestimonialGroup = 1;
  } else if (currentTestimonialGroup < 1) {
    currentTestimonialGroup = totalTestimonialGroups;
  }
  
  // Mostrar nuevo grupo
  const newGroup = document.querySelector(`.testimonios-group[data-group="${currentTestimonialGroup}"]`);
  if (newGroup) {
    newGroup.classList.add('active');
  }
  
  // Actualizar dots
  updateSliderDots();
}

function goToTestimonialGroup(groupNumber) {
  // Ocultar grupo actual
  const currentGroup = document.querySelector(`.testimonios-group[data-group="${currentTestimonialGroup}"]`);
  if (currentGroup) {
    currentGroup.classList.remove('active');
  }
  
  // Mostrar nuevo grupo
  currentTestimonialGroup = groupNumber;
  const newGroup = document.querySelector(`.testimonios-group[data-group="${currentTestimonialGroup}"]`);
  if (newGroup) {
    newGroup.classList.add('active');
  }
  
  // Actualizar dots
  updateSliderDots();
}

function updateSliderDots() {
  const dots = document.querySelectorAll('.slider-dot');
  dots.forEach((dot, index) => {
    if (index + 1 === currentTestimonialGroup) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

// Auto-play opcional (descomentar si se desea)
/*
setInterval(() => {
  changeTestimonialGroup(1);
}, 6000); // Cambia cada 6 segundos
*/

// -------------------------------------------------------
// ANIMACIONES AL SCROLL - SOPORTE TÉCNICO
// -------------------------------------------------------

function initSoporteAnimations() {
  const cards = document.querySelectorAll('.soporte-card');
  if (cards.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => observer.observe(card));
}

document.addEventListener('DOMContentLoaded', initSoporteAnimations);

// -------------------------------------------------------
// CREAR PARTÍCULAS DINÁMICAMENTE
// -------------------------------------------------------

function createSoporteParticles() {
  const container = document.querySelector('.soporte-particles');
  if (!container) return;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.classList.add('soporte-particle');

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = left + '%';
    particle.style.animationDuration = duration + 's';
    particle.style.animationDelay = delay + 's';

    container.appendChild(particle);
  }
}

document.addEventListener('DOMContentLoaded', createSoporteParticles);

// ============================================================
// MODALES - CONSULTA DE FACTURAS Y CITAS
// ============================================================

// Modal Consulta de Facturas
function abrirModalFacturas() {
  const modal = document.getElementById('modalFacturas');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function cerrarModalFacturas(event) {
  if (!event || event.target.id === 'modalFacturas') {
    const modal = document.getElementById('modalFacturas');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

function enviarConsultaFacturas(e) {
  e.preventDefault();

  const nombre = document.getElementById('facturaNombre').value;
  const email = document.getElementById('facturaEmail').value;
  const telefono = document.getElementById('facturaTelefono').value;
  const ssid = document.getElementById('facturaSSID').value || 'No especificado';
  const tipo = document.getElementById('facturaTipo').value;
  const mensaje = document.getElementById('facturaMensaje').value || 'Sin mensaje adicional';

  const tiposConsulta = {
    'factura': 'Información de factura',
    'pago': 'Métodos de pago',
    'historial': 'Historial de pagos',
    'otro': 'Otro'
  };

  // Abrir mailto
  const subject = `Consulta de Facturas - ${nombre}`;
  const body = `Hola Synergy Light,%0D%0A%0D%0A` +
    `Solicito información sobre: ${tiposConsulta[tipo]}%0D%0A%0D%0A` +
    `Mis datos:%0D%0A` +
    `• Nombre: ${nombre}%0D%0A` +
    `• Email: ${email}%0D%0A` +
    `• Teléfono: ${telefono}%0D%0A` +
    `• SSID: ${ssid}%0D%0A%0D%0A` +
    `Mensaje: ${mensaje}%0D%0A%0D%0A` +
    `Gracias.`;

  window.location.href = `mailto:synergylightservices@gmail.com?subject=${subject}&body=${body}`;

  cerrarModalFacturas();

  if (typeof showToast === 'function') {
    showToast('Se abrirá tu cliente de correo. Te responderemos en menos de 24 horas.', 'success');
  }

  document.getElementById('formConsultaFacturas').reset();
}

// Modal Programación de Citas
function abrirModalCitas() {
  const modal = document.getElementById('modalCitas');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function cerrarModalCitas(event) {
  if (!event || event.target.id === 'modalCitas') {
    const modal = document.getElementById('modalCitas');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

function agendarCitaWhatsApp(e) {
  e.preventDefault();

  const nombre = document.getElementById('citaNombre').value;
  const telefono = document.getElementById('citaTelefono').value;
  const fecha = document.getElementById('citaFecha').value;
  const tipo = document.getElementById('citaTipo').value;
  const mensajeAdicional = document.getElementById('citaMensaje').value;

  const tiposAsesoria = {
    'conexion': 'Asesoría para nueva conexión',
    'cambio': 'Cambio de plan',
    'renovacion': 'Renovación de contrato',
    'otro': 'Otro'
  };

  // Formatear fecha
  const fechaObj = new Date(fecha + 'T12:00:00');
  const fechaFormateada = fechaObj.toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Crear mensaje de WhatsApp
  const mensaje = `Hola Synergy Light! 👋%0D%0A%0D%0A` +
    `Quiero agendar una cita para:%0D%0A` +
    ` ${tiposAsesoria[tipo]}%0D%0A` +
    `️ Fecha preferida: ${fechaFormateada}%0D%0A%0D%0A` +
    `Mis datos:%0D%0A` +
    `👤 Nombre: ${nombre}%0D%0A` +
    `📞 Teléfono: ${telefono}%0D%0A%0D%0A` +
    (mensajeAdicional ? `💬 Mensaje: ${mensajeAdicional}%0D%0A%0D%0A` : '') +
    `Gracias!`;

  // Redirigir a WhatsApp
  const whatsappUrl = `https://wa.me/14092800661?text=${mensaje}`;
  window.open(whatsappUrl, '_blank');

  cerrarModalCitas();

  if (typeof showToast === 'function') {
    showToast('Te redirigimos a WhatsApp para confirmar tu cita.', 'success');
  }

  document.getElementById('formAgendaCita').reset();
}

// Cerrar modales con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalFacturas();
    cerrarModalCitas();
  }
});

// Hacer funciones globales
window.abrirModalFacturas = abrirModalFacturas;
window.cerrarModalFacturas = cerrarModalFacturas;
window.enviarConsultaFacturas = enviarConsultaFacturas;
window.abrirModalCitas = abrirModalCitas;
window.cerrarModalCitas = cerrarModalCitas;
window.agendarCitaWhatsApp = agendarCitaWhatsApp;
