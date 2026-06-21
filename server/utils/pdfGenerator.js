const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoicePDF = (invoice) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    const logoPath = path.join(__dirname, '../assets/images/logo/synergy-light.webp');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 150 });
    }

    doc.fontSize(24).text('SYNERGY LIGHT', 220, 50, { align: 'center' });
    doc.fontSize(12).text('ILUMINA TU VIDA', 220, 75, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(20).text('FACTURA / INVOICE', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12);
    doc.text(`Nro. Factura: ${invoice.invoiceNumber}`, { align: 'right' });
    doc.text(`Fecha de Emisión: ${new Date(invoice.issueDate).toLocaleDateString('es-ES')}`, { align: 'right' });
    doc.text(`Fecha de Vencimiento: ${new Date(invoice.dueDate).toLocaleDateString('es-ES')}`, { align: 'right' });
    doc.moveDown(2);

    doc.fontSize(14).text('Información del Cliente:', { underline: true });
    doc.fontSize(12);
    doc.text(`Cliente: ${invoice.clientName}`);
    doc.text(`ID Cliente: ${invoice.clientId}`);
    doc.moveDown(2);

    doc.fontSize(14).text('Detalle:', { underline: true });
    doc.moveDown(1);

    invoice.items.forEach((item, index) => {
      doc.fontSize(12);
      doc.text(`${index + 1}. ${item.description}`);
      doc.text(`   Cantidad: ${item.quantity} - P. Unit: $${item.unitPrice.toFixed(2)} - Total: $${item.total.toFixed(2)}`);
      doc.moveDown(0.5);
    });

    doc.moveDown(1);

    doc.fontSize(14);
    doc.text(`Subtotal: $${invoice.subtotal.toFixed(2)}`, { align: 'right' });

    if (invoice.discount > 0) {
      doc.text(`Descuento: -$${invoice.discount.toFixed(2)}`, { align: 'right' });
    }

    if (invoice.deposit > 0) {
      doc.text(`Depósito: $${invoice.deposit.toFixed(2)}`, { align: 'right' });
    }

    doc.fontSize(16).text(`Total: $${invoice.total.toFixed(2)}`, { align: 'right' });
    doc.moveDown(2);

    doc.fontSize(10);
    doc.text('Nota: Participa de nuestro sistema de Referidos y disfrutaras de tu renovación con el 100% de descuento.', { align: 'center' });
    doc.text('*ciertas condiciones aplica*', { align: 'center' });
    doc.moveDown(1);
    doc.text('SE ENVIARÁ NOTIFICACIONES A LOS 3 DÍAS PARA VENCERSE LA CONEXIÓN', { align: 'center' });

    doc.end();
  });
};

const generateContractPDF = (contract, client) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });

    const logoPath = path.join(__dirname, '../assets/images/logo/synergy-light.webp');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 45, { width: 150 });
    }

    doc.fontSize(24).text('SYNERGY LIGHT', 220, 50, { align: 'center' });
    doc.fontSize(12).text('ILUMINA TU VIDA', 220, 75, { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(20).text('CONTRATO DE SERVICIO ELÉCTRICO', { align: 'center' });
    doc.moveDown(2);

    doc.fontSize(12);
    doc.text(`Nro. Contrato: ${contract.contractNumber}`);
    doc.text(`Cliente: ${client.name}`);
    doc.text(`ID Cliente: ${client.clientId}`);
    doc.text(`Dirección: ${client.address}`);
    doc.text(`Teléfono: ${client.phone}`);
    doc.text(`Tipo de Contrato: ${client.contractType}`);
    doc.text(`Fecha de Inicio: ${new Date(contract.startDate).toLocaleDateString('es-ES')}`);
    doc.text(`Fecha de Fin: ${new Date(contract.endDate).toLocaleDateString('es-ES')}`);
    doc.moveDown(2);

    doc.fontSize(14).text('TÉRMINOS Y CONDICIONES:', { underline: true });
    doc.moveDown(1);
    doc.fontSize(10);
    doc.text('Texas Business and Commerce Code');
    doc.moveDown(1);
    doc.text('Important Note: Prepaid monthly electric service means you purchase electricity before it is used. You will not receive a regular, monthly bill for exact kWh usage. Continued electric service depends on you prepaying for service in a timely manner, and if your current balance falls below the disconnection balance, your service may be disconnected with little notice.');
    doc.moveDown(1);
    doc.text('Refund Policy: https://synergylinght.com/refund-policy');

    doc.end();
  });
};

module.exports = { generateInvoicePDF, generateContractPDF };