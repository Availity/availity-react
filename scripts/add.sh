#!/usr/bin/env bash

# Instructions:
#
#   - In package.json add:
#       "scripts": { "add": "sh ./scripts/add.sh" }
#
#   - Run:
#       npm run add vision inert nano-swagger
#

# error out if something fails
set -e

ARGS=( $@ ) # all the args
LEN=${#ARGS[@]} # lenght of args using #
SCOPE=${ARGS[$LEN-1]} # extract last arg
PACKAGES=(${ARGS[@]:0:$LEN-1}) # splice and convert to array. surrounding parens converts back to array
IS_DEV=false

if [ "$SCOPE" == "--dev" ]; then
  PACKAGES=(${ARGS[@]:0:$LEN-2})
  SCOPE=${ARGS[$LEN-2]}
  IS_DEV=true
fi

if [ -z "$PACKAGES" ]; then
  echo ""
  echo "Missing npm package(s) argument"
  echo ""
  exit 1
fi

if [ -z "$SCOPE" ]; then
  echo ""
  echo "Missing scope arguement"
  echo ""
  exit 1
fi

# echo "==> Adding NPM packages [ $PACKAGES ] to @availity/$SCOPE"

for i in "${PACKAGES[@]}"
do
  echo "==> Adding NPM package $i to @availity/$SCOPE"
  if [ "$IS_DEV" = true ] ; then
    ./node_modules/.bin/lerna add $i --scope=@availity/$SCOPE --dev
  else
    ./node_modules/.bin/lerna add $i --scope=@availity/$SCOPE
  fi

done

