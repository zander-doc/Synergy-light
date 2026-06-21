# Synergy Light - Sistema de Facturación

Sistema de facturación completo para Synergy Light con backend Node.js, MongoDB, autenticación JWT y generación de PDFs.

## 🚀 Características

- ✅ Autenticación JWT
- ✅ Gestión de clientes
- ✅ Generación de facturas PDF
- ✅ Generación de contratos PDF
- ✅ Seguimiento de prospectos
- ✅ Integración con WhatsApp
- ✅ Dashboard con métricas
- ✅ API RESTful
- ✅ Rate limiting y seguridad con Helmet

## 📋 Requisitos Previos

- Node.js (v14 o superior)
- MongoDB (local o MongoDB Atlas)
- npm o yarn

## 🔧 Instalación

### 1. Clonar el repositorio
```bash
git clone <tu-repositorio>
cd web_synergy-light/server
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Copiar el archivo `.env` y modificar según tu entorno:

```bash
cp .env.example .env
```

Variables importantes:
- `MONGODB_URI`: URL de conexión a MongoDB
- `JWT_SECRET`: Clave secreta para JWT (cambiar en producción)
- `ADMIN_EMAIL`: Email del administrador
- `ADMIN_PASSWORD`: Contraseña del administrador

### 4. Iniciar MongoDB

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
sudo systemctl start mongodb
```

O usar MongoDB Atlas (cloud):
- Crear cuenta en https://www.mongodb.com/atlas
- Obtener connection string
- Actualizar `MONGODB_URI` en `.env`

### 5. Migrar datos iniciales

```bash
npm run migrate
```

O manualmente:
```bash
node server/scripts/migrate.js
```

### 6. Iniciar el servidor

**Modo desarrollo:**
```bash
npm run dev
```

**Modo producción:**
```bash
npm start
```

El servidor estará disponible en: `http://localhost:5000`

## 📊 Acceso al Panel Admin

1. Abrir navegador en: `http://localhost:5000/admin` (si está configurado)
2. O abrir directamente: `admin/index.html`
3. Credenciales por defecto:
   - Email: `admin@synergylight.com`
   - Password: `SynergyLight2026!Admin`

## 🔌 API Endpoints

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `PUT /api/auth/change-password` - Cambiar contraseña

### Clientes
- `GET /api/clients` - Obtener todos los clientes
- `GET /api/clients/:clientId` - Obtener cliente por ID
- `POST /api/clients` - Crear nuevo cliente
- `PUT /api/clients/:clientId` - Actualizar cliente
- `DELETE /api/clients/:clientId` - Eliminar cliente

### Facturas
- `GET /api/invoices` - Obtener todas las facturas
- `POST /api/invoices` - Crear factura
- `GET /api/invoices/:invoiceNumber/pdf` - Descargar PDF de factura

### Contratos
- `GET /api/contracts` - Obtener todos los contratos
- `POST /api/contracts` - Crear contrato
- `GET /api/contracts/:contractNumber/pdf` - Descargar PDF de contrato

### Prospectos
- `GET /api/prospects` - Obtener todos los prospectos
- `POST /api/prospects` - Crear prospecto
- `PUT /api/prospects/:id` - Actualizar prospecto
- `DELETE /api/prospects/:id` - Eliminar prospecto

## 📁 Estructura del Proyecto

```
server/
├── config/
│   ├── database.js      # Conexión a MongoDB
│   └── jwt.js           # Configuración JWT
├── models/
│   ├── User.js          # Modelo de usuario
│   ├── Client.js        # Modelo de cliente
│   ├── Invoice.js       # Modelo de factura
│   ├── Contract.js      # Modelo de contrato
│   └── Prospect.js      # Modelo de prospecto
├── routes/
│   ├── auth.js          # Rutas de autenticación
│   ├── clients.js       # Rutas de clientes
│   ├── invoices.js      # Rutas de facturas
│   ├── contracts.js     # Rutas de contratos
│   └── prospects.js     # Rutas de prospectos
├── middleware/
│   └── auth.js          # Middleware de autenticación
├── utils/
│   ├── pdfGenerator.js  # Generador de PDFs
│   └── whatsapp.js      # Utilidades de WhatsApp
├── scripts/
│   └── migrate.js       # Script de migración de datos
├── .env                 # Variables de entorno
├── package.json
└── server.js            # Servidor principal

admin/
├── index.html           # Panel admin
├── css/
│   └── admin.css        # Estilos del panel
└── js/
    └── admin.js         # Lógica del panel
```

## 🔒 Seguridad

- Contraseñas encriptadas con bcrypt
- Autenticación JWT
- Rate limiting (100 requests cada 15 minutos)
- Helmet para headers de seguridad
- CORS configurado
- Validación de datos

## 📦 Dependencias Principales

- **express**: Framework web
- **mongoose**: ODM para MongoDB
- **bcryptjs**: Encriptación de contraseñas
- **jsonwebtoken**: Autenticación JWT
- **pdfkit**: Generación de PDFs
- **nodemailer**: Envío de emails
- **helmet**: Seguridad
- **cors**: CORS middleware
- **express-rate-limit**: Rate limiting

## 🚀 Despliegue en Producción

### Opción 1: VPS (DigitalOcean, AWS, etc.)

1. Configurar servidor Node.js
2. Instalar MongoDB
3. Configurar Nginx como reverse proxy
4. Usar PM2 para mantener el servidor corriendo:
   ```bash
   npm install -g pm2
   pm2 start server.js
   pm2 save
   pm2 startup
   ```

### Opción 2: Heroku

```bash
heroku create synergy-light-api
heroku addons:create mongolab:sandbox
git push heroku main
```

### Opción 3: Railway / Render

- Conectar repositorio de GitHub
- Configurar variables de entorno
- Deploy automático

## 🔧 Configuración HTTPS/SSL

Para producción con HTTPS:

1. Obtener certificado SSL (Let's Encrypt)
2. Configurar en `server.js`:
   ```javascript
   const https = require('https');
   const fs = require('fs');
   
   const sslOptions = {
     key: fs.readFileSync(process.env.SSL_KEY_PATH),
     cert: fs.readFileSync(process.env.SSL_CERT_PATH)
   };
   
   https.createServer(sslOptions, app).listen(PORT);
   ```

3. O usar Nginx como reverse proxy (recomendado)

## 📝 Migración de Datos desde Excel

1. Preparar archivo Excel con columnas:
   - clientId, name, address, phone, contractType, ssid, startDate, endDate, salesAgent, paymentMethod, deposit, status

2. Convertir a JSON o modificar `server/scripts/migrate.js`

3. Ejecutar migración:
   ```bash
   node server/scripts/migrate.js
   ```

## 🐛 Troubleshooting

### Error de conexión a MongoDB
- Verificar que MongoDB esté corriendo
- Verificar la URL de conexión en `.env`
- Si usas MongoDB Atlas, verifica que tu IP esté en la whitelist

### Error 401 en requests
- Verificar que el token JWT esté en el header: `Authorization: Bearer <token>`
- Verificar que el token no haya expirado (7 días por defecto)

### PDF no se genera
- Verificar que pdfkit esté instalado: `npm install pdfkit`
- Verificar permisos de escritura en el servidor

## 📞 Soporte

- Email: synergylightservices@gmail.com
- WhatsApp: +1 (409) 280-0661

## 📄 Licencia

© 2026 Synergy Light. Todos los derechos reservados.