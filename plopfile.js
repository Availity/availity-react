const { execSync } = require('child_process');

module.exports = plop => {
  plop.setHelper('userFullName', () => {
    const name = execSync(
      'git config --global --includes user.name'
    ).toString();
    return name.replace(/\n$/, '').trim();
  });

  plop.setHelper('userEmail', () => {
    const email = execSync(
      'git config --global --includes user.email'
    ).toString();
    return email.replace(/\n$/, '').trim();
  });

  plop.setGenerator('package', {
    description: 'Create new package in monorepo',
    prompts: [
      {
        type: 'input',
        name: 'packageName',
        message: 'package name',
      },
      {
        type: 'input',
        name: 'packageDescription',
        message: 'package description',
      },
    ],
    actions: [
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/CHANGELOG.md',
        templateFile: 'plop-templates/package/CHANGELOG.md.hbs',
      },
      {
        type: 'add',
        path:
          'packages/{{kebabCase packageName}}/types/{{pascalCase packageName}}.d.ts',
        templateFile: 'plop-templates/package/Package.d.ts.hbs',
      },
      {
        type: 'add',
        path:
          'packages/{{kebabCase packageName}}/src/{{pascalCase packageName}}.js',
        templateFile: 'plop-templates/package/Package.js.hbs',
      },
      {
        type: 'add',
        path:
          'packages/{{kebabCase packageName}}/tests/{{pascalCase packageName}}.test.js',
        templateFile: 'plop-templates/package/Package.test.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/README.md',
        templateFile: 'plop-templates/package/README.md.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/index.d.ts',
        templateFile: 'plop-templates/package/index.d.ts.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/index.js',
        templateFile: 'plop-templates/package/index.js.hbs',
      },
      {
        type: 'add',
        path: 'packages/{{kebabCase packageName}}/package.json',
        templateFile: 'plop-templates/package/package.json.hbs',
      },
    ],
  });
};
