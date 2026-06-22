// ============================================
// DIAGNÓSTICO SIMPLE - PEGAR EN CONSOLA F12
// ============================================

console.log('=== DIAGNÓSTICO SIMPLE ===\n');

// 1. Verificar si hay errores de sintaxis
console.log('1. ¿Hay errores de sintaxis?');
try {
  eval('function test() { return true; }');
  console.log('   ✅ No hay errores de sintaxis\n');
} catch(e) {
  console.log('   ❌ ERROR DE SINTAXIS:', e.message, '\n');
}

// 2. Verificar token
console.log('2. Token de autenticación:');
const token = localStorage.getItem('token') || sessionStorage.getItem('token');
console.log('   Token:', token || 'NO HAY TOKEN');
if (!token) {
  console.log('   ⚠️ SIN TOKEN = requireAuth() redirige a login.html\n');
} else {
  console.log('   ✅ Token encontrado\n');
}

// 3. Verificar funciones paso a paso
console.log('3. Funciones cargadas:');
const scripts = [
  { name: 'utils.js', fn: 'openWhatsAppMenu', file: 'js/utils.js' },
  { name: 'generator.js', fn: 'generateClientId', file: 'js/modules/generator.js' },
  { name: 'clients.js', fn: 'renderClients', file: 'js/modules/clients.js' },
  { name: 'invoices.js', fn: 'renderInvoices', file: 'js/modules/invoices.js' },
  { name: 'dashboard.js', fn: 'loadDashboard', file: 'js/dashboard.js' }
];

scripts.forEach(script => {
  const fn = window[script.fn];
  console.log(`   ${script.name}: ${typeof fn === 'function' ? '✅' : '❌'} (${script.fn})`);
});

// 4. Verificar elementos del DOM
console.log('\n4. Elementos del DOM:');
const elements = ['sidebar', 'header', 'clientsTableBody', 'invoicesTableBody', 'newClientModal'];
elements.forEach(id => {
  const elem = document.getElementById(id);
  console.log(`   #${id}: ${elem ? '✅' : '❌'}`);
});

// 5. Verificar localStorage
console.log('\n5. Datos en localStorage:');
console.log('   clients:', localStorage.getItem('clients') || 'VACÍO');
console.log('   invoices:', localStorage.getItem('invoices') || 'VACÍO');

// 6. Prueba de generación de ID
console.log('\n6. Prueba generateClientId():');
try {
  if (typeof generateClientId === 'function') {
    const id = generateClientId('Juan Pérez');
    console.log('   ✅ generateClientId("Juan Pérez") =', id);
  } else {
    console.log('   ❌ generateClientId no está definida');
  }
} catch(e) {
  console.log('   ❌ ERROR:', e.message);
}

console.log('\n=== FIN DEL DIAGNÓSTICO ===');
console.log('Si ves ❌ en TODAS las funciones, el problema es que:');
console.log('1. No hay token y requireAuth() redirige a login');
console.log('2. O hay un error de sintaxis que detiene la ejecución');
console.log('3. O los archivos JS no se están cargando (verifica la pestaña Network)');