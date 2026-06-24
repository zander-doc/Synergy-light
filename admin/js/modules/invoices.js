// ===============================
// SISTEMA DE FACTURACIÓN - SYNERGY LIGHT
// ===============================

let clienteFacturaSeleccionado = null;

// Cargar modal de factura
async function loadInvoiceModal() {
  console.log(' Cargando modal de factura...');
  try {
    const modalHTML = await fetch("components/modals/invoice-modal.html").then(r => r.text());
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    console.log('✅ Modal factura cargado');
    inicializarModalFactura();
  } catch (error) {
    console.error(' ERROR cargando modal factura:', error);
  }
}

// Inicializar modal
function inicializarModalFactura() {
  console.log('🔵 Inicializando modal factura...');
  
  const modal = document.getElementById('invoiceModal');
  if (!modal) {
    console.error('❌ Modal no encontrado');
    return;
  }
  
  // Cargar clientes en el select
  cargarClientesEnSelect();
  
  // Establecer fechas por defecto
  const hoy = new Date().toISOString().split('T')[0];
  const vencimiento = new Date();
  vencimiento.setDate(vencimiento.getDate() + 30);
  
  const dateInput = document.getElementById('invoiceDate');
  const dueDateInput = document.getElementById('invoiceDueDate');
  
  if (dateInput) dateInput.value = hoy;
  if (dueDateInput) dueDateInput.value = vencimiento.toISOString().split('T')[0];
  
  // Generar número de factura
  generarNumeroFactura();
  
  // Calcular total inicial
  calcularTotalFactura();
  
  // Configurar formulario
  const form = document.getElementById('formFactura');
  if (form) {
    form.onsubmit = function(e) {
      e.preventDefault();
      guardarFactura();
    };
  }
  
  // Cerrar al hacer clic fuera
  modal.onclick = function(event) {
    if (event.target === modal) {
      cerrarModalFactura();
    }
  };
  
  console.log('✅ Modal factura inicializado');
}

// Cargar clientes en el select
function cargarClientesEnSelect() {
  const clientes = JSON.parse(localStorage.getItem('clients') || '[]');
  const select = document.getElementById('invoiceClient');
  
  if (!select) {
    console.error('❌ Select de clientes no encontrado');
    return;
  }
  
  // Limpiar opciones existentes (mantener la primera)
  select.innerHTML = '<option value="">Seleccione un cliente...</option>';
  
  clientes.forEach(function(client) {
    const option = document.createElement('option');
    option.value = client.clientId;
    option.textContent = client.name + ' (' + client.clientId + ')';
    select.appendChild(option);
  });
  
  console.log('✅', clientes.length, 'clientes cargados en select');
}

// Auto-rellenar campos al seleccionar cliente
function autoRellenarFactura() {
  const clientId = document.getElementById('invoiceClient').value;
  
  if (!clientId) {
    // Limpiar campos
    document.getElementById('invoiceAddress').value = '';
    document.getElementById('invoicePhone').value = '';
    document.getElementById('invoiceEmail').value = '';
    document.getElementById('invoiceTarifa').value = '';
    clienteFacturaSeleccionado = null;
    return;
  }
  
  const clientes = JSON.parse(localStorage.getItem('clients') || '[]');
  const client = clientes.find(function(c) { return c.clientId === clientId; });
  
  if (!client) {
    console.error('❌ Cliente no encontrado:', clientId);
    return;
  }
  
  clienteFacturaSeleccionado = client;
  
  // Rellenar campos
  document.getElementById('invoiceAddress').value = client.address || '';
  document.getElementById('invoicePhone').value = client.phone || '';
  document.getElementById('invoiceEmail').value = client.email || '';
  document.getElementById('invoiceTarifa').value = client.contractType || '';
  
  // Ajustar valores según tipo de contrato
  const incomeInput = document.getElementById('invoiceIncome');
  const depositInput = document.getElementById('invoiceDeposit');
  
  if (client.contractType === 'TARIFA KWH') {
    incomeInput.value = '50';
  } else if (client.contractType === 'TARIFA FIJA') {
    incomeInput.value = '75';
  }
  
  if (client.deposit) {
    depositInput.value = client.deposit;
  }
  
  // Recalcular total
  calcularTotalFactura();
  
  console.log('✅ Datos del cliente rellenados:', client.name);
}

