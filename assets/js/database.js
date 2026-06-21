// Base de datos local con localStorage
const DB = {
  // Inicializar datos de ejemplo
  init() {
    if (!localStorage.getItem('synergy_clients')) {
      localStorage.setItem('synergy_clients', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_invoices')) {
      localStorage.setItem('synergy_invoices', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_prospects')) {
      localStorage.setItem('synergy_prospects', JSON.stringify([]));
    }
    if (!localStorage.getItem('synergy_users')) {
      // Usuario admin por defecto
      const defaultUser = {
        email: 'admin@synergylight.com',
        password: 'SynergyLight2026!Admin',
        role: 'admin'
      };
      localStorage.setItem('synergy_users', JSON.stringify([defaultUser]));
    }
  },

  // CLIENTES - Migrar desde Excel BASE DE DATOS
  migrateClients() {
    const clients = [
      {
        clientId: 'RVIX-E010-2',
        name: 'Roberto Villegas Rodríguez',
        address: '2405 Covina Ave McAllen Texas 78503',
        phone: '956490922',
        email: '',
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
        address: '1754 Calle Rancho Gr, San Benito Tx 78586',
        phone: '9563153628',
        email: 'Cassandrahernandez421@gmail.com',
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
        clientId: 'PHAX-E010-2',
        name: 'Paul Haley',
        address: '1563 Sandy Ln Apt 121, Fort Worth, TX, 76112',
        phone: '8174894853',
        email: 'Pearlinelewis1933@gmail.com',
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
        clientId: 'JGOX-E010-2',
        name: 'Joann Gonzales',
        address: '4702 Old Brownsville Rd Apt 1201 Corpus Christi, TX, 78405',
        phone: '3612859098',
        email: 'joanngonzales7474@gmail.com',
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
        address: '2109 Logan Ave Laredo, TX, 78040',
        phone: '9569497596',
        email: 'Valdmoedano666@icloud.com',
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

    const existingClients = this.getClients();
    if (existingClients.length === 0) {
      clients.forEach(client => {
        client.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        client.createdAt = new Date().toISOString();
        existingClients.push(client);
      });
      localStorage.setItem('synergy_clients', JSON.stringify(existingClients));
      console.log(`✅ ${clients.length} clientes migrados exitosamente`);
    }
  },

  // Clientes
  getClients() {
    return JSON.parse(localStorage.getItem('synergy_clients') || '[]');
  },

  saveClient(client) {
    const clients = this.getClients();
    client.id = client.id || Date.now().toString();
    client.createdAt = new Date().toISOString();
    clients.push(client);
    localStorage.setItem('synergy_clients', JSON.stringify(clients));
    return client;
  },

  updateClient(id, updatedData) {
    const clients = this.getClients();
    const index = clients.findIndex(c => c.id === id);
    if (index !== -1) {
      clients[index] = { ...clients[index], ...updatedData };
      localStorage.setItem('synergy_clients', JSON.stringify(clients));
      return clients[index];
    }
    return null;
  },

  deleteClient(id) {
    let clients = this.getClients();
    clients = clients.filter(c => c.id !== id);
    localStorage.setItem('synergy_clients', JSON.stringify(clients));
  },

  // FACTURAS - Migrar desde REGISTRO DE VENTAS
  migrateInvoices() {
    const invoices = [
      {
        invoiceNumber: '35',
        clientId: 'RVIX-E010-2',
        clientName: 'Roberto Villegas Rodríguez',
        issueDate: '2026-05-27',
        dueDate: '2026-06-27',
        income: 50.00,
        fixedCosts: 45.00,
        total: 95.00,
        status: 'PAGADA'
      },
      {
        invoiceNumber: '35',
        clientId: 'CDEX-E010-2',
        clientName: 'Cassandra De La Garza',
        issueDate: '2026-06-19',
        dueDate: '2026-07-19',
        income: 50.00,
        fixedCosts: 45.00,
        total: 95.00,
        status: 'PENDIENTE'
      },
      {
        invoiceNumber: '35',
        clientId: 'JGOX-E010-2',
        clientName: 'Joann Gonzales',
        issueDate: '2026-01-10',
        dueDate: '2026-02-09',
        income: 75.00,
        fixedCosts: 45.00,
        total: 120.00,
        status: 'PAGADA'
      }
    ];

    const existingInvoices = this.getInvoices();
    if (existingInvoices.length === 0) {
      invoices.forEach(invoice => {
        invoice.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
        invoice.createdAt = new Date().toISOString();
        existingInvoices.push(invoice);
      });
      localStorage.setItem('synergy_invoices', JSON.stringify(existingInvoices));
      console.log(`✅ ${invoices.length} facturas migradas exitosamente`);
    }
  },

  // Facturas
  getInvoices() {
    return JSON.parse(localStorage.getItem('synergy_invoices') || '[]');
  },

  saveInvoice(invoice) {
    const invoices = this.getInvoices();
    invoice.id = invoice.id || Date.now().toString();
    invoice.createdAt = new Date().toISOString();
    invoices.push(invoice);
    localStorage.setItem('synergy_invoices', JSON.stringify(invoices));
    return invoice;
  },

  // Prospectos
  getProspects() {
    return JSON.parse(localStorage.getItem('synergy_prospects') || '[]');
  },

  saveProspect(prospect) {
    const prospects = this.getProspects();
    prospect.id = prospect.id || Date.now().toString();
    prospect.createdAt = new Date().toISOString();
    prospects.push(prospect);
    localStorage.setItem('synergy_prospects', JSON.stringify(prospects));
    return prospect;
  },

  // Usuarios
  getUsers() {
    return JSON.parse(localStorage.getItem('synergy_users') || '[]');
  },

  validateUser(email, password) {
    const users = this.getUsers();
    return users.find(u => u.email === email && u.password === password);
  }
};

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
  DB.init();
  DB.migrateClients();
  DB.migrateInvoices();
});
