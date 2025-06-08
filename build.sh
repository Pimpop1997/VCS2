#!/bin/bash

echo "Building BergDotBet Admin Panel..."

# Build frontend
npm run build

# สร้าง public directory สำหรับ static files
mkdir -p public
cp -r dist/* public/ 2>/dev/null || echo "No dist files to copy"

# Copy shared schema
mkdir -p dist/shared public/shared
cp -r shared/* dist/shared/ 2>/dev/null || echo "No shared files"
cp -r shared/* public/shared/ 2>/dev/null || echo "No shared files"

echo "Build completed successfully!"
echo "Frontend files ready in public/ directory"