#!/bin/bash
set -e
yarn install
yarn run build
docker build -t fullstack-server .
rm -rf build
