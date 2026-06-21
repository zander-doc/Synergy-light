const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const { protect } = require('../middleware/auth');
const { generateContractPDF } = require('../utils/pdfGenerator');

// Obtener todos los contratos
router.get('/', protect, async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 });
    res.json(contracts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear contrato
router.post('/', protect, async (req, res) => {
  try {
    const contract = new Contract(req.body);
    await contract.save();
    res.status(201).json(contract);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Generar PDF de contrato
router.get('/:contractNumber/pdf', protect, async (req, res) => {
  try {
    const contract = await Contract.findOne({ contractNumber: req.params.contractNumber });
    if (!contract) {
      return res.status(404).json({ message: 'Contrato no encontrado' });
    }

    const pdfBuffer = await generateContractPDF(contract);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=contrato-${contract.contractNumber}.pdf`
    });
    
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;