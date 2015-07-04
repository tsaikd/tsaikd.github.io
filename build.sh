#!/bin/bash

set -e

PN="${BASH_SOURCE[0]##*/}"
PD="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "${PD}"

export GITHASH="$(git rev-parse HEAD | cut -c1-6)"

./node_modules/gulp/bin/gulp.js build

git add .
git commit -s -m "compile"
