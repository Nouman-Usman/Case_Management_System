import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export const generatePDFFromMarkdown = async (markdownContent: string[], fileName: string = 'document'): Promise<void> => {
  try {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const timesRomanBoldFont = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
    
    // For each markdown page, create a PDF page
    for (const pageContent of markdownContent) {
      let page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points - using let instead of const
      const { width, height } = page.getSize();
      const margin = 50;
      
      const lines = pageContent.split('\n');
      let y = height - margin;
      let currentFont = timesRomanFont;
      let fontSize = 12;
      
      for (const line of lines) {
        // Check if it's a heading (starts with #)
        if (line.startsWith('# ')) {
          // Main heading
          currentFont = timesRomanBoldFont;
          fontSize = 18;
          y -= 10; // Extra space before heading
          page.drawText(line.substring(2), {
            x: margin,
            y,
            font: currentFont,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 10; // Extra space after heading
        } else if (line.startsWith('## ')) {
          // Subheading
          currentFont = timesRomanBoldFont;
          fontSize = 16;
          y -= 8;
          page.drawText(line.substring(3), {
            x: margin,
            y,
            font: currentFont,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 8;
        } else if (line.startsWith('### ')) {
          // Smaller subheading
          currentFont = timesRomanBoldFont;
          fontSize = 14;
          y -= 6;
          page.drawText(line.substring(4), {
            x: margin,
            y,
            font: currentFont,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 6;
        } else if (line.trim() === '') {
          // Empty line, just add some space
          y -= 12;
        } else {
          // Regular text
          currentFont = timesRomanFont;
          fontSize = 12;
          
          // Calculate if the line needs to be wrapped based on the page width
          const textWidth = currentFont.widthOfTextAtSize(line, fontSize);
          const availableWidth = width - 2 * margin;
          
          if (textWidth <= availableWidth) {
            // Line fits, draw as is
            page.drawText(line, {
              x: margin,
              y,
              font: currentFont,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
            y -= fontSize + 5;
          } else {
            // Line needs wrapping
            let words = line.split(' ');
            let currentLine = '';
            
            for (const word of words) {
              const testLine = currentLine ? `${currentLine} ${word}` : word;
              const testWidth = currentFont.widthOfTextAtSize(testLine, fontSize);
              
              if (testWidth <= availableWidth) {
                currentLine = testLine;
              } else {
                // Current line is full, draw it and start a new line
                page.drawText(currentLine, {
                  x: margin,
                  y,
                  font: currentFont,
                  size: fontSize,
                  color: rgb(0, 0, 0),
                });
                y -= fontSize + 5;
                currentLine = word;
                
                // Check if we need a new page
                if (y < margin) {
                  // Add a new page and reset y
                  page = pdfDoc.addPage([595.28, 841.89]);
                  y = height - margin;
                }
              }
            }
            
            // Draw the last line if there's anything left
            if (currentLine) {
              page.drawText(currentLine, {
                x: margin,
                y,
                font: currentFont,
                size: fontSize,
                color: rgb(0, 0, 0),
              });
              y -= fontSize + 5;
            }
          }
        }
        
        // Check if we need a new page
        if (y < margin) {
          // Add a new page and reset y
          page = pdfDoc.addPage([595.28, 841.89]);
          y = height - margin;
        }
      }
    }
    
    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
    
    return Promise.resolve();
  } catch (error) {
    console.error('Error generating PDF:', error);
    return Promise.reject(error);
  }
};

/**
 * Process template with provided data
 */
export const processTemplate = (template: string, data: Record<string, any>): string => {
  let processedTemplate = template;
  
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedTemplate = processedTemplate.replace(regex, value.toString());
    }
  }
  
  // Remove any remaining placeholders
  processedTemplate = processedTemplate.replace(/{{[^{}]+}}/g, '');
  
  return processedTemplate;
};

/**
 * Generate a PDF document from a html template and data
 * 
 * @param template HTML template with placeholders
 */

export const generatePDFFromHTML = async (template: string, data: Record<string, any>, fileName: string = 'document'): Promise<void> => {
  try {
    const processedTemplate = processTemplate(template, data);
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    
    const page = pdfDoc.addPage([595.28, 841.89]);
    const { width, height } = page.getSize();
    const margin = 50;
    
    const lines = processedTemplate.split('\n');
    let y = height - margin;
    let fontSize = 12;
    
    for (const line of lines) {
      const textWidth = timesRomanFont.widthOfTextAtSize(line, fontSize);
      const availableWidth = width - 2 * margin;
      
      if (textWidth <= availableWidth) {
        page.drawText(line, {
          x: margin,
          y,
          font: timesRomanFont,
          size: fontSize,
          color: rgb(0, 0, 0),
        });
        y -= fontSize + 5;
      } else {
        let words = line.split(' ');
        let currentLine = '';
        
        for (const word of words) {
          const testLine = currentLine ? `${currentLine} ${word}` : word;
          const testWidth = timesRomanFont.widthOfTextAtSize(testLine, fontSize);
          
          if (testWidth <= availableWidth) {
            currentLine = testLine;
          } else {
            page.drawText(currentLine, {
              x: margin,
              y,
              font: timesRomanFont,
              size: fontSize,
              color: rgb(0, 0, 0),
            });
            y -= fontSize + 5;
            currentLine = word;
          }
        }
        
        if (currentLine) {
          page.drawText(currentLine, {
            x: margin,
            y,
            font: timesRomanFont,
            size: fontSize,
            color: rgb(0, 0, 0),
          });
          y -= fontSize + 5;
        }
      }
    }
    
    // Save and download the PDF
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    link.click();
    URL.revokeObjectURL(url);
}