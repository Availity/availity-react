import merge from 'merge-options-es5';

import isFunction from 'lodash/isFunction';

// how to configure by column
/*
value of each is object to merge in
array: index is column count
object: ?
function(columns) => value
other? 
*/

function checkItemColumns({ grid = {}, items = {} } = {}) {
  const output = {
    grid,
    items: {},
  };
  const { columns } = output.grid;

  Object.keys(items).forEach(key => {
    const item = items[key];
    let newItem = false;
    if (item.byColumn) {
      if (isFunction(item.byColumn)) {
        newItem = item.byColumn(columns);
      } else {
        newItem = item.byColumn[columns];
      }
    }

    if (newItem) {
      newItem = merge(item, newItem);
    } else {
      newItem = { ...item };
    }
    delete newItem.byColumn;
    output.items[key] = newItem;
  });

  return output;
}

export default checkItemColumns;
