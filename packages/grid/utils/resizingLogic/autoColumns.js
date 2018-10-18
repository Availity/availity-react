import isElement from 'lodash/isElement';
import isFunction from 'lodash/isFunction';

function shrinkColumnsAsAllowed(grid = {}) {
  const { minColumns = 1, columnsAllowed } = grid;
  if (!columnsAllowed) {
    return;
  }

  const checkColumns = isFunction(columnsAllowed)
    ? columnsAllowed
    : columnCount => {
        const value = columnsAllowed[columnCount];
        return typeof value === 'undefined' || value;
      };

  while (!checkColumns(grid.columns) && grid.columns > minColumns) {
    grid.columns -= 1;
  }
}
// NOTE: possibly find ways to configure columns other than columnWidth
function autoColumns({ grid = {} } = {}) {
  const { width, ref, minColumns = 1, maxColumns, columnWidth } = grid;
  let useWidth = width;
  if (!useWidth && ref) {
    const elm = isElement(ref) ? ref : ref.current;
    if (isElement(elm)) {
      const rect = elm.getBoundingClientRect();
      useWidth = rect && rect.width;
    }
  }
  if (useWidth && columnWidth) {
    let columns = Math.floor(useWidth / columnWidth);
    if (minColumns > columns) {
      columns = minColumns;
    }
    if (maxColumns && maxColumns < columns) {
      columns = maxColumns;
    }

    grid.columns = columns;
  }

  shrinkColumnsAsAllowed(grid);

  if (useWidth) {
    let columnSize = useWidth;
    if (grid.gridGap) {
      columnSize -= (grid.columns - 1) * grid.gridGap;
    }
    columnSize /= grid.columns;
    grid.columnSize = `${columnSize}px`;
  }
}

export default autoColumns;
