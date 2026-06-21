// ═══════════════════════════════════════════════════════
// PANEL ADMIN SYNERGY LIGHT
// ═══════════════════════════════════════════════════════

// Contraseña de acceso (cambiar en producción)
const ADMIN_PASSWORD = 'synergy2026';

// Datos de ejemplo (migrar desde Excel)
const clientesData = [
  {
    id: 'RVIX-E010-2',
    nombre: 'Roberto Villegas Rodríguez',
    telefono: '956490922',
    contrato: 'TARIFA KWH',
    fechaInicio: '2026-05-27',
    fechaCorte: '2026-06-27',
    status: 'ACTIVO'
  },
  // Agregar más clientes aquí
];

const ventasData = [
  {
    fecha: '2026-05-27',
    nroFactura: '35',
    cliente: 'Roberto Villegas Rodríguez',
    ingreso: 50.00,
    costos: 45.00,
    total: 95.00
  },
  // Agregar más ventas aquí
];

const prospectosData = [
  {
    nro: 1,
    nombre: 'Abraham Isaac Hernandez',
    telefono: '9565298228',
    status: 'PENDIENTE',
    condicion: 'LLAMARLO DE NUEVO ESTA INTERESADO'
  },
  // Agregar más prospectos aquí
];

// LOGIN
document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const password = document.getElementById('adminPassword').value;
  
  if (password === ADMIN_PASSWORD) {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminPanel').style.display = 'flex';
    localStorage.setItem('adminLoggedIn', 'true');
    initDashboard();
  } else {
    document.getElementById('loginError').textContent = 'Contraseña incorrecta';
  }
});

// LOGOUT
document.getElementById('logoutBtn').addEventListener('click', function(e) {
  e.preventDefault();
  localStorage.removeItem('adminLoggedIn');
  location.reload();
});

// Verificar si ya está logueado
if (localStorage.getItem('adminLoggedIn') === 'true') {
  document.getElementById('loginScreen').style.display = 'none';
  document.getElementById('adminPanel').style.display = 'flex';
  initDashboard();
}

// NAVEGACIÓN
document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Remover active de todos
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    
    // Agregar active al clickeado
    this.classList.add('active');
    const section = this.getAttribute('data-section');
    document.getElementById(section).classList.add('active');
    
    // Actualizar título
    document.getElementById('pageTitle').textContent = this.querySelector('span:last-child').textContent;
  });
});

// INICIALIZAR DASHBOARD
function initDashboard() {
  renderClientes();
  renderVentas();
  renderProspectos();
  initChart();
}

// RENDER CLIENTES
function renderClientes() {
  const tbody = document.getElementById('clientesTableBody');
  tbody.innerHTML = '';
  
  clientesData.forEach(cliente => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${cliente.id}</td>
      <td>${cliente.nombre}</td>
      <td>${cliente.telefono}</td>
      <td>${cliente.contrato}</td>
      <td>${cliente.fechaInicio}</td>
      <td>${cliente.fechaCorte}</td>
      <td><span class="status-badge ${cliente.status.toLowerCase()}">${cliente.status}</span></td>
      <td>
        <button class="btn-action" onclick="editarCliente('${cliente.id}')">✏️</button>
        <button class="btn-action" onclick="enviarWhatsApp('${cliente.telefono}')">💬</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// RENDER VENTAS
function renderVentas() {
  const tbody = document.getElementById('ventasTableBody');
  tbody.innerHTML = '';
  
  ventasData.forEach(venta => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${venta.fecha}</td>
      <td>${venta.nroFactura}</td>
      <td>${venta.cliente}</td>
      <td>$${venta.ingreso.toFixed(2)}</td>
      <td>$${venta.costos.toFixed(2)}</td>
      <td>$${venta.total.toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

// RENDER PROSPECTOS
function renderProspectos() {
  const tbody = document.getElementById('prospectosTableBody');
  tbody.innerHTML = '';
  
  prospectosData.forEach(prospecto => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prospecto.nro}</td>
      <td>${prospecto.nombre}</td>
      <td>${prospecto.telefono}</td>
      <td>${prospecto.status}</td>
      <td>${prospecto.condicion}</td>
      <td>
        <button class="btn-action" onclick="enviarWhatsApp('${prospecto.telefono}')">💬</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// GRÁFICO DE VENTAS
function initChart() {
  const ctx = document.getElementById('ventasChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
      datasets: [{
        label: 'Ventas',
        data: [1200, 1900, 3000, 5000, 2300, 3169],
        borderColor: '#03bc89',
        backgroundColor: 'rgba(3, 188, 137, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: '#FFFFFF'
          }
        }
      },
      scales: {
        y: {
          ticks: {
            color: '#B0B0B0'
          },
          grid: {
            color: 'rgba(3, 188, 137, 0.1)'
          }
        },
        x: {
          ticks: {
            color: '#B0B0B0'
          },
          grid: {
            color: 'rgba(3, 188, 137, 0.1)'
          }
        }
      }
    }
  });
}

// FUNCIONES AUXILIARES
function enviarWhatsApp(telefono) {
  const mensaje = 'Hola, te contactamos de Synergy Light';
  window.open(`https://wa.me/1${telefono}?text=${encodeURIComponent(mensaje)}`, '_blank');
}

function editarCliente(id) {
  alert('Editar cliente: ' + id);
  // Implementar modal de edición
}

// GENERAR FACTURA PDF
document.getElementById('facturaForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Generando factura PDF...');
  // Implementar generación de PDF con jsPDF
});

// GENERAR CONTRATO PDF
document.getElementById('contratoForm').addEventListener('submit', function(e) {
  e.preventDefault();
  alert('Generando contrato PDF...');
  // Implementar generación de PDF con jsPDF
});