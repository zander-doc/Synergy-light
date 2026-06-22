// ===============================
// INICIALIZACIÓN DE DATOS REALES - SYNERGY LIGHT
// ===============================

function initializeData() {
  console.log('🌍 Inicializando datos reales de Synergy Light...');
  
  // Clientes reales del Excel
  const clients = [
    {
      clientId: 'PHAX-E010-2',
      name: 'Paul Haley',
      phone: '8174894853',
      email: 'Pearlinelewis1933@gmail.com',
      address: '1563 Sandy Ln Apt 121, Fort Worth, TX, 76112',
      contractType: 'TARIFA KWH',
      ssid: '10443720002157800',
      startDate: '2026-06-19',
      endDate: '2026-07-19',
      salesAgent: 'AGENTE CARMEN VARGAS',
      paymentMethod: 'ZELLE',
      deposit: 50,
      status: 'POR DESCONECTAR'
    },
    {
      clientId: 'RVIX-E010-2',
      name: 'Roberto Villegas Rodríguez',
      phone: '956490922',
      email: '',
      address: '2405 Covina Ave McAllen Texas 78503',
      contractType: 'TARIFA KWH',
      ssid: '10032789473331500',
      startDate: '2026-05-27',
      endDate: '2026-06-27',
      salesAgent: 'AGENTE CARMEN VARGAS',
      paymentMethod: 'ZELLE',
      deposit: 50,
      status: 'ACTIVO'
    },
    {
      clientId: 'CDEX-E010-2',
      name: 'Cassandra De La Garza',
      phone: '9563153628',
      email: 'Cassandrahernandez421@gmail.com',
      address: '1754 Calle Rancho Gr, San Benito Tx 78586',
      contractType: 'TARIFA KWH',
      ssid: '10032789405738800',
      startDate: '2026-06-19',
      endDate: '2026-07-19',
      salesAgent: 'AGENTE EMMA GARCIA',
      paymentMethod: 'CASHAPP',
      deposit: 50,
      status: 'POR DESCONECTAR'
    },
    {
      clientId: 'JGOX-E010-2',
      name: 'Joann Gonzales',
      phone: '3612859098',
      email: 'joanngonzales7474@gmail.com',
      address: '4702 Old Brownsville Rd Apt 1201 Corpus Christi, TX, 78405',
      contractType: 'TARIFA FIJA',
      ssid: '10032789487077900',
      startDate: '2026-01-10',
      endDate: '2026-02-09',
      salesAgent: 'AGENTE CARMEN VARGAS',
      paymentMethod: 'LINK DE PAGO',
      deposit: 75,
      status: 'SIN CONEXIÓN'
    },
    {
      clientId: 'OMUX-E010-2',
      name: 'Oswaldo Muedano Hernandez',
      phone: '9569497596',
      email: 'Valdmoedano666@icloud.com',
      address: '2109 Logan Ave Laredo, TX, 78040',
      contractType: 'TARIFA FIJA',
      ssid: '10032789438675800',
      startDate: '2026-01-06',
      endDate: '2026-02-05',
      salesAgent: 'AGENTE CARMEN VARGAS',
      paymentMethod: 'LINK DE PAGO',
      deposit: 75,
      status: 'SIN CONEXIÓN'
    }
  ];

  // Facturas reales del Excel
  const invoices = [
    {
      invoiceNumber: '35',
      clientId: 'RVIX-E010-2',
      clientName: 'Roberto Villegas Rodríguez',
      issueDate: '2026-05-27',
      dueDate: '2026-06-27',
      income: 50,
      fixedCosts: 45,
      deposit: 0,
      total: 95,
      status: 'PAGADA',
      paymentMethod: 'ZELLE'
    },
    {
      invoiceNumber: '36',
      clientId: 'CDEX-E010-2',
      clientName: 'Cassandra De La Garza',
      issueDate: '2026-06-19',
      dueDate: '2026-07-19',
      income: 50,
      fixedCosts: 45,
      deposit: 0,
      total: 95,
      status: 'PENDIENTE',
      paymentMethod: 'CASHAPP'
    },
    {
      invoiceNumber: '37',
      clientId: 'JGOX-E010-2',
      clientName: 'Joann Gonzales',
      issueDate: '2026-01-10',
      dueDate: '2026-02-09',
      income: 75,
      fixedCosts: 45,
      deposit: 0,
      total: 120,
      status: 'PAGADA',
      paymentMethod: 'LINK DE PAGO'
    },
    {
      invoiceNumber: '38',
      clientId: 'OMUX-E010-2',
      clientName: 'Oswaldo Muedano Hernandez',
      issueDate: '2026-01-06',
      dueDate: '2026-02-05',
      income: 75,
      fixedCosts: 45,
      deposit: 0,
      total: 120,
      status: 'PAGADA',
      paymentMethod: 'LINK DE PAGO'
    }
  ];

  // Guardar en localStorage SOLO si no existe
  if (!localStorage.getItem('clients')) {
    localStorage.setItem('clients', JSON.stringify(clients));
    console.log('✅', clients.length, 'clientes cargados en localStorage');
  } else {
    console.log('ℹ️ Los clientes ya existen en localStorage');
  }
  
  if (!localStorage.getItem('invoices')) {
    localStorage.setItem('invoices', JSON.stringify(invoices));
    console.log('✅', invoices.length, 'facturas cargadas en localStorage');
  } else {
    console.log('ℹ️ Las facturas ya existen en localStorage');
  }
  
  console.log('✅ Datos inicializados correctamente');
}

// Ejecutar al cargar el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeData);
} else {
  initializeData();
}