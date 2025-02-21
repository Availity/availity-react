/* eslint-disable unicorn/prefer-ternary */
// credit: https://yonatankra.com/how-to-create-a-workspace-coverage-report-in-nrwl-nx-monorepo/
const glob = require('glob');
const fs = require('fs');
const path = require('path');

function getReport() {
  return new Promise((resolve, reject) => {
    glob('coverage/**/coverage-summary.json', (error, result) => {
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

    Object.keys(file).forEach((key) => {
      if (key === 'total') {
        const curr = file[key];
        const merged = mergedReport[key];

        if (merged) {
          mergedReport[key] = {
            statements: {
              total: merged.statements.total + curr.statements.total,
              covered: merged.statements.covered + curr.statements.covered,
              skipped: merged.statements.skipped + curr.statements.skipped,
              pct:
                ((merged.statements.covered + curr.statements.covered) /
                  (merged.statements.total + curr.statements.total)) *
                100,
            },
            branches: {
              total: merged.branches.total + curr.branches.total,
              covered: merged.branches.covered + curr.branches.covered,
              skipped: merged.branches.skipped + curr.branches.skipped,
              pct:
                ((merged.branches.covered + curr.branches.covered) / (merged.branches.total + curr.branches.total)) *
                100,
            },
            functions: {
              total: merged.functions.total + curr.functions.total,
              covered: merged.functions.covered + curr.functions.covered,
              skipped: merged.functions.skipped + curr.functions.skipped,
              pct:
                ((merged.functions.covered + curr.functions.covered) /
                  (merged.functions.total + curr.functions.total)) *
                100,
            },
            lines: {
              total: merged.lines.total + curr.lines.total,
              covered: merged.lines.covered + curr.lines.covered,
              skipped: merged.lines.skipped + curr.lines.skipped,
              pct: ((merged.lines.covered + curr.lines.covered) / (merged.lines.total + curr.lines.total)) * 100,
            },
          };
        } else {
          mergedReport[key] = file[key];
        }
      }
    });
    return mergedReport;
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
