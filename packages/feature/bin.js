#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

let configFile = process.argv[2] || path.join('project', 'config');
const buildPath = process.argv[3] || path.join(process.env.NODE_ENV === 'production' ? 'dist' : 'build', 'features');

if (path.extname(configFile) !== '.json') {
  configFile = path.join(configFile, 'features.json');
}

if (!fs.existsSync(configFile)) {
  console.log(`No features.json found at ${configFile}`);
  process.exit(0);
}

const features = JSON.parse(fs.readFileSync(configFile, 'utf8'));

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

  Object.keys(envs).forEach((env) => {
    const filePath = path.join(buildPath, `${env}.json`);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, JSON.stringify(envs[env]));
  });
}