// Generar número de factura correlativo
function generarNumeroFactura() {
  const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  let nextNumber = 1;
  
  if (invoices.length > 0) {
    const lastInvoice = invoices.reduce(function(max, inv) {
      const num = parseInt(inv.invoiceNumber) || 0;
      return num > max ? num : max;
    }, 0);
    nextNumber = lastInvoice + 1;
  }
  
  const numeroFactura = nextNumber.toString().padStart(4, '0');
  const numeroInput = document.getElementById('invoiceNumber');
  
  if (numeroInput) {
    numeroInput.value = numeroFactura;
  }
  
  console.log('🔢 Número de factura generado:', numeroFactura);
}

// Calcular total automáticamente
function calcularTotalFactura() {
  const income = parseFloat(document.getElementById('invoiceIncome').value) || 0;
  const fixed = parseFloat(document.getElementById('invoiceFixed').value) || 0;
  const deposit = parseFloat(document.getElementById('invoiceDeposit').value) || 0;
  const total = income + fixed + deposit;
  
  const totalInput = document.getElementById('invoiceTotal');
  if (totalInput) {
    totalInput.value = total.toFixed(2);
  }
}

// Guardar factura
function guardarFactura() {
  console.log('💾 Guardando factura...');
  
  const clientId = document.getElementById('invoiceClient').value;
  
  if (!clientId) {
    alert('❌ Por favor seleccione un cliente');
    return;
  }
  
  if (!clienteFacturaSeleccionado) {
    alert('❌ Error: Cliente no válido');
    return;
  }
  
  const invoiceData = {
    invoiceNumber: document.getElementById('invoiceNumber').value,
    clientId: clientId,
    clientName: clienteFacturaSeleccionado.name,
    clientPhone: clienteFacturaSeleccionado.phone,
    clientEmail: clienteFacturaSeleccionado.email,
    clientAddress: clienteFacturaSeleccionado.address,
    contractType: clienteFacturaSeleccionado.contractType,
    salesAgent: clienteFacturaSeleccionado.salesAgent,
    issueDate: document.getElementById('invoiceDate').value,
    dueDate: document.getElementById('invoiceDueDate').value,
    income: parseFloat(document.getElementById('invoiceIncome').value) || 0,
    fixedCosts: parseFloat(document.getElementById('invoiceFixed').value) || 0,
    deposit: parseFloat(document.getElementById('invoiceDeposit').value) || 0,
    total: parseFloat(document.getElementById('invoiceTotal').value) || 0,
    status: document.getElementById('invoiceStatus').value,
    paymentMethod: document.getElementById('invoicePaymentMethod').value,
    createdAt: new Date().toISOString()
  };
  
  // Validar campos obligatorios
  if (!invoiceData.invoiceNumber || !invoiceData.issueDate || !invoiceData.dueDate) {
    alert('❌ Por favor complete todos los campos obligatorios');
    return;
  }
  
  // Guardar en localStorage
  const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  invoices.push(invoiceData);
  localStorage.setItem('invoices', JSON.stringify(invoices));
  
  console.log('✅ Factura guardada:', invoiceData);
  
  // Mostrar confirmación
  alert('✅ Factura #' + invoiceData.invoiceNumber + ' guardada exitosamente\n\nCliente: ' + invoiceData.clientName + '\nTotal: $' + invoiceData.total.toFixed(2));
  
  // Cerrar modal
  cerrarModalFactura();
  
  // Recargar tabla de facturas
  setTimeout(function() {
    renderizarTablaFacturas();
  }, 300);
  
  console.log('✅ Factura guardada y tabla actualizada');
}

// Cerrar modal
function cerrarModalFactura() {
  const modal = document.getElementById('invoiceModal');
  if (modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    clienteFacturaSeleccionado = null;
  }
}

