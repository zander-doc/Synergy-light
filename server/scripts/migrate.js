require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('../models/Client');
const Invoice = require('../models/Invoice');

// Datos reales del Excel - CLIENTES (5 de 52, agregar los 47 restantes)
const clientsData = [
  {
    clientId: 'RVIX-E010-2',
    name: 'Roberto Villegas Rodríguez',
    address: '2405 Covina Ave McAllen Texas 78503',
    phone: '956490922',
    email: '',
    contractType: 'TARIFA KWH',
    ssid: '10032789473331500',
    startDate: new Date('2026-05-27'),
    endDate: new Date('2026-06-27'),
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
    startDate: new Date('2026-06-19'),
    endDate: new Date('2026-07-19'),
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
    startDate: new Date('2026-06-19'),
    endDate: new Date('2026-07-19'),
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
    startDate: new Date('2026-01-10'),
    endDate: new Date('2026-02-09'),
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
    startDate: new Date('2026-01-06'),
    endDate: new Date('2026-02-05'),
    salesAgent: 'AGENTE CARMEN VARGAS',
    paymentMethod: 'LINK DE PAGO',
    deposit: 75,
    status: 'SIN CONEXIÓN'
  }
  // Agregar los 47 clientes restantes aquí con el mismo formato
];

// Datos de facturas del Excel - FACTURAS (ejemplo)
const invoicesData = [
  {
    invoiceNumber: '35',
    clientId: 'RVIX-E010-2',
    clientName: 'Roberto Villegas Rodríguez',
    issueDate: new Date('2026-05-27'),
    dueDate: new Date('2026-06-27'),
    items: [
      {
        code: 'TFA00dep9-5',
        description: 'Depósito',
        quantity: 1,
        unitPrice: 95.00,
        total: 95.00
      }
    ],
    subtotal: 50.00,
    discount: 0,
    deposit: 45.00,
    total: 95.00,
    status: 'PAGADA'
  },
  {
    invoiceNumber: '35',
    clientId: 'CDEX-E010-2',
    clientName: 'Cassandra De La Garza',
    issueDate: new Date('2026-06-19'),
    dueDate: new Date('2026-07-19'),
    items: [
      {
        code: 'TFA00dep9-5',
        description: 'Depósito',
        quantity: 1,
        unitPrice: 95.00,
        total: 95.00
      }
    ],
    subtotal: 50.00,
    discount: 0,
    deposit: 45.00,
    total: 95.00,
    status: 'PENDIENTE'
  }
  // Agregar más facturas del Excel aquí...
];

const migrateData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Conectado a MongoDB');

    // Limpiar datos anteriores (descomentar para borrar datos existentes)
    // await Client.deleteMany({});
    // await Invoice.deleteMany({});

    // Migrar clientes
    console.log(`\n📋 Migrando ${clientsData.length} clientes...`);
    let createdClients = 0;
    let skippedClients = 0;
    
    for (const client of clientsData) {
      try {
        await Client.create(client);
        createdClients++;
        console.log(`✅ Cliente creado: ${client.clientId} - ${client.name}`);
      } catch (error) {
        if (error.code === 11000) {
          skippedClients++;
          console.log(`⚠️ Cliente ya existe: ${client.clientId}`);
        } else {
          console.error(`❌ Error creando cliente ${client.clientId}:`, error.message);
        }
      }
    }

    // Migrar facturas
    console.log(`\n📄 Migrando ${invoicesData.length} facturas...`);
    let createdInvoices = 0;
    let skippedInvoices = 0;
    
    for (const invoice of invoicesData) {
      try {
        await Invoice.create(invoice);
        createdInvoices++;
        console.log(`✅ Factura creada: ${invoice.invoiceNumber} - ${invoice.clientName}`);
      } catch (error) {
        if (error.code === 11000) {
          skippedInvoices++;
          console.log(`⚠️ Factura ya existe: ${invoice.invoiceNumber}`);
        } else {
          console.error(`❌ Error creando factura ${invoice.invoiceNumber}:`, error.message);
        }
      }
    }

    console.log('\n🎉 MIGRACIÓN COMPLETADA');
    console.log(`✅ Clientes creados: ${createdClients}`);
    console.log(`⚠️ Clientes omitidos: ${skippedClients}`);
    console.log(`✅ Facturas creadas: ${createdInvoices}`);
    console.log(`⚠️ Facturas omitidas: ${skippedInvoices}`);
    console.log('\n📌 Nota: Agregue los 47 clientes restantes en el array clientsData');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error en migración:', error);
    process.exit(1);
  }
};

migrateData();