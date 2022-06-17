// credit: https://yonatankra.com/how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo/
const glob = require('glob');
const fs = require('fs');
const path = require('path');

function getReport() {
  return new Promise((resolve, reject) => {
    glob('coverage/**/coverage-final.json', (error, result) => {
      if (error) return reject(error);
      return resolve(result);
    });
  });
}

(async function compileReports() {
  // Get the list of reports
  const files = await getReport();

  // Read the files and merge into one
  const mergedReport = files.reduce((mergedReport, currFile) => {
    const file = JSON.parse(fs.readFileSync(currFile));

    return { ...mergedReport, ...file };
  }, {});

  // Write the merged report to file
  fs.writeFile(path.resolve('./coverage/coverage-final.json'), JSON.stringify(mergedReport), (err) => {
    if (err) {
      // If we can't find the file, assume no tests ran
      if (err.code === 'ENOENT') return;
      throw err;
    }
  });
})();
