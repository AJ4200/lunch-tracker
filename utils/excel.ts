import * as XLSX from "xlsx";

interface HeaderRow {
  c: number;
  r: number;
}

export function exportToExcel(data: any[], fileName: string) {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
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
    const cell = worksheet[XLSX.utils.encode_cell({ c: index, r: 0 })];
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
    `A1:${String.fromCharCode(64 + columnWidths.length)}1`
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
        worksheet[XLSX.utils.encode_cell({ c: columnIndex, r: rowIndex + 1 })];
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
