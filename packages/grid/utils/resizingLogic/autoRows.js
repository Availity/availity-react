import isElement from 'lodash/isElement';

/* 
find the smallest item size, set that to 1 row, 
-> make all other available items a multiple of that (rounded up)
-> any pre-set rows are ignored, if not able to calculate height, TODO: figure out

NOTE: assume that every row has a card in it, so, factor in card padding for each rows actual height
*/

function rowHeight(rows, grid = {}) {
  const { gridGap, rowSize } = grid;
  if (rows < 1) {
    return 0;
  }
  return rows * rowSize + (rows - 1) * gridGap;
}

function rowsNeeded(height, grid = {}) {
  const minFinalHeight = height + grid.extraPadding;

  let rows = 0;
  while (rowHeight(rows, grid) < minFinalHeight) {
    rows += 1;
  }
  return rows;
}

function buildAutoRows(config) {
  const { grid, items } = config;

  const allItems = Object.keys(items);

  allItems.forEach(key => {
    const { rawHeight } = items[key];
    const rowSize = rawHeight && rawHeight + grid.extraPadding;
    if (rowSize && (!grid.rowSize || rowSize < grid.rowSize)) {
      grid.rowSize = rowSize;
    }
  });

  if (grid.rowSize) {
    const split = 3;
    grid.rowSize = (grid.rowSize - (split - 1) * grid.gridGap) / split;
  }

  allItems.forEach(key => {
    const item = items[key];
    item.height = rowsNeeded(item.rawHeight, grid);
    delete item.rawHeight;
  });
}

function getItemHeights(config) {
  const allItems = Object.keys(config.items);
  allItems.forEach(key => {
    const item = config.items[key];
    if (!item.rawHeight && item.ref) {
      const elm = isElement(item.ref) ? item.ref : item.ref.current;
      if (isElement(elm)) {
        const rect = elm.getBoundingClientRect();
        item.rawHeight = rect && rect.height;
      }
    }
  });
}

function autoRows(config) {
  getItemHeights(config);
  buildAutoRows(config);
}

export default autoRows;
