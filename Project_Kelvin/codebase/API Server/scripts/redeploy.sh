#!/bin/sh
echo "deploying app"
pwd
git pull --rebase
npm i -d
pm2 restart 0
