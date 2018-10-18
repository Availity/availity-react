import merge from 'merge-options-es5';

import constants from './constants';

function validateConfig({ grid = {}, items = {} } = {}) {
  const output = {
    grid: merge(constants.defaultGrid, grid),
    items: {},
  };

  Object.keys(items).forEach(key => {
    const item = items[key];
    output.items[key] = merge({}, constants.defaultItem, item);
  });

  return output;
}

export default validateConfig;
