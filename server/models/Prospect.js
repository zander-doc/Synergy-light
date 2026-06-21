const mongoose = require('mongoose');

const prospectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['PENDIENTE', 'CONTACTADO', 'INTERESADO', 'NO INTERESADO', 'CONTRATADO'],
    default: 'PENDIENTE'
  },
  condition: {
    type: String,
    default: ''
  },
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Prospect', prospectSchema);