#!/bin/bash
set -e

cd /home/matrix/mdev/lobstrio-docs

#echo "Installing dependencies..."
#npm install

echo "Building..."
npm run build

echo "Copying static assets to standalone..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

echo "Restarting server..."
pm2 restart ecosystem.config.cjs --update-env 2>/dev/null || pm2 start ecosystem.config.cjs

echo "Done! Server is running."
pm2 status
