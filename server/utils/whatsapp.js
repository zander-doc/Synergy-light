const generateWhatsAppLink = (phone, message) => {
  const cleanPhone = phone.replace(/\D/g, '');
  let fullPhone = cleanPhone;
  if (cleanPhone.length === 10) {
    fullPhone = '1' + cleanPhone;
  }
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${fullPhone}?text=${encodedMessage}`;
};

const generateRenewalMessage = (clientName, dueDate, contractType) => {
  return `Hola ${clientName}, recuerda renovar tu contrato de 30 días de conexión de luz eléctrica con Synergy Light. Tu fecha de corte es el día: ${dueDate}`;
};

const generateWelcomeMessage = (clientName, contractType) => {
  return `¡Bienvenido ${clientName}! Gracias por elegir Synergy Light. Tu contrato de ${contractType} ha sido activado exitosamente.`;
};

module.exports = { 
  generateWhatsAppLink, 
  generateRenewalMessage,
  generateWelcomeMessage 
};