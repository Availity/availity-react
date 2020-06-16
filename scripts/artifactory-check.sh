#!/usr/bin/env bash

# Instructions:
#
#   - In package.json add:
#       "scripts": { "check:packages": "sh ./scripts/artifactory-check.sh" }
#
#   - Run:
#       npm run check:packages
#

# error out if something fails
set -e

if grep -R --exclude='*.sh' 'artifactory.availity' --include='yarn.lock' ./
then
  printf "\nOne of your packages contains a dependency from registry: artifactory.availity.com.\n"
  printf "Please correct this by running 'yarn nuke' and then 'yarn'.\n\n"
  exit 1
else
  echo "Artifactory Check Passed"
fi
