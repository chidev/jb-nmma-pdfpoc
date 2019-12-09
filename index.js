import './style.css';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

const pdfUrl = 'https://pdf-lib.js.org/assets/with_update_sections.pdf';
fetch(pdfUrl).then(res => {
  res.arrayBuffer().then(existingPdfBytes => {
    PDFDocument.load(existingPdfBytes).then(pdfDoc => {
      pdfDoc.embedFont(StandardFonts.HelveticaBold).then(font => {
        const text = `Copyright 2019 NMMA - 12/12/2019 00:12:00 CST`;
        const textSize = 11;
        const textWidth = font.widthOfTextAtSize(text, textSize);
        const textHeight = font.heightAtSize(textSize);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        const { width, height } = firstPage.getSize();

        firstPage.drawText(text, {
          x: Math.round( (width - textWidth) / 2 ),
          y: 10,
          size: textSize,
          font: font,
          color: rgb(0.5, 0.1, 0.1),
        });

        pdfDoc.saveAsBase64({ dataUri: true }).then(pdfDataUri => {
          document.getElementById('pdf').src = pdfDataUri;
        });
      });
    });
  });
});