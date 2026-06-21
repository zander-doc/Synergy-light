const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { generateToken } = require('../config/jwt');
const { protect } = require('../middleware/auth');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Obtener usuario actual
router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

// Cambiar contraseña
router.put('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña actual incorrecta' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Recuperar contraseña (simplificado - en producción usar email)
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Email no encontrado' });
    }

    // En producción: enviar email con token de recuperación
    // Por ahora retornamos éxito
    res.json({ 
      message: 'Se han enviado instrucciones a tu email',
      // En producción: retornar token o link de recuperación
      resetToken: 'simulated-reset-token'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Verificar token
router.get('/verify', protect, async (req, res) => {
  res.json({ valid: true, user: req.user });
});

module.exports = router;
