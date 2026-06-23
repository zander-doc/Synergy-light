console.log("📌 invoices.js cargado correctamente");

// ===============================
// CARGAR MODAL NUEVA FACTURA
// ===============================
async function loadInvoiceModal() {
  console.log('🔵 Cargando modal de factura...');
  try {
    const modalHTML = await fetch("components/modals/invoice-modal.html").then(r => r.text());
    console.log('✅ Modal factura cargado');
    document.querySelector(".main-content").insertAdjacentHTML("beforeend", modalHTML);
    initInvoiceModal();
    console.log('✅ Modal factura inicializado');
  } catch (error) {
    console.error('❌ ERROR cargando modal factura:', error);
  }
}

// ===============================
// INICIALIZAR MODAL
// ===============================
function initInvoiceModal() {
  console.log('🔵 Inicializando modal...');
  
  const modal = document.getElementById("invoiceModal");
  console.log('  Modal encontrado:', modal !== null);
  
  const btnOpen = document.getElementById("btnNewInvoice");
  console.log('  btnOpen encontrado:', btnOpen !== null, btnOpen);
  
  const btnClose = document.getElementById("closeInvoiceModal");
  console.log('  btnClose encontrado:', btnClose !== null);
  
  const form = document.getElementById("invoiceForm");
  console.log('  Form encontrado:', form !== null);
  
  if (!modal || !btnOpen || !btnClose || !form) {
    console.error('❌ Elementos del modal no encontrados:', {
      modal, btnOpen, btnClose, form
    });
    return;
  }

  // Autocompletar datos del cliente cuando se seleccione
  document.getElementById("invoiceClient").addEventListener("change", function() {
    const clients = JSON.parse(localStorage.getItem("clients") || "[]");
    const client = clients.find(c => c.clientId === this.value);
    if (client) {
      document.getElementById("invoiceAddress").value = client.address || "";
      document.getElementById("invoicePhone").value = client.phone || "";
      document.getElementById("invoiceEmail").value = client.email || "";
      document.getElementById("invoiceTariff").value = client.contractType || "";
    }
  });
  
  // Autocompletar precio según servicio
  document.getElementById("invoiceService").addEventListener("change", function() {
    const price = this.options[this.selectedIndex].dataset.price;
    if (price) {
      document.getElementById("invoiceIncome").value = price;
      calculateTotal();
    }
  });
  
  btnOpen.addEventListener("click", () => {
    loadClientsInSelect();
    
    // Autocompletar número de factura y fechas
    document.getElementById("invoiceNumber").value = generateInvoiceNumber();
    const today = new Date().toISOString().split("T")[0];
    document.getElementById("invoiceIssueDate").value = today;
    const due = new Date();
    due.setDate(due.getDate() + 30);
    document.getElementById("invoiceDueDate").value = due.toISOString().split("T")[0];
    
    modal.style.display = "flex";
  });

  btnClose.addEventListener("click", () => modal.style.display = "none");

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });

  form.addEventListener("submit", saveInvoice);

  // Auto calcular total
  ["invoiceIncome", "invoiceFixed", "invoiceDeposit"].forEach(id => {
    document.getElementById(id).addEventListener("input", calculateTotal);
  });
}

// ===============================
// CARGAR CLIENTES EN SELECT
// ===============================
function loadClientsInSelect() {
  const clients = JSON.parse(localStorage.getItem("clients") || "[]");
  const select = document.getElementById("invoiceClient");

  select.innerHTML = "";
  clients.forEach(c => {
    const option = document.createElement("option");
    option.value = c.clientId;
    option.textContent = `${c.name} (${c.clientId})`;
    select.appendChild(option);
  });
}

// ===============================
// CALCULAR TOTAL
// ===============================
function calculateTotal() {
  const income = parseFloat(document.getElementById("invoiceIncome").value) || 0;
  const fixed = parseFloat(document.getElementById("invoiceFixed").value) || 0;
  const deposit = parseFloat(document.getElementById("invoiceDeposit").value) || 0;

  document.getElementById("invoiceTotal").value = (income + fixed + deposit).toFixed(2);
}

// ===============================
// GUARDAR FACTURA
// ===============================
function saveInvoice(e) {
  console.log('🔵 saveInvoice() llamado');
  e.preventDefault();

  const clients = JSON.parse(localStorage.getItem("clients") || "[]");
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  const clientId = document.getElementById("invoiceClient").value;
  const client = clients.find(c => c.clientId === clientId);
  console.log('  Cliente seleccionado:', client);

  const invoiceNumber = document.getElementById("invoiceNumber").value;
  const invoice = {
    invoiceNumber: invoiceNumber,
    clientId,
    clientName: client.name,
    phone: client.phone,
    total: parseFloat(document.getElementById("invoiceTotal").value),
    issueDate: new Date().toISOString(),
    status: "PENDIENTE",
    service: document.getElementById("invoiceService").value,
    income: parseFloat(document.getElementById("invoiceIncome").value),
    fixed: parseFloat(document.getElementById("invoiceFixed").value),
    deposit: parseFloat(document.getElementById("invoiceDeposit").value),
    clientEmail: client.email,
    clientAddress: client.address,
    clientPhone: client.phone,
    tariff: client.contractType
  };

  console.log('  Factura a guardar:', invoice);

  invoices.unshift(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));
  console.log('  ✅ Factura guardada. Total facturas:', invoices.length);

  renderInvoices();
  console.log('  ✅ Tabla renderizada');
}

