require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/database');
const User = require('./models/User');

// Rutas
const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clients');
const invoiceRoutes = require('./routes/invoices');
const contractRoutes = require('./routes/contracts');
const prospectRoutes = require('./routes/prospects');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de 100 requests
});
app.use('/api/', limiter);

// Conectar a base de datos
connectDB();

// Crear admin por defecto si no existe
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ email: process.env.ADMIN_EMAIL });
    if (!adminExists) {
      const admin = new User({
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
        role: 'admin'
      });
      await admin.save();
      console.log('Admin creado por defecto');
    }
  } catch (error) {
    console.error('Error creando admin:', error);
  }
};

// Servir archivos estáticos del panel admin
app.use('/admin', express.static('../admin'));

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/contracts', contractRoutes);
app.use('/api/prospects', prospectRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'Synergy Light API - Sistema de Facturación' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Error del servidor' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
  await createDefaultAdmin();
});