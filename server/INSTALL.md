# 🚀 Instalación Rápida - Synergy Light

## Instalación en 5 pasos

### 1. Instalar MongoDB
**Windows:**
```bash
# Descargar desde: https://www.mongodb.com/try/download/community
# O instalar con Chocolatey:
choco install mongodb
```

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**Linux:**
```bash
sudo apt-get install mongodb
```

### 2. Iniciar MongoDB
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongodb
```

### 3. Instalar dependencias
```bash
cd server
npm install
```

### 4. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
copy .env.example .env

# Editar .env con tus configuraciones (opcional, usar defaults por ahora)
```

### 5. Iniciar el servidor
```bash
# Modo desarrollo (con auto-reload)
npm run dev

# O modo producción
npm start
```

## ✅ Verificar instalación

1. Abrir navegador: `http://localhost:5000`
   - Deberías ver: `{"message":"Synergy Light API - Sistema de Facturación"}`

2. Acceder al panel admin: `http://localhost:5000/admin`
   - Email: `admin@synergylight.com`
   - Password: `SynergyLight2026!Admin`

3. Migrar datos de prueba (opcional):
```bash
npm run migrate
```

## 🎯 Acceso Rápido

- **API**: http://localhost:5000
- **Panel Admin**: http://localhost:5000/admin
- **Credenciales**: 
  - Email: admin@synergylight.com
  - Password: SynergyLight2026!Admin

## 📋 Siguientes Pasos

1. Migrar datos desde Excel usando `server/scripts/migrate.js`
2. Personalizar variables en `.env`
3. Cambiar contraseña del admin
4. Configurar email para notificaciones
5. Configurar WhatsApp API (opcional)

## 🆘 Problemas Comunes

### MongoDB no inicia
```bash
# Verificar estado
sudo systemctl status mongodb

# Reiniciar
sudo systemctl restart mongodb
```

### Puerto 5000 ocupado
```bash
# Cambiar puerto en .env
PORT=5001
```

### Error de permisos
```bash
# Linux/Mac
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

## 📞 Soporte

- Email: synergylightservices@gmail.com
- WhatsApp: +1 (409) 280-0661