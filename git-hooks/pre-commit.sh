#!/usr/bin/env sh

set -e

changed=$(git diff --cached --name-only | grep angular-xml.js || :)

if [ $changed ]
then
  npm test
  npm run compile
  git add angular-xml.min.js
fi

