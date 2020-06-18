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

if grep -R --exclude='*.sh' --exclude-dir='node_modules'  --include='yarn.lock' 'artifactory.availity' ./
then
  printf "\n"
  printf "   (c).-.(c)    (c).-.(c)    (c).-.(c)    (c).-.(c)    (c).-.(c) \n"
  printf "    / ._. \      / ._. \      / ._. \      / ._. \      / ._. \ \n"
  printf "  __\( Y )/__  __\( Y )/__  __\( Y )/__  __\( Y )/__  __\( Y )/__\n"
  printf " (_.-/'-'\-._)(_.-/'-'\-._)(_.-/'-'\-._)(_.-/'-'\-._)(_.-/'-'\-._)\n"
  printf "    || E ||      || R ||      || R ||      || O ||      || R ||\n"
  printf "  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._  _.' \`-' '._\n"
  printf " (.-./\`-'\.-.)(.-./\`-\`\.-.)(.-./\`-\`\.-.)(.-./\`-'\.-.)(.-./\`-\`\.-.)\n"
  printf "  \`-'     \`-'  \`-'     \`-'  \`-'     \`-'  \`-'     \`-'  \`-'     \`-' \n"
  printf "\n\n"
  printf "\nOne of your packages contains a dependency from registry: artifactory.availity.com.\n"
  printf "Please correct this by running 'yarn nuke' and then 'yarn'.\n\n"
  exit 1
else
  echo "Artifactory Check Passed"
fi
