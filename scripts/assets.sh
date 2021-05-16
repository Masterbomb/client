#!/bin/bash

# make static directories for copy
mkdir -p dist/views dist/public/static dist/public/stylesheets dist/public/node_modules
# copy ejs templates
cp -R src/views/ dist/views/.
# static content
cp -R src/public/static dist/public/. 
cp -R src/public/stylesheets dist/public/. 
cp -R src/public/favicon.ico dist/public/favicon.ico 
# axios node module
cp -R node_modules/axios dist/public/node_modules/.