#!/usr/bin/env sh

command()
{
  $@
  code=$?
  if [ $code -gt 0 ]
  then
    exit $code
  fi
}

changed=`git diff --cached --name-only | grep angular-xml.js`

if [ $changed ]
then
  command npm test
  command npm run compile
  git add angular-xml.min.js
fi

