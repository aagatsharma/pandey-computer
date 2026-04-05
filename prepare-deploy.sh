#!/bin/bash

set -euo pipefail

echo "🧹 Cleaning..."
rm -rf .next deploy deploy.zip

echo "📦 Installing..."
npm install

echo "🏗️ Building..."
npm run build

# check standalone
if [ ! -d ".next/standalone" ]; then
  echo "❌ standalone not found"
  exit 1
fi

echo "📁 Preparing deploy folder..."
mkdir -p deploy/.next/static

# ✅ 1. Copy standalone first (this has server.js + node_modules)
cp -r .next/standalone/. deploy/

# ✅ 2. Copy ONLY static INTO .next (not replacing it)
if [ -d ".next/static" ]; then
  cp -r .next/static/. deploy/.next/static/
else
  echo "⚠️ .next/static not found, skipping static assets copy"
fi

# ✅ 3. Copy public
if [ -d "public" ]; then
  cp -r public deploy/
fi

echo "🗜️ Zipping..."
cd deploy
zip -r ../deploy.zip .
cd ..

echo "✅ Done"