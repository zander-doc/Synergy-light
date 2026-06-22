// ═══════════════════════════════════════════════════════
// GENERADOR DE SELLOS DIGITALES CON CANVAS
// ═══════════════════════════════════════════════════════

const StampGenerator = {
  // Generar sello REVISADO (Rojo)
  generateRevisado() {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 90;
    const ctx = canvas.getContext('2d');
    
    // Fondo transparente
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Borde rectangular rojo grueso
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 5;
    ctx.strokeRect(10, 10, 200, 70);
    
    // Borde interior
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.strokeRect(15, 15, 190, 60);
    
    // Texto REVISADO
    ctx.save();
    ctx.translate(110, 55);
    ctx.rotate(-0.1); // Ligera rotación para efecto realista
    ctx.fillStyle = '#ff0000';
    ctx.font = 'bold 38px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('REVISADO', 0, 0);
    ctx.restore();
    
    // Líneas decorativas
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 30);
    ctx.lineTo(50, 30);
    ctx.moveTo(170, 60);
    ctx.lineTo(200, 60);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
  },

  // Generar sello PAGADO (Verde)
  generatePagado() {
    const canvas = document.createElement('canvas');
    canvas.width = 220;
    canvas.height = 90;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Círculo verde
    ctx.strokeStyle = '#03bc89';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(110, 45, 40, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Círculo interior
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(110, 45, 35, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Texto PAGADO
    ctx.fillStyle = '#03bc89';
    ctx.font = 'bold 32px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAGADO', 110, 45);
    
    // Check mark
    ctx.strokeStyle = '#03bc89';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(70, 45);
    ctx.lineTo(95, 65);
    ctx.lineTo(150, 25);
    ctx.stroke();
    
    return canvas.toDataURL('image/png');
  },

  // Generar sello PAGO RECIBIDO (Azul con carrito)
  generatePagoRecibido() {
    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 110;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Rectángulo azul con bordes redondeados
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 230, 90);
    
    // Fondo semi-transparente
    ctx.fillStyle = 'rgba(0, 102, 204, 0.1)';
    ctx.fillRect(10, 10, 230, 90);
    
    // Icono de carrito simple
    ctx.strokeStyle = '#0066cc';
    ctx.lineWidth = 3;
    // Cesta del carrito
    ctx.beginPath();
    ctx.moveTo(40, 40);
    ctx.lineTo(60, 40);
    ctx.lineTo(55, 70);
    ctx.lineTo(35, 70);
    ctx.closePath();
    ctx.stroke();
    
    // Ruedas
    ctx.beginPath();
    ctx.arc(45, 75, 5, 0, 2 * Math.PI);
    ctx.arc(75, 75, 5, 0, 2 * Math.PI);
    ctx.stroke();
    
    // Texto PAGO RECIBIDO
    ctx.fillStyle = '#0066cc';
    ctx.font = 'bold 28px Arial, sans-serif';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText('PAGO', 90, 45);
    ctx.fillText('RECIBIDO', 90, 75);
    
    return canvas.toDataURL('image/png');
  },

  // Generar firma de Mick Edwards
  generateFirmaMickEdwards() {
    const canvas = document.createElement('canvas');
    canvas.width = 350;
    canvas.height = 120;
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Firma estilo manuscrito (simulado con curvas)
    ctx.strokeStyle = '#000080'; // Azul oscuro
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    
    // Dibujar "Mick"
    ctx.beginPath();
    ctx.moveTo(20, 80);
    ctx.bezierCurveTo(30, 60, 40, 60, 50, 80); // M
    ctx.lineTo(50, 40);
    ctx.lineTo(60, 80);
    ctx.lineTo(70, 40);
    ctx.stroke();
    
    // i
    ctx.beginPath();
    ctx.moveTo(80, 60);
    ctx.lineTo(80, 80);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(80, 50, 2, 0, 2 * Math.PI);
    ctx.fillStyle = '#000080';
    ctx.fill();
    
    // c
    ctx.beginPath();
    ctx.moveTo(95, 65);
    ctx.quadraticCurveTo(105, 55, 110, 65);
    ctx.stroke();
    
    // k
    ctx.beginPath();
    ctx.moveTo(120, 60);
    ctx.lineTo(120, 80);
    ctx.moveTo(120, 70);
    ctx.lineTo(130, 60);
    ctx.moveTo(120, 70);
    ctx.lineTo(135, 80);
    ctx.stroke();
    
    // Edwards
    ctx.beginPath();
    ctx.moveTo(150, 80); // E
    ctx.lineTo(150, 60);
    ctx.lineTo(165, 60);
    ctx.moveTo(150, 70);
    ctx.lineTo(163, 70);
    ctx.moveTo(150, 80);
    ctx.lineTo(165, 80);
    ctx.stroke();
    
    // Resto de la firma simplificada
    ctx.font = 'italic 24px "Brush Script MT", cursive';
    ctx.fillStyle = '#000080';
    ctx.fillText('Edwards', 170, 75);
    
    // Línea debajo
    ctx.strokeStyle = '#000080';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20, 95);
    ctx.lineTo(330, 95);
    ctx.stroke();
    
    // Texto debajo
    ctx.font = '14px Arial, sans-serif';
    ctx.fillStyle = '#000';
    ctx.textAlign = 'center';
    ctx.fillText('Mick Edwards', 175, 110);
    ctx.font = '12px Arial, sans-serif';
    ctx.fillText('Gerente - Synergy Light', 175, 125);
    
    return canvas.toDataURL('image/png');
  },

  // Generar todos los sellos
  generateAllStamps() {
    return {
      revisado: this.generateRevisado(),
      pagado: this.generatePagado(),
      pagoRecibido: this.generatePagoRecibido(),
      firmaMick: this.generateFirmaMickEdwards()
    };
  }
};