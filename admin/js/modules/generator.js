// ===============================
// GENERADOR DE ID DE CLIENTE
// ===============================
function generateClientId(name) {
  const initials = name
    .split(" ")
    .map(p => p[0])
    .join("")
    .toUpperCase();

  const clients = JSON.parse(localStorage.getItem("clients") || "[]");
  const next = (clients.length + 1).toString().padStart(3, "0");

  return `${initials}-${next}`;
}

// ===============================
// GENERADOR DE FACTURA
// ===============================
function generateInvoiceNumber() {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  const next = (invoices.length + 1).toString().padStart(4, "0");
  return `RECIBO-${next}`;
}

// ===============================
// GENERADOR DE CONTRATO
// ===============================
function generateContractNumber() {
  const contracts = JSON.parse(localStorage.getItem("contracts") || "[]");
  const next = (contracts.length + 1).toString().padStart(4, "0");
  return `CONTRATO-${next}`;
}