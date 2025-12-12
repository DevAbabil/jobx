#! /bin/bash

CONDITION=$1

case $CONDITION in
"build")
  tsc --build
  tsc-alias
  echo "application has been built"
  ;;
"dev")
  NODE_ENV=development tsx --watch --require tsconfig-paths/register ./src/index.ts
  ;;
"start")
  NODE_ENV=production node ./dist/index.js
  ;;
*)
  echo "The $CONDITION is unknown"
  ;;
esac
