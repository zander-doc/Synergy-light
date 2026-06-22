async function generateInvoicePDF(invoiceData, sendToWhatsApp = false) {
  const templateHTML = await fetch("../components/pdf/invoice-template.html").then(r => r.text());

  let html = templateHTML
    .replace("{{clientName}}", invoiceData.clientName)
    .replace("{{clientId}}", invoiceData.clientId)
    .replace("{{invoiceNumber}}", invoiceData.invoiceNumber)
    .replace("{{issueDate}}", new Date(invoiceData.issueDate).toLocaleDateString())
    .replace("{{total}}", invoiceData.total.toFixed(2));

  const container = document.createElement("div");
  container.innerHTML = html;
  container.style.position = "absolute";
  container.style.top = "-9999px";
  document.body.appendChild(container);

  const canvas = await html2canvas(container);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF("p", "mm", "a4");
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, width, height);

  const pdfBlob = pdf.output("blob");
  const pdfURL = URL.createObjectURL(pdfBlob);

  if (sendToWhatsApp) {
    const msg = `Hola ${invoiceData.clientName}, aquí tiene su factura:\n${pdfURL}`;
    openWA(invoiceData.phone, msg);
  }

  pdf.save(`Factura_${invoiceData.invoiceNumber}.pdf`);
  document.body.removeChild(container);
}
