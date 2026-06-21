const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  clientId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true
  },
  contractType: {
    type: String,
    enum: ['TARIFA FIJA', 'TARIFA KWH'],
    required: true
  },
  ssid: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  salesAgent: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['ZELLE', 'CASHAPP', 'LINK DE PAGO'],
    required: true
  },
  deposit: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['ACTIVO', 'POR VENCER', 'VENCIDO', 'SIN CONEXIÓN', 'POR DESCONECTAR'],
    default: 'ACTIVO'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);