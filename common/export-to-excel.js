const xl = require('excel4node');

module.exports = {
  getExcelFile: ({
    expressRes,
    data,
    sheetName,
    columns,
    fileName
  }) => {
    const workBook = new xl.Workbook();
    const workSheet = workBook.addWorksheet(sheetName);

    // Create a reusable style
    const headerStyle = workBook.createStyle({
      font: {
        bold: true
      }
    });


    // Write the headers of the workSheet
    columns.forEach((column, columnIndex) => {
      workSheet.cell(1, (columnIndex + 1)).string(column.label).style(headerStyle);
    });

    data.forEach((obj, objIndex) => {
      columns.forEach((column, columnIndex) => {
        workSheet.cell((objIndex + 2), (columnIndex + 1)).string(`${obj[column.name]}`);
      });
    });

    return workBook.write(`${fileName}.xlsx`, expressRes);
  }
};
