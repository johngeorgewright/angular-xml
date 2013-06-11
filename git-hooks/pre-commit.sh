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

changed=`git diff --name-only | grep angular-xml.js`

if [ $changed ]
then
  command npm run-script jshint
  command npm run-script karma
  command npm run-script compile
  git add angular-xml.min.js
fi

