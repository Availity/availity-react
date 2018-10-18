// import finalBuild from './buildGrid/build'; // logic for auto placements, although css grids auto seems to work just as good so leaving out

import validate from './validate';
import checkItemColumns from './checkItemColumns';

function fullBuildGrid(inputConfig = {}, prepSteps) {
  let config = validate(inputConfig);
  prepSteps.forEach(step => {
    const newconfig = step(config);
    // step can modify config instead of returning new, so only replace config with new value if actually returned
    if (newconfig) {
      config = newconfig;
    }
  });
  return config;
}

/*
inputConfig: standard config object
preColumnCheck: array of steps to run
postColumnCheck: if array, run preCheck -> checkItemColumns -> postCheck
if true, means preColumnCheck does definitions check and skip that
if falsey: add checkItemColumns before preCheck if its not already in that array
*/
function buildGrid(inputConfig, preColumnCheck = [], postColumnCheck) {
  let prepSteps = [];
  if (Array.isArray(postColumnCheck)) {
    prepSteps = [...preColumnCheck, checkItemColumns, ...postColumnCheck];
  } else if (postColumnCheck) {
    prepSteps = preColumnCheck;
  } else if (preColumnCheck.indexOf(checkItemColumns) < 0) {
    prepSteps = [checkItemColumns, ...preColumnCheck];
  } else {
    prepSteps = preColumnCheck;
  }
  return fullBuildGrid(inputConfig, prepSteps.filter(val => !!val));
}

export default buildGrid;