// ===============================
// RENDER TABLA DE FACTURAS
// ===============================
function renderInvoices() {
  const tbody = document.getElementById("invoicesTableBody");
  if (!tbody) {
    console.error('❌ invoicesTableBody no encontrado en el DOM');
    return;
  }
  tbody.innerHTML = "";

  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  invoices.forEach(inv => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${inv.invoiceNumber}</td>
      <td>${inv.clientName}</td>
      <td>$${inv.total.toFixed(2)}</td>
      <td>${new Date(inv.issueDate).toLocaleDateString()}</td>
      <td class="status ${inv.status === "PAGADA" ? "success" : "warning"}">${inv.status}</td>
      <td>
        <button class="btn-sm" onclick="downloadInvoice('${inv.invoiceNumber}')" title="Descargar PDF">📄</button>
        <button class="btn-sm" onclick="sendInvoiceEmail('${inv.clientEmail || 'cliente@email.com'}', '${inv.clientName}', '${inv.invoiceNumber}', '${inv.total}')" title="Enviar por Email">📧</button>
        <button class="btn-sm" onclick="sendInvoiceWhatsApp('${inv.phone || '1234567890'}', '${inv.clientName}', '${inv.invoiceNumber}', '${inv.total}')" title="Enviar por WhatsApp">💬</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ===============================
// INICIALIZACIÓN
// ===============================
window.addEventListener("load", async () => {
  await loadInvoiceModal();
  renderInvoices();

  // Detectar cliente preseleccionado desde clients.js
  const params = new URLSearchParams(window.location.search);
  const clientId = params.get("client");

  if (clientId) {
    loadClientsInSelect();
    document.getElementById("invoiceClient").value = clientId;
    document.getElementById("invoiceModal").style.display = "flex";
  }
});
function downloadInvoice(invoiceNumber) {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  const invoice = invoices.find(i => i.invoiceNumber === invoiceNumber);

  if (!invoice) {
    alert("Factura no encontrada");
    return;
  }

  generateInvoicePDF(invoice);
}

// ===============================
// ENVIAR FACTURA POR EMAIL
// ===============================

function sendInvoiceEmail(clientEmail, clientName, invoiceNumber, total) {
  console.log('📧 Enviando factura por email:', {clientEmail, clientName, invoiceNumber, total});
  
  const synergyEmail = 'synergylightservices@gmail.com';
  const subject = `Factura ${invoiceNumber} - Synergy Light`;
  const body = `Estimado/a ${clientName},

Esperamos que se encuentre bien.

Adjunto encontrará su factura ${invoiceNumber} de Synergy Light.

DETALLES DE LA FACTURA:
━━━━━━━━━━━━━━━━━━━━━━
📄 Número: ${invoiceNumber}
💰 Monto Total: $${total}
📅 Fecha de Emisión: ${new Date().toLocaleDateString()}
━━━━━━━━━━━━━━━━━━━━━━

MÉTODOS DE PAGO ACEPTADOS:
✓ ZELLE
✓ CASHAPP
✓ LINK DE PAGO

Por favor, realice el pago antes de la fecha de vencimiento para evitar interrupciones en el servicio.

Si tiene alguna pregunta, no dude en contactarnos:
━━━━━━━━━━━━━━━━━━━━━━
📞 +1 (409) 655-2420
✉️ synergylightservices@gmail.com
🌐 https://synergylightservices.com
━━━━━━━━━━━━━━━━━━━━━━

Gracias por su preferencia.

Saludos cordiales,

Synergy Light
Ilumina Tu Vida
synergylightservices@gmail.com`;

  const mailtoUrl = `mailto:${synergyEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.open(mailtoUrl, '_blank');
  
  // Mostrar confirmación
  alert(`✅ Se ha abierto su cliente de correo para enviar la factura ${invoiceNumber} a ${clientName}`);
}

// ===============================
// ENVIAR FACTURA POR WHATSAPP
// ===============================

function sendInvoiceWhatsApp(phone, clientName, invoiceNumber, total) {
  console.log('📱 Enviando factura por WhatsApp:', {phone, clientName, invoiceNumber, total});
  
  const synergyPhone = '14092800661'; // +1 (409) 280-0661
  const message = `Hola ${clientName},

Le enviamos su factura de Synergy Light.

📄 FACTURA #${invoiceNumber}
💰 Monto: $${total}
📅 Fecha: ${new Date().toLocaleDateString()}

━━━━━━━━━━━━━━━━━━━━━━

MÉTODOS DE PAGO:
✓ ZELLE
✓ CASHAPP
✓ LINK DE PAGO

Por favor, realice el pago antes de la fecha de vencimiento.

Gracias por su preferencia.

━━━━━━━━━━━━━━━━━━━━━━

Synergy Light
📞 +1 (409) 655-2420
✉️ synergylightservices@gmail.com`;

  const encodedMessage = encodeURIComponent(message);
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  let whatsappUrl;
  if (isMobile) {
    whatsappUrl = `https://wa.me/${synergyPhone}?text=${encodedMessage}`;
  } else {
    whatsappUrl = `https://web.whatsapp.com/send?phone=${synergyPhone}&text=${encodedMessage}`;
  }
  
  window.open(whatsappUrl, '_blank');
  
  // Mostrar confirmación
  alert(`✅ Se ha abierto WhatsApp para enviar la factura ${invoiceNumber} a ${clientName}`);
}

// Hacer funciones globales
window.sendInvoiceEmail = sendInvoiceEmail;
window.sendInvoiceWhatsApp = sendInvoiceWhatsApp;
