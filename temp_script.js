// Helper script to replace IDs in admin/clients.html
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'admin', 'clients.html');
let content = fs.readFileSync(filePath, 'utf8');

console.log('File size:', content.length);

// Check for the first replacement
const testStr = '<label for="clienteNombre">Nombre Completo *</label>';
const idx = content.indexOf(testStr);
console.log('Test string found at:', idx);
if (idx >= 0) {
  console.log('Context:', JSON.stringify(content.substring(idx-5, idx+100)));
}

// Check encoding - show first few bytes
console.log('First 50 chars:', JSON.stringify(content.substring(0, 50)));
