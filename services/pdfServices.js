const PDFDocument = require('pdfkit');
const fs = require('fs');

// Generate PDF report
exports.generatePDF = async (metrics, res) => {
  const doc = new PDFDocument();
  const filePath = 'reports/metrics_report.pdf';

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=metrics_report.pdf');

  doc.pipe(fs.createWriteStream(filePath));
  doc.pipe(res);

  doc.fontSize(20).text('Metrics Report', { align: 'center' });
  doc.moveDown();
  doc.fontSize(14).text(`Average Product Price: ${metrics.averageProductPrice}`);
  doc.fontSize(14).text(`Most Demanding Category: ${metrics.mostDemandingCategory.category} (${metrics.mostDemandingCategory.count} products)`);
  doc.moveDown();

  doc.fontSize(16).text('Top-Rated Products:');
  metrics.topRatedProducts.forEach(product => {
    doc.fontSize(12).text(`- ${product.title} (${product.rating.rate} stars)`);
  });

  doc.moveDown();
  doc.fontSize(16).text('Customer Location Breakdown:');
  for (const [city, count] of Object.entries(metrics.customerLocationBreakdown)) {
    doc.fontSize(12).text(`- ${city}: ${count} customers`);
  }

  doc.end();
};
