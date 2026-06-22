// ===============================
// CARGAR MODAL NUEVO CLIENTE
// ===============================
async function loadNewClientModal() {
  console.log('🔵 Cargando modal de nuevo cliente...');
  try {
    const modalHTML = await fetch("components/modals/new-client.html").then(r => r.text());
    console.log('✅ Modal HTML cargado, insertando en DOM...');
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    console.log('✅ Modal insertado, inicializando...');
    initNewClientModal();
    console.log('✅ Modal inicializado correctamente');
  } catch (error) {
    console.error('❌ ERROR cargando modal:', error);
  }
}

// ===============================
// INICIALIZAR MODAL
// ===============================
function initNewClientModal() {
  console.log('🔵 Inicializando modal...');
  const modal = document.getElementById("newClientModal");
  const btnOpen = document.getElementById("btnNewClient");
  const btnClose = document.getElementById("closeNewClient");
  const form = document.getElementById("newClientForm");

  console.log('  Modal encontrado:', !!modal);
  console.log('  Botón abrir encontrado:', !!btnOpen);
  console.log('  Formulario encontrado:', !!form);

  if (btnOpen) {
    btnOpen.addEventListener("click", () => {
      console.log('🟢 Botón Nuevo Cliente clickeado');
      modal.style.display = "flex";
    });
  }

  if (btnClose) {
    btnClose.addEventListener("click", () => {
      console.log('🟢 Botón cerrar clickeado');
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", e => {
    if (e.target === modal) {
      console.log('🟢 Click fuera del modal, cerrando');
      modal.style.display = "none";
    }
  });

  if (form) {
    form.addEventListener("submit", (e) => {
      console.log('🟢 Formulario submitteado');
      saveClient(e);
    });
  }
  
  console.log('✅ Modal inicializado');
}

// ===============================
// AUTO-ABRIR MODAL SI ?new=1
// ===============================
function checkAutoOpenModal() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("new") === "1") {
    const modal = document.getElementById("newClientModal");
    if (modal) modal.style.display = "flex";
  }
}

// ===============================
// GUARDAR CLIENTE
// ===============================
function saveClient(e) {
  console.log('🔵 saveClient() llamado');
  e.preventDefault();

  const name = document.getElementById("clientName").value;
  console.log('  Nombre:', name);

  const client = {
    clientId: generateClientId(name),
    name: name,
    phone: document.getElementById("clientPhone").value,
    email: document.getElementById("clientEmail")?.value || "",
    address: document.getElementById("clientAddress")?.value || "",
    tariff: document.getElementById("clientTariff")?.value || "FIJA",
    agent: "CARMEN VARGAS",
    contractType: document.getElementById("clientContract").value,
    status: document.getElementById("clientStatus").value
  };

  console.log('  Cliente a guardar:', client);

  let clients = JSON.parse(localStorage.getItem("clients") || "[]");
  clients.unshift(client);
  localStorage.setItem("clients", JSON.stringify(clients));
  console.log('  ✅ Cliente guardado en localStorage');
  console.log('  Total clientes:', clients.length);

  renderClients();
  console.log('  ✅ Tabla renderizada');
  
  document.getElementById("newClientModal").style.display = "none";
  console.log('  ✅ Modal cerrado');
}

// ===============================
// RENDER TABLA DE CLIENTES
// ===============================
function renderClients() {
  const tbody = document.getElementById("clientsTableBody");
  tbody.innerHTML = "";

  const clients = JSON.parse(localStorage.getItem("clients") || "[]");

  clients.forEach(c => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${c.clientId}</td>
      <td>${c.name}</td>
      <td>${c.phone}</td>
      <td>${c.contractType}</td>
      <td class="status ${getStatusClass(c.status)}">${c.status}</td>
      <td>
        <button class="btn-sm" onclick="openEditClient('${c.clientId}')">✏️</button>
        <button class="btn-sm" onclick="openWhatsAppMenu('${c.phone}', '${c.name}', '${c.clientId}')">💬</button>
        <button class="btn-sm" onclick="createInvoiceFromClient('${c.clientId}')">🧾</button>
        <button class="btn-sm" onclick="createContractFromClient('${c.clientId}')">📄</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

// ===============================
// STATUS COLORS
// ===============================
function getStatusClass(status) {
  switch (status) {
    case "ACTIVO": return "success";
    case "POR VENCER": return "warning";
    case "VENCIDO": return "danger";
    default: return "secondary";
  }
}

// ===============================
// GENERAR FACTURA / CONTRATO DESDE CLIENTE
// ===============================
function createInvoiceFromClient(clientId) {
  window.location.href = `invoices.html?client=${clientId}`;
}

function createContractFromClient(clientId) {
  window.location.href = `contracts.html?client=${clientId}`;
}

function openEditClient(clientId) {
  window.location.href = `clients.html?edit=${clientId}`;
}

// ===============================
// INICIALIZACIÓN
// ===============================
window.addEventListener("load", async () => {
  await loadNewClientModal();
  renderClients();
  checkAutoOpenModal();
});
