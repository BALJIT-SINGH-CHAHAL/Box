const fs = require('fs');
const PDFDocument = require('pdfkit');

const doc = new PDFDocument({
    size: 'A4',
    margin: 0
});
const stream = doc.pipe(fs.createWriteStream('./test.pdf'));
stream.on('finish', function() {
    process.exit();
});

doc.fontSize(12);
for (let y = 0; y < 1000; y++) {
    doc.text(`Line=${y}: doc_pos=(${doc.x}, ${doc.y});specified_pos=(10, ${y*12})`, 10, y * 12);
}
doc.end();



