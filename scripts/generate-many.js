import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

async function generateMany() {
  const projects = readdirSync('./packages').filter((dir) => dir !== 'mock');
  console.log('projects:', projects);

  for (const project of projects) {
    try {
      const proj = JSON.parse(readFileSync(resolve(process.cwd(), `packages/${project}/project.json`), 'utf8'));

      proj.targets.lint = {
        executor: '@nx/eslint:lint',
        options: {
          eslintConfig: '.eslintrc.yaml',
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

      writeFileSync(`packages/${project}/project.json`, JSON.stringify(proj, null, 2) + '\n');
      console.log('file saved:', project);
    } catch (error) {
      console.error(error);
    }
  }
}

generateMany();
