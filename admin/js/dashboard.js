// ===============================
// VERIFICAR TOKEN (si usas login real)
// ===============================
async function verifyToken() {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  if (!token) return false;

  try {
    const res = await fetch("/api/auth/verify", {
      headers: { "Authorization": `Bearer ${token}` }
    });

    return res.ok;
  } catch (error) {
    console.error("Error verificando token:", error);
    return false;
  }
}

// ===============================
// CARGAR DASHBOARD
// ===============================
async function loadDashboard() {
  console.log("📊 Cargando dashboard...");

  // Si no hay backend, usa datos de prueba
  const useMockData = true;

  let clients = [];
  let invoices = [];

  if (useMockData) {
    clients = mockClients();
    invoices = mockInvoices();
  } else {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const headers = { "Authorization": `Bearer ${token}` };

    clients = await fetch("/api/clients", { headers }).then(r => r.json());
    invoices = await fetch("/api/invoices", { headers }).then(r => r.json());
  }

  renderKPIs(clients, invoices);
  renderRecentClients(clients);
  renderRecentInvoices(invoices);
}

// ===============================
// RENDER KPIs
// ===============================
function renderKPIs(clients, invoices) {
  const expiring = clients.filter(c => c.status === "POR VENCER").length;
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);

  document.getElementById("totalClients").textContent = clients.length;
  document.getElementById("totalInvoices").textContent = invoices.length;
  document.getElementById("totalRevenue").textContent = `$${totalRevenue.toFixed(2)}`;
  document.getElementById("expiringClients").textContent = expiring;
}

// ===============================
// RENDER TABLA: ÚLTIMOS CLIENTES
// ===============================
function renderRecentClients(clients) {
  const tbody = document.getElementById("recentClientsBody");
  tbody.innerHTML = "";

  clients.slice(0, 5).forEach(client => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${client.clientId}</td>
      <td>${client.name}</td>
      <td>${client.phone}</td>
      <td>${client.contractType}</td>
      <td class="status ${getStatusClass(client.status)}">${client.status}</td>
      <td>
        <button class="btn-sm" onclick="editClient('${client.clientId}')">✏️</button>
        <button class="btn-sm" onclick="openWhatsAppMenu('${client.phone}', '${client.name}', '${client.clientId}')">💬</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ===============================
// RENDER TABLA: FACTURAS RECIENTES
// ===============================
function renderRecentInvoices(invoices) {
  const tbody = document.getElementById("recentInvoicesBody");
  tbody.innerHTML = "";

  invoices.slice(0, 5).forEach(inv => {
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
}

// ===============================
// FUNCIONES AUXILIARES
// ===============================
function getStatusClass(status) {
  switch (status) {
    case "ACTIVO": return "success";
    case "POR VENCER": return "warning";
    case "VENCIDO": return "danger";
    default: return "secondary";
  }
}

function editClient(id) {
  window.location.href = `/admin/clients.html?edit=${id}`;
}

// ===============================
// MOCK DATA (para pruebas sin backend)
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
