const PDFDocument = require('pdfkit');
const fs = require('fs');

const createPDF = (data, path) => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream(path));

  doc.fontSize(25).text('Sales Order', 100, 80);
  // Add more content based on the data provided

  doc.end();
};

module.exports = { createPDF };
