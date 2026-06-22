// ===============================
// CARGAR MODAL NUEVA FACTURA
// ===============================
async function loadInvoiceModal() {
  console.log('🔵 Cargando modal de factura...');
  try {
    const modalHTML = await fetch("components/modals/invoice-modal.html").then(r => r.text());
    console.log('✅ Modal factura cargado');
    document.body.insertAdjacentHTML("beforeend", modalHTML);
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
  const modal = document.getElementById("invoiceModal");
  const btnOpen = document.getElementById("btnNewInvoice");
  const btnClose = document.getElementById("closeInvoiceModal");
  const form = document.getElementById("invoiceForm");

  btnOpen.addEventListener("click", () => {
    loadClientsInSelect();
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

  const invoice = {
    invoiceNumber: generateInvoiceNumber(),
    clientId,
    clientName: client.name,
    phone: client.phone,
    total: parseFloat(document.getElementById("invoiceTotal").value),
    issueDate: new Date().toISOString(),
    status: "PENDIENTE"
  };

  console.log('  Factura a guardar:', invoice);

  invoices.unshift(invoice);
  localStorage.setItem("invoices", JSON.stringify(invoices));
  console.log('  ✅ Factura guardada. Total facturas:', invoices.length);

  renderInvoices();
  console.log('  ✅ Tabla renderizada');
  
  document.getElementById("invoiceModal").style.display = "none";
  console.log('  ✅ Modal cerrado');
}

// ===============================
// RENDER TABLA DE FACTURAS
// ===============================
function renderInvoices() {
  const tbody = document.getElementById("invoicesTableBody");
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
        <button class="btn-sm" onclick="downloadInvoice('${inv.invoiceNumber}')">📄</button>
        <button class="btn-sm" onclick="openWhatsAppMenu('${inv.phone}', '${inv.clientName}', '${inv.clientId}', '${inv.invoiceNumber}')">💬</button>
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
