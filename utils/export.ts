import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Extend jsPDF with autoTable
(jsPDF as any).autoTable = autoTable;

interface HeaderRow {
  c: number;
  r: number;
}

export function exportToExcel(
  data: any[],
  fileName: string,
  dateRange: string
) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  // Add date range to the top of the sheet
  XLSX.utils.sheet_add_aoa(worksheet, [[`Date Range: ${dateRange}`]], {
    origin: "A1",
  });
  XLSX.utils.sheet_add_json(worksheet, data, {
    origin: "A2",
    skipHeader: false,
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  // Set the column widths based on the data
  const columnWidths = data.reduce((widths, row) => {
    Object.keys(row).forEach((key, index) => {
      if (!widths[index]) {
        widths[index] = 0;
      }
      widths[index] = Math.max(widths[index], key.length);
    });
    return widths;
  }, []);

  columnWidths.forEach((width: number, index: any) => {
    const cell = worksheet[XLSX.utils.encode_cell({ c: index, r: 1 })];
    if (cell) {
      cell.s = {
        font: {
          bold: true,
        },
        alignment: {
          horizontal: "center",
        },
      };
      cell.w = width + 2;
    }
  });

  // Set the header row style
  const headerRange = XLSX.utils.decode_range(
    `A2:${String.fromCharCode(64 + columnWidths.length)}2`
  );
  const headerRow = XLSX.utils.sheet_to_json(worksheet, {
    header: 1,
    range: headerRange,
  })[0] as HeaderRow[];
  for (let { c, r } of headerRow) {
    const cell = worksheet[XLSX.utils.encode_cell({ c, r })];
    if (cell) {
      cell.s = {
        font: {
          bold: true,
        },
        alignment: {
          horizontal: "center",
        },
      };
    }
  }

  // Set the date format for date columns
  data.forEach((row, rowIndex) => {
    Object.keys(row).forEach((key, columnIndex) => {
      const cell =
        worksheet[XLSX.utils.encode_cell({ c: columnIndex, r: rowIndex + 2 })];
      if (cell) {
        if (row[key] instanceof Date) {
          cell.t = "d";
          cell.z = "yyyy-mm-dd";
        }
      }
    });
  });

  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

export function exportToPDF(data: any[], fileName: string, dateRange: string) {
  const doc = new jsPDF();

  // Add date range to the top of the PDF
  doc.text("TM Lunch Tracker", 14, 10);
  doc.text(`Date Range: ${dateRange}`, 14, 16);

  // Add the table to the PDF
  (doc as any).autoTable({
    head: [Object.keys(data[0])],
    body: data.map((row) => Object.values(row)),
    styles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: [220, 220, 220],
      textColor: [0, 0, 0],
      lineWidth: 0.5,
      lineColor: [0, 0, 0],
      fontStyle: "bold",
    },
    startY: 22, // Move table below the date range text
    columnStyles: {
      0: { cellWidth: "auto" },
      1: { cellWidth: "auto" },
      2: { cellWidth: "auto" },
      // Add more column styles as needed
    },
  });

  // Save the PDF
  doc.save(`${fileName}.pdf`);
}