// Abrir modal
function abrirModalFactura() {
  const modal = document.getElementById('invoiceModal');
  if (modal) {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Reinicializar
    cargarClientesEnSelect();
    generarNumeroFactura();
    
    const hoy = new Date().toISOString().split('T')[0];
    const vencimiento = new Date();
    vencimiento.setDate(vencimiento.getDate() + 30);
    
    document.getElementById('invoiceDate').value = hoy;
    document.getElementById('invoiceDueDate').value = vencimiento.toISOString().split('T')[0];
    document.getElementById('invoiceIncome').value = '50';
    document.getElementById('invoiceFixed').value = '45';
    document.getElementById('invoiceDeposit').value = '50';
    document.getElementById('invoiceStatus').value = 'PENDIENTE';
    document.getElementById('invoicePaymentMethod').value = 'ZELLE';
    document.getElementById('invoiceClient').value = '';
    
    calcularTotalFactura();
    
    console.log('✅ Modal de factura abierto');
  }
}

// ========================
// RENDERIZAR TABLA DE FACTURAS
// ========================
function renderizarTablaFacturas() {
  console.log('🔄 Renderizando tabla de facturas...');
  
  const invoices = JSON.parse(localStorage.getItem('invoices') || '[]');
  const tbody = document.querySelector('#invoicesTable tbody') || 
                document.querySelector('.data-table tbody') ||
                document.getElementById('invoicesTableBody');
  
  if (!tbody) {
    console.error('❌ No se encontró el tbody de la tabla de facturas');
    console.log('Buscando tabla...');
    const tables = document.querySelectorAll('table');
    console.log('Tablas encontradas:', tables.length);
    tables.forEach(function(t, i) { console.log('Tabla ' + i + ':', t); });
    return;
  }
  
  console.log('✅ Tabla encontrada, renderizando', invoices.length, 'facturas');
  
  if (invoices.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:30px;color:#666;">No hay facturas registradas</td></tr>';
    return;
  }
  
  // Ordenar facturas por número (más reciente primero)
  var sortedInvoices = invoices.slice().sort(function(a, b) {
    return parseInt(b.invoiceNumber) - parseInt(a.invoiceNumber);
  });
  
  tbody.innerHTML = sortedInvoices.map(function(inv) {
    var statusClass = 'warning';
    if (inv.status === 'PAGADA') statusClass = 'active';
    else if (inv.status === 'VENCIDA') statusClass = 'danger';
    
    return '<tr>' +
      '<td>' + inv.invoiceNumber + '</td>' +
      '<td>' + inv.clientName + '</td>' +
      '<td>$' + parseFloat(inv.total).toFixed(2) + '</td>' +
      '<td>' + new Date(inv.issueDate).toLocaleDateString() + '</td>' +
      '<td><span class="status-badge ' + statusClass + '">' + inv.status + '</span></td>' +
      '<td style="display:flex;gap:5px;justify-content:center;">' +
      '<button class="btn-action" onclick="descargarFactura(\'' + inv.invoiceNumber + '\')" title="Descargar PDF">📄</button>' +
      '<button class="btn-action" onclick="enviarFacturaEmail(\'' + inv.clientEmail + '\', \'' + inv.clientName + '\', \'' + inv.invoiceNumber + '\')" title="Enviar Email">📧</button>' +
      '<button class="btn-action" onclick="enviarFacturaWhatsApp(\'' + inv.clientPhone + '\', \'' + inv.clientName + '\', \'' + inv.invoiceNumber + '\', \'' + inv.total + '\')" title="Enviar WhatsApp">💬</button>' +
      '</td>' +
      '</tr>';
  }).join('');
  
  console.log('✅ Tabla de facturas renderizada correctamente');
}

// Hacer funciones globales
window.loadInvoiceModal = loadInvoiceModal;
window.abrirModalFactura = abrirModalFactura;
window.cerrarModalFactura = cerrarModalFactura;
window.autoRellenarFactura = autoRellenarFactura;
window.calcularTotalFactura = calcularTotalFactura;
window.guardarFactura = guardarFactura;
window.generarNumeroFactura = generarNumeroFactura;
window.renderizarTablaFacturas = renderizarTablaFacturas;

// Inicializar cuando cargue la página
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadInvoiceModal);
} else {
  loadInvoiceModal();
}
