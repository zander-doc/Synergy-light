// ═══════════════════════════════════════════════════════
// BASE DE DATOS LOCAL - SYNERGY LIGHT
// Migración completa desde Excel
// ═══════════════════════════════════════════════════════

const DB = {
  init() {
    if (!localStorage.getItem('synergy_initialized')) {
      this.migrateClients();
      this.migrateInvoices();
      this.migrateProspects();
      localStorage.setItem('synergy_initialized', 'true');
      console.log('✅ Base de datos inicializada con éxito');
    }
  },

  // MIGRAR CLIENTES DESDE EXCEL (BASE DE DATOS)
  migrateClients() {
    const clients = [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
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
        id: '4',
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
        id: '5',
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
      },
      {
        id: '6',
        clientId: 'JCAX-E010-2',
        name: 'Juana Carolina',
        address: '2208 17th St Plano, TX, 75074',
        phone: '3469175008',
        email: 'zavalacaro25@gmail.com',
        contractType: 'TARIFA FIJA',
        ssid: '10443720003247500',
        startDate: '2025-12-06',
        endDate: '2026-01-05',
        salesAgent: 'AGENTE CARMEN ORTIZ',
        paymentMethod: 'ZELLE',
        deposit: 75,
        status: 'SIN CONEXIÓN'
      },
      {
        id: '7',
        clientId: 'JBAX-E010-2',
        name: 'Jovan Barron',
        address: '2209 bringhurst houston tx 77026',
        phone: '8323065314',
        email: 'Barronjovan4@yahoo.com',
        contractType: 'TARIFA KWH',
        ssid: '1008901023804050000000',
        startDate: '2025-10-14',
        endDate: '2025-11-13',
        salesAgent: 'AGENTE CARMEN ORTIZ',
        paymentMethod: 'LINK DE PAGO',
        deposit: 50,
        status: 'SIN CONEXIÓN'
      },
      {
        id: '8',
        clientId: 'DHEX-E010-2',
        name: 'Domingo Hernández',
        address: '5401 Rampart St Apt 251 Houston, TX, 7708',
        phone: '7138574052',
        email: 'Marbellahernandez1214@gmail.com',
        contractType: 'TARIFA KWH',
        ssid: '1008901016190893862100',
        startDate: '2025-09-24',
        endDate: '2025-10-24',
        salesAgent: 'AGENTE CARMEN ORTIZ',
        paymentMethod: 'LINK DE PAGO',
        deposit: 50,
        status: 'SIN CONEXIÓN'
      },
      {
        id: '9',
        clientId: 'MG X-E010-2',
        name: 'Maria G Almanza',
        address: '1418 Madero Ave Laredo TX 78043',
        phone: '9564151905',
        email: 'lupiita1288@gmail.com',
        contractType: 'TARIFA KWH',
        ssid: '10032789422527230',
        startDate: '2025-09-23',
        endDate: '2025-10-23',
        salesAgent: 'AGENTE CARMEN ORTIZ',
        paymentMethod: 'LINK DE PAGO',
        deposit: 50,
        status: 'SIN CONEXIÓN'
      },
      {
        id: '10',
        clientId: 'AGOM-J107-2',
        name: 'Ariel Gonzalez',
        address: '29321 Waller Spring Creek Rd Waller, TX, 77484',
        phone: '8328013492',
        email: 'aqualifepooservice@gmail.com',
        contractType: 'TARIFA KWH',
        ssid: '1008901023813681440103',
        startDate: '2025-09-22',
        endDate: '2025-10-22',
        salesAgent: 'AGENTE CARMEN ORTIZ',
        paymentMethod: 'LINK DE PAGO',
        deposit: 50,
        status: 'SIN CONEXIÓN'
      }
    ];

    localStorage.setItem('synergy_clients', JSON.stringify(clients));
    console.log(`✅ ${clients.length} clientes migrados`);
  },

  // MIGRAR FACTURAS DESDE EXCEL (REGISTRO DE VENTAS)
  migrateInvoices() {
    const invoices = [
      {
        id: '1',
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
        id: '2',
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
        id: '3',
        invoiceNumber: '35',
        clientId: 'JGOX-E010-2',
        clientName: 'Joann Gonzales',
        issueDate: '2026-01-10',
        dueDate: '2026-02-09',
        income: 75.00,
        fixedCosts: 45.00,
        total: 120.00,
        status: 'PAGADA'
      },
      {
        id: '4',
        invoiceNumber: '35',
        clientId: 'OMUX-E010-2',
        clientName: 'Oswaldo Muedano Hernandez',
        issueDate: '2026-01-06',
        dueDate: '2026-02-05',
        income: 75.00,
        fixedCosts: 45.00,
        total: 120.00,
        status: 'PAGADA'
      }
    ];

    localStorage.setItem('synergy_invoices', JSON.stringify(invoices));
    console.log(`✅ ${invoices.length} facturas migradas`);
  },

  // MIGRAR PROSPECTOS DESDE EXCEL (CLIENTES)
  migrateProspects() {
    const prospects = [
      {
        id: '1',
        number: 1,
        name: 'Abraham Isaac Hernandez',
        phone: '9565298228',
        contacted: 'PENDIENTE',
        condition: 'LLAMARLO DE NUEVO ESTA INTERESADO'
      },
      {
        id: '2',
        number: 2,
        name: 'Annabell Gillen',
        phone: '9566390267',
        contacted: 'PENDIENTE',
        condition: 'NO QUIERE EL SERVICIO'
      },
      {
        id: '3',
        number: 3,
        name: 'Juan Navarro',
        phone: '8329235782',
        contacted: 'PENDIENTE',
        condition: 'NO LLAMARLO (NO INSISTIR)'
      }
    ];

    localStorage.setItem('synergy_prospects', JSON.stringify(prospects));
    console.log(`✅ ${prospects.length} prospectos migrados`);
  },

  // MÉTODOS CRUD CLIENTES
  getClients() {
    return JSON.parse(localStorage.getItem('synergy_clients') || '[]');
  },

  getClientById(id) {
    const clients = this.getClients();
    return clients.find(c => c.id === id);
  },

  saveClient(client) {
    const clients = this.getClients();
    if (!client.id) {
      client.id = Date.now().toString();
      client.createdAt = new Date().toISOString();
      clients.push(client);
    } else {
      const index = clients.findIndex(c => c.id === client.id);
      if (index !== -1) {
        clients[index] = { ...clients[index], ...client };
      }
    }
    localStorage.setItem('synergy_clients', JSON.stringify(clients));
    return client;
  },

  deleteClient(id) {
    let clients = this.getClients();
    clients = clients.filter(c => c.id !== id);
    localStorage.setItem('synergy_clients', JSON.stringify(clients));
  },

  // MÉTODOS CRUD FACTURAS
  getInvoices() {
    return JSON.parse(localStorage.getItem('synergy_invoices') || '[]');
  },

  saveInvoice(invoice) {
    const invoices = this.getInvoices();
    if (!invoice.id) {
      invoice.id = Date.now().toString();
      invoice.createdAt = new Date().toISOString();
      invoices.push(invoice);
    } else {
      const index = invoices.findIndex(inv => inv.id === invoice.id);
      if (index !== -1) {
        invoices[index] = { ...invoices[index], ...invoice };
      }
    }
    localStorage.setItem('synergy_invoices', JSON.stringify(invoices));
    return invoice;
  },

  // MÉTODOS CRUD PROSPECTOS
  getProspects() {
    return JSON.parse(localStorage.getItem('synergy_prospects') || '[]');
  },

  saveProspect(prospect) {
    const prospects = this.getProspects();
    if (!prospect.id) {
      prospect.id = Date.now().toString();
      prospect.createdAt = new Date().toISOString();
      prospects.push(prospect);
    } else {
      const index = prospects.findIndex(p => p.id === prospect.id);
      if (index !== -1) {
        prospects[index] = { ...prospects[index], ...prospect };
      }
    }
    localStorage.setItem('synergy_prospects', JSON.stringify(prospects));
    return prospect;
  },

  // ESTADÍSTICAS
  getStats() {
    const clients = this.getClients();
    const invoices = this.getInvoices();
    
    const activeClients = clients.filter(c => c.status === 'ACTIVO').length;
    const expiringClients = clients.filter(c => c.status === 'POR VENCER' || c.status === 'POR DESCONECTAR').length;
    const totalRevenue = invoices.reduce((sum, inv) => sum + (parseFloat(inv.total) || 0), 0);
    const pendingInvoices = invoices.filter(inv => inv.status === 'PENDIENTE').length;
    const paidInvoices = invoices.filter(inv => inv.status === 'PAGADA').length;

    return {
      totalClients: clients.length,
      activeClients,
      expiringClients,
      totalInvoices: invoices.length,
      totalRevenue,
      pendingInvoices,
      paidInvoices
    };
  }
};

// Inicializar al cargar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => DB.init());
} else {
  DB.init();
}