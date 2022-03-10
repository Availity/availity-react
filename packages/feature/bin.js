#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');

let configFile = process.argv[2] || path.join('project', 'config');
const buildPath = process.argv[3] || path.join(process.NODE_ENV === 'production' ? 'dist' : 'build', 'features');

if (path.extname(configFile) !== '.json') {
  configFile = path.join(configFile, 'features.json');
}

if (!fs.existsSync(configFile)) {
  // eslint-disable-next-line no-console
  console.log(`No features.json found at ${configFile}`);
  return;
}

const features = fs.readJsonSync(configFile);

if (features && Array.isArray(features)) {
  const envs = {};
  for (const value of features) {
    const disabledIn = Array.isArray(value.disabledEnvironments)
      ? value.disabledEnvironments
      : [value.disabledEnvironments];

    for (const env of disabledIn) {
      envs[env] = envs[env] || [];
      envs[env].push(value.name);
    }
  }

  Object.keys(envs).map((env) => fs.outputJsonSync(path.join(buildPath, `${env}.json`), envs[env]));
}
