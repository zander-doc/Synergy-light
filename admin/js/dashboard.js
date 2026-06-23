// ===============================
// CARGAR DASHBOARD
// ===============================
async function loadDashboard() {
  console.log('📊 Cargando dashboard...');

  // Usar datos de localStorage (reales)
  const clients = JSON.parse(localStorage.getItem("clients") || "[]");
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");

  console.log('📊 Datos cargados:', clients.length, 'clientes,', invoices.length, 'facturas');

  renderKPIs(clients, invoices);
  renderRecentClients(clients);
  renderRecentInvoices(invoices);
}

// ===============================
// RENDER KPIs
// ===============================
function renderKPIs(clients, invoices) {
  const activeClients = clients.filter(c => c.status === "ACTIVO").length;
  const totalInvoices = invoices.length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const expiringClients = clients.filter(c => c.status === "POR DESCONECTAR" || c.status === "POR VENCER").length;

  document.getElementById("totalClients").textContent = activeClients;
  document.getElementById("totalInvoices").textContent = totalInvoices;
  document.getElementById("totalRevenue").textContent = `$${totalRevenue.toFixed(2)}`;
  document.getElementById("expiringClients").textContent = expiringClients;

  console.log('✅ KPIs actualizados:', { activeClients, totalInvoices, totalRevenue: `$${totalRevenue.toFixed(2)}`, expiringClients });
}

// ===============================
// RENDER TABLA: ÚLTIMOS CLIENTES
// ===============================
function renderRecentClients(clients) {
  const tbody = document.getElementById("recentClientsBody");
  if (!tbody) {
    console.error('❌ No se encontró recentClientsBody');
    return;
  }
  
  tbody.innerHTML = "";

  const recent = clients.slice(-5).reverse();

  recent.forEach(client => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.clientId}</td>
      <td>${client.name}</td>
      <td>${client.phone}</td>
      <td>${client.contractType}</td>
      <td class="status ${getStatusClass(client.status)}">${client.status}</td>
      <td>
        <button class="btn-action" onclick="editClient('${client.clientId}')" title="Editar">✏️</button>
        <button class="btn-action" onclick="createInvoice('${client.clientId}')" title="Generar Factura">📄</button>
        <button class="btn-action" onclick="sendWhatsApp('${client.phone}','${client.name}')" title="WhatsApp">💬</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  console.log('✅ Tabla de clientes recientes renderizada');
}

// ===============================
// RENDER TABLA: FACTURAS RECIENTES
// ===============================
function renderRecentInvoices(invoices) {
  const tbody = document.getElementById("recentInvoicesBody");
  if (!tbody) {
    console.error('❌ No se encontró recentInvoicesBody');
    return;
  }
  
  tbody.innerHTML = "";

  const recent = invoices.slice(-5).reverse();

  recent.forEach(inv => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${inv.invoiceNumber}</td>
      <td>${inv.clientName}</td>
      <td>$${inv.total.toFixed(2)}</td>
      <td>${new Date(inv.issueDate).toLocaleDateString()}</td>
      <td class="status ${inv.status === "PAGADA" ? "success" : "warning"}">${inv.status}</td>
    `;
    tbody.appendChild(row);
  });

  console.log('✅ Tabla de facturas recientes renderizada');
}

// ===============================
// FUNCIONES AUXILIARES
// ===============================
function getStatusClass(status) {
  switch (status) {
    case "ACTIVO": return "success";
    case "POR DESCONECTAR": return "warning";
    case "POR VENCER": return "warning";
    case "SIN CONEXIÓN": return "danger";
    case "VENCIDO": return "danger";
    default: return "secondary";
  }
}

function editClient(id) {
  window.location.href = `clients.html?edit=${id}`;
}

function createInvoice(clientId) {
  window.location.href = `invoices.html?client=${clientId}`;
}

// ===============================
// MOCK DATA (fallback si no hay datos)
// ===============================
function mockClients() {
  return [
    { clientId: "CL001", name: "Juan Pérez", phone: "4095551234", contractType: "Residencial", status: "ACTIVO" },
    { clientId: "CL002", name: "María López", phone: "4095555678", contractType: "Residencial", status: "POR VENCER" },
    { clientId: "CL003", name: "Carlos Ruiz", phone: "4095559876", contractType: "Comercial", status: "ACTIVO" },
    { clientId: "CL004", name: "Ana Torres", phone: "4095552222", contractType: "Residencial", status: "VENCIDO" },
    { clientId: "CL005", name: "Luis Gómez", phone: "4095553333", contractType: "Comercial", status: "ACTIVO" }
  ];
}

function mockInvoices() {
  return [
    { invoiceNumber: "F001", clientName: "Juan Pérez", total: 120.50, issueDate: "2026-06-01", status: "PAGADA" },
    { invoiceNumber: "F002", clientName: "María López", total: 89.99, issueDate: "2026-06-05", status: "PENDIENTE" },
    { invoiceNumber: "F003", clientName: "Carlos Ruiz", total: 150.00, issueDate: "2026-06-10", status: "PAGADA" },
    { invoiceNumber: "F004", clientName: "Ana Torres", total: 75.25, issueDate: "2026-06-12", status: "PENDIENTE" }
  ];
}

// ===============================
// INICIALIZACIÓN
// ===============================
window.addEventListener("load", async () => {
  await loadDashboard();
});