const express = require('express');
const router = express.Router();
const Prospect = require('../models/Prospect');
const { protect } = require('../middleware/auth');

// Obtener todos los prospectos
router.get('/', protect, async (req, res) => {
  try {
    const prospects = await Prospect.find().sort({ createdAt: -1 });
    res.json(prospects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener prospecto por ID
router.get('/:id', protect, async (req, res) => {
  try {
    const prospect = await Prospect.findById(req.params.id);
    if (!prospect) {
      return res.status(404).json({ message: 'Prospecto no encontrado' });
    }
    res.json(prospect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Crear prospecto
router.post('/', protect, async (req, res) => {
  try {
    const prospect = new Prospect(req.body);
    await prospect.save();
    res.status(201).json(prospect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Actualizar prospecto
router.put('/:id', protect, async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!prospect) {
      return res.status(404).json({ message: 'Prospecto no encontrado' });
    }
    res.json(prospect);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Eliminar prospecto
router.delete('/:id', protect, async (req, res) => {
  try {
    const prospect = await Prospect.findByIdAndDelete(req.params.id);
    if (!prospect) {
      return res.status(404).json({ message: 'Prospecto no encontrado' });
    }
    res.json({ message: 'Prospecto eliminado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;