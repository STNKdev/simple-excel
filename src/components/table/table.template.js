const CODES = {
  A: 65,
  Z: 90
};

// function toCell(row, column) {
//   return `
//     <div
//     class="cell"
//     contenteditable
//     data-column="${column}"
//     data-row="${row}"></div>
//   `;
// }

function toCell(row) {
  return function(_, column) {
    return `
      <div
        class="cell"
        contenteditable
        data-type="cell"
        data-column="${column}"
        data-id="${row}:${column}"
       ></div>`;
  };
}

function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-column="${index}">
      ${col}
      <div class="column-resize" data-resize="column"></div>
    </div>
  `;
}

function createRow(index, content) {
  const resize = index ?
      `<div class="row-resize" data-resize="row"></div>` :
      '';
  return `
    <div class="row" data-type="resizable">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${content}</div>
    </div>
  `.trim();
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 100) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('');

  // Шапка
  rows.push(createRow(null, cols));

  // Основные ячейки
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        // .map((_, column) => toCell(row, column))
        .map(toCell(row))
        .join('');
    rows.push(createRow(row + 1, cells));
  }

  return rows.join('');
}
