// https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/config/jest/fileTransform.js

const path = require('path');

module.exports = {
  process(src, filename) {
    return `module.exports = ${JSON.stringify(path.basename(filename))};`;
  },
};
