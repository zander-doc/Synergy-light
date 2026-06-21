const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  contractNumber: {
    type: String,
    required: true,
    unique: true
  },
  clientId: {
    type: String,
    ref: 'Client',
    required: true
  },
  clientName: {
    type: String,
    required: true
  },
  contractType: {
    type: String,
    enum: ['TARIFA FIJA', 'TARIFA KWH'],
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
  terms: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Contract', contractSchema);