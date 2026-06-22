// ============================================
// SCRIPT DE DIAGNÓSTICO PARA CONSOLA DEL NAVEGADOR
// Copia y pega esto en la consola (F12) de:
// - http://127.0.0.1:5500/admin/clients.html
// - http://127.0.0.1:5500/admin/dashboard.html
// - http://127.0.0.1:5500/admin/invoices.html
// ============================================

console.log('=== DIAGNÓSTICO MANUAL ===\n');

// 1. Verificar localStorage
console.log('📦 LOCALSTORAGE:');
console.log('  clients:', localStorage.getItem('clients') || 'VACÍO');
console.log('  invoices:', localStorage.getItem('invoices') || 'VACÍO');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
console.log('  token:', token || 'NO HAY TOKEN');
console.log('  ⚠️ Si NO HAY TOKEN, requireAuth() redirige a login.html y NADA se ejecuta');

// 2. Verificar funciones globales
console.log('\n🔧 FUNCIONES GLOBALES:');
const funciones = [
  'generateClientId',
  'generateInvoiceNumber', 
  'generateContractNumber',
  'openWhatsAppMenu',
  'sendWhatsApp',
  'sendReminder',
  'sendCustomMessage',
  'sendInvoicePDF',
  'openWA',
  'renderClients',
  'saveClient',
  'loadNewClientModal',
  'checkAutoOpenModal',
  'createInvoiceFromClient',
  'createContractFromClient',
  'openEditClient',
  'renderInvoices',
  'saveInvoice',
  'loadDashboard',
  'renderKPIs',
  'requireAuth',
  'loadGlobalComponents',
  'logout'
];

funciones.forEach(fn => {
  const existe = typeof window[fn] === 'function';
  console.log(`  ${fn}: ${existe ? '✅' : '❌'}`);
});

// 3. Verificar elementos del DOM
console.log('\n📄 ELEMENTOS DEL DOM:');
const elementos = [
  'sidebar',
  'header', 
  'newClientModal',
  'invoiceModal',
  'clientsTableBody',
  'invoicesTableBody',
  'recentClientsBody',
  'recentInvoicesBody',
  'totalClients',
  'totalInvoices',
  'totalRevenue',
  'expiringClients'
];

elementos.forEach(id => {
  const elem = document.getElementById(id);
  console.log(`  #${id}: ${elem ? '✅' : '❌'}`);
});

// 4. Probar funciones individualmente
console.log('\n🧪 PRUEBAS:');
try {
  const testId = generateClientId('Juan Pérez');
  console.log(`  generateClientId('Juan Pérez') = ${testId} ✅`);
} catch(e) {
  console.log(`  generateClientId: ❌ ${e.message}`);
}

try {
  const testInv = generateInvoiceNumber();
  console.log(`  generateInvoiceNumber() = ${testInv} ✅`);
} catch(e) {
  console.log(`  generateInvoiceNumber: ❌ ${e.message}`);
}

// 5. Verificar errores de carga
console.log('\n⚠️ ERRORES DE CARGA:');
window.addEventListener('error', (e) => {
  console.error(`  ${e.filename}:${e.lineno} - ${e.message}`);
});

console.log('\n✅ Diagnóstico completado. Revisa los resultados arriba.');
console.log('Si ves ❌ en funciones, significa que el script no se cargó.');
console.log('Si ves ❌ en elementos del DOM, significa que no se renderizaron.');