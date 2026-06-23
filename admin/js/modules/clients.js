// ===============================
// GENERADOR AUTOMÁTICO DE ID DE CLIENTE - PREMIUM
// ===============================

function generarIdCliente(nombreCompleto) {
  if (!nombreCompleto || nombreCompleto.trim().length < 3) {
    return '';
  }
  
  // Dividir nombre y apellido
  const partes = nombreCompleto.trim().toUpperCase().split(/\s+/);
  
  if (partes.length < 2) {
    // Si solo hay una palabra, usar primeras 3 letras + 0100
    return partes[0].substring(0, 3).toUpperCase() + '-0100';
  }
  
  const primerNombre = partes[0];
  const apellido = partes[partes.length - 1];
  
  // Primera letra + últimas 2 letras del primer nombre
  const codigoNombre = primerNombre.charAt(0) + 
                       primerNombre.slice(-2).toUpperCase();
  
  // Primera letra del apellido
  const codigoApellido = apellido.charAt(0);
  
  // Generar ID único comenzando desde 0100
  const clientes = JSON.parse(localStorage.getItem('clients') || '[]');
  let contador = 100;
  let idUnico = false;
  let nuevoId = '';
  
  while (!idUnico && contador < 10000) {
    contador++;
    const numero = contador.toString().padStart(4, '0');
    nuevoId = `${codigoNombre}${codigoApellido}-${numero}`;
    
    // Verificar si ya existe
    const existe = clientes.find(c => c.clientId === nuevoId);
    if (!existe) {
      idUnico = true;
    }
  }
  
  return nuevoId;
}

// ===============================
// EDITAR CLIENTE - FUNCIONALIDAD CORREGIDA
// ===============================

function editClient(clientId) {
  console.log('✏️ Editando cliente:', clientId);
  
  if (!clientId) {
    alert('❌ Error: ID de cliente no válido');
    return;
  }
  
  const clients = JSON.parse(localStorage.getItem('clients') || '[]');
  const client = clients.find(c => c.clientId === clientId);
  
  if (!client) {
    alert('❌ Cliente no encontrado');
    return;
  }
  
  // Redirigir a clients.html con parámetro de edición
  window.location.href = `clients.html?edit=${encodeURIComponent(clientId)}`;
}

// ===============================
// WHATSAPP - CORREGIDO Y MEJORADO
// ===============================

function openWhatsAppMenu(phone, clientName, clientId) {
  console.log('💬 Abriendo WhatsApp para:', clientName);
  
  // Número correcto de Synergy Light
  const synergyPhone = '14092800661'; // +1 (409) 280-0661
  
  // Mensaje personalizado
  const message = `Hola ${clientName}, le contactamos de Synergy Light. ¿En qué podemos ayudarle?`;
  const encodedMessage = encodeURIComponent(message);
  
  // Abrir WhatsApp Web
  const whatsappUrl = `https://web.whatsapp.com/send?phone=${synergyPhone}&text=${encodedMessage}`;
  
  // Verificar si es móvil o desktop
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if (isMobile) {
    window.open(`https://wa.me/${synergyPhone}?text=${encodedMessage}`, '_blank');
  } else {
    window.open(whatsappUrl, '_blank');
  }
}

// ===============================
// ENVIAR FACTURA POR EMAIL - NUEVO
// ===============================

function sendInvoiceEmail(clientEmail, clientName, invoiceNumber, total) {
  console.log('📧 Enviando factura por email a:', clientEmail);
  
  const synergyEmail = 'synergylightservices@gmail.com';
  const subject = `Factura ${invoiceNumber} - Synergy Light`;
  const body = `Estimado/a ${clientName},

Esperamos que se encuentre bien.

Adjunto encontrará su factura ${invoiceNumber} de Synergy Light.

DETALLES:
- Número de Factura: ${invoiceNumber}
- Monto Total: $${total}
- Fecha de Emisión: ${new Date().toLocaleDateString()}

Métodos de pago aceptados:
- ZELLE
- CASHAPP
- LINK DE PAGO

Por favor, realice el pago antes de la fecha de vencimiento para evitar interrupciones en el servicio.

Si tiene alguna pregunta, no dude en contactarnos:
📞 +1 (409) 655-2420
✉️ synergylightservices@gmail.com

Gracias por su preferencia.

Saludos cordiales,
Synergy Light
Ilumina Tu Vida
synergylightservices@gmail.com
https://synergylightservices.com`;

  const mailtoUrl = `mailto:${synergyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
}

// ===============================
// ENVIAR FACTURA POR WHATSAPP - NUEVO
// ===============================

function sendInvoiceWhatsApp(phone, clientName, invoiceNumber, total) {
  console.log('📱 Enviando factura por WhatsApp a:', phone);
  
  const synergyPhone = '+1 (409) 280-0661';
  const message = `Hola ${clientName},

Le enviamos su factura ${invoiceNumber} de Synergy Light.

💰 Monto: $${total}
📅 Fecha: ${new Date().toLocaleDateString()}

Métodos de pago: ZELLE, CASHAPP, LINK DE PAGO

Gracias por su preferencia.

Synergy Light
📞 +1 (409) 280-0661`;

  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    window.open(`https://wa.me/${synergyPhone}?text=${encodedMessage}`, '_blank');
  } else {
    window.open(`https://web.whatsapp.com/send?phone=${synergyPhone}&text=${encodedMessage}`, '_blank');
  }
}

