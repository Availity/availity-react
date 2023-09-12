const path = require('path');
const fs = require('fs');

async function generateMany() {
  const projects = fs.readdirSync('./packages').filter((dir) => dir !== 'mock');
  console.log('projects:', projects);

  for (const project of projects) {
    // run nx generator command
    try {
      // eslint-disable-next-line import/no-dynamic-require
      const proj = require(path.resolve(process.cwd(), `packages/${project}/project.json`));

      proj.targets.lint = {
        executor: '@nx/linter:eslint',
        options: {
          eslintConfig: '.eslintrc.yaml',
          lintFilePatterns: [`packages/${project}/**/*.{js,ts}`],
          silent: false,
          fix: false,
          cache: true,
          cacheLocation: `./node_modules/.cache/${project}/.eslintcache`,
          maxWarnings: -1,
          quiet: false,
          noEslintrc: false,
          hasTypeAwareRules: true,
          cacheStrategy: 'metadata',
        },
      };

      fs.writeFile(`packages/${project}/project.json`, JSON.stringify(proj), (err) => {
        if (err) throw err;
        console.log('file saved');
      });

      // if (stdout) console.log('stdout:\n', stdout);
      // if (stderr) console.error('stderr:\n', stderr);
    } catch (error) {
      console.error(error);
    }
  }
}

generateMany();
