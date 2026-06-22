// ===============================
// WHATSAPP BASE
// ===============================
function openWA(phone, msg) {
  window.open(`https://wa.me/1${phone}?text=${encodeURIComponent(msg)}`, "_blank");
}

// ===============================
// MENSAJES AUTOMÁTICOS
// ===============================
function sendWhatsApp(phone, name) {
  openWA(phone, `Hola ${name}, le contactamos de Synergy Light.`);
}

function sendReminder(phone, name) {
  openWA(phone, `Hola ${name}, le recordamos que su pago está próximo a vencer. Si ya realizó el pago, ignore este mensaje.`);
}

function sendCustomMessage(phone, name) {
  const msg = prompt(`Escribe el mensaje para ${name}:`);
  if (msg) openWA(phone, msg);
}

// ===============================
// ENVIAR PDF POR WHATSAPP
// ===============================
function sendInvoicePDF(invoiceNumber) {
  const invoices = JSON.parse(localStorage.getItem("invoices") || "[]");
  const invoice = invoices.find(i => i.invoiceNumber === invoiceNumber);

  if (!invoice) return alert("Factura no encontrada");

  generateInvoicePDF(invoice, true);
}

// ===============================
// MENÚ CONTEXTUAL WHATSAPP
// ===============================
function openWhatsAppMenu(phone, name, clientId, invoiceNumber = null) {
  // Cerrar menús previos
  const oldMenu = document.querySelector(".whatsapp-popup");
  if (oldMenu) oldMenu.remove();

  const menu = document.createElement("div");
  menu.className = "whatsapp-popup";

  menu.innerHTML = `
    <button onclick="sendWhatsApp('${phone}', '${name}')">Mensaje rápido</button>
    <button onclick="sendReminder('${phone}', '${name}')">Recordatorio de pago</button>
    <button onclick="sendCustomMessage('${phone}', '${name}')">Mensaje personalizado</button>
    ${invoiceNumber ? `<button onclick="sendInvoicePDF('${invoiceNumber}')">Enviar factura PDF</button>` : ""}
  `;

  document.body.appendChild(menu);

  // Posición del menú
  menu.style.top = event.clientY + "px";
  menu.style.left = event.clientX + "px";

  // Cerrar al hacer clic fuera
  setTimeout(() => {
    window.addEventListener("click", function closeMenu(e) {
      if (!menu.contains(e.target)) {
        menu.remove();
        window.removeEventListener("click", closeMenu);
      }
    });
  }, 50);
}