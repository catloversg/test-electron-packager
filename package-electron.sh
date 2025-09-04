#!/bin/bash

rm -rf .package
mkdir .package
rm -rf .build
mkdir .build

cd electron
npm install
cd ..

cp -r electron/* .package

BUILD_PLATFORM="${1:-"all"}"
# And finally build the app.
case $BUILD_PLATFORM in
  "win")
    electron-packager .package test-electron-packager --platform win32 --arch x64 --out .build --overwrite;;
  "mac")
    electron-packager .package test-electron-packager --platform darwin --arch universal --osx-universal.x64ArchFiles="Contents/Resources/app/node_modules/@catloversg/steamworks.js/dist/osx/*" --out .build --overwrite;;
esac