// ===============================
// INICIALIZAR FORMULARIO DE CLIENTE - MEJORADO
// ===============================

function initializeClientForm() {
  const form = document.getElementById('formNuevoCliente');
  if (!form) {
    console.log('⚠️ Formulario de cliente no encontrado');
    return;
  }
  
  const nameInput = document.getElementById('newClientName');
  const idInput = document.getElementById('newClientId');
  
  // Escuchar cambios en el nombre para generar ID automáticamente
  if (nameInput && idInput) {
    nameInput.addEventListener('input', function() {
      const nombre = this.value.trim();
      if (nombre.length >= 3) {
        const generatedId = generarIdCliente(nombre);
        idInput.value = generatedId;
        console.log('🆔 ID generado automáticamente:', generatedId);
        
        // Efecto visual de éxito
        idInput.style.borderColor = '#03bc89';
        setTimeout(() => {
          idInput.style.borderColor = '';
        }, 1000);
      } else {
        idInput.value = '';
      }
    });
    
    // Permitir edición manual del ID si es necesario
    idInput.addEventListener('focus', function() {
      if (confirm('¿Desea editar manualmente el ID? El sistema generó uno automáticamente.')) {
        this.readOnly = false;
        this.style.background = '#2a2a2a';
      }
    });
  }
  
  // Guardar cliente
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    try {
      const newClient = {
        clientId: document.getElementById('newClientId').value,
        name: document.getElementById('newClientName').value,
        phone: document.getElementById('newClientPhone').value,
        email: document.getElementById('newClientEmail').value,
        address: document.getElementById('newClientAddress').value,
        contractType: document.getElementById('newClientContract').value,
        ssid: document.getElementById('newClientSSID').value,
        salesAgent: document.getElementById('newClientAgent').value,
        paymentMethod: document.getElementById('newClientPayment').value,
        deposit: parseFloat(document.getElementById('newClientDeposit').value) || 50,
        startDate: document.getElementById('newClientStartDate').value,
        endDate: document.getElementById('newClientEndDate').value,
        status: document.getElementById('newClientStatus').value
      };
      
      // Validar campos requeridos
      if (!newClient.clientId || !newClient.name || !newClient.phone) {
        alert('❌ Por favor complete todos los campos obligatorios');
        return;
      }
      
      const clients = JSON.parse(localStorage.getItem('clients') || '[]');
      
      // Verificar si el ID ya existe
      const existe = clients.find(c => c.clientId === newClient.clientId);
      if (existe) {
        if (!confirm('⚠️ Ya existe un cliente con este ID. ¿Desea continuar?')) {
          return;
        }
      }
      
      clients.push(newClient);
      localStorage.setItem('clients', JSON.stringify(clients));
      
      // Mostrar mensaje de éxito
      alert(`✅ Cliente guardado exitosamente\n\nID: ${newClient.clientId}\nNombre: ${newClient.name}`);
      
      // Cerrar modal y recargar
      const modal = document.getElementById('modalNuevoCliente');
      if (modal) {
        modal.style.display = 'none';
      }
      
      location.reload();
      
    } catch (error) {
      console.error('❌ Error al guardar cliente:', error);
      alert('❌ Error al guardar el cliente. Verifique la consola para más detalles.');
    }
  });
  
  console.log('✅ Formulario de cliente inicializado correctamente');
}

// ===============================
// CERRAR MODAL
// ===============================

function cerrarModalCliente() {
  const modal = document.getElementById('modalNuevoCliente');
  if (modal) {
    modal.style.display = 'none';
    const form = document.getElementById('formNuevoCliente');
    if (form) form.reset();
  }
}

// ===============================
// INICIALIZACIÓN
// ===============================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeClientForm);
} else {
  initializeClientForm();
}

// Hacer funciones globales
window.editClient = editClient;
window.openWhatsAppMenu = openWhatsAppMenu;
window.sendInvoiceEmail = sendInvoiceEmail;
window.sendInvoiceWhatsApp = sendInvoiceWhatsApp;
window.cerrarModalCliente = cerrarModalCliente;
window.generarIdCliente = generarIdCliente;
