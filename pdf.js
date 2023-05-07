var pdf = require('pdfkit');
var fs = require('fs');

var myDoc = new pdf;
myDoc.pipe(fs.createWriteStream('node.pdf'));

// myDoc.font('Times-Roman').fontSize(15).text('NodeJS PDF Document',100,100);
// myDoc.moveDown();
// myDoc.font('Times-Roman').fontSize(15).text('55555555',115,1115);

myDoc.font('Times-Roman').fontSize(15).text('NodeJS PDF Document');
myDoc.moveDown();
myDoc.font('Times-Roman').fontSize(15).text('55555555');

myDoc.end();

