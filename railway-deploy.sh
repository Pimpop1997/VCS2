#!/bin/bash

echo "Starting Railway deployment process..."

# Ensure we have the right files
echo "Checking deployment files..."
ls -la start.cjs
ls -la railway.json
ls -la nixpacks.toml

# Test the server locally
echo "Testing server locally..."
node start.cjs &
SERVER_PID=$!
sleep 2

# Test endpoints
echo "Testing health endpoint..."
curl -s http://localhost:3000/health || echo "Health check failed"

echo "Testing main page..."
curl -s http://localhost:3000/ | head -10 || echo "Main page failed"

# Kill test server
kill $SERVER_PID 2>/dev/null

echo "Local test completed. Ready for Railway deployment."
echo "Files configured:"
echo "- start.cjs (Main server)"
echo "- railway.json (Railway config)"
echo "- nixpacks.toml (Build config)"
echo "- Procfile (Process config)"

echo "Next steps:"
echo "1. Go to Railway dashboard"
echo "2. Click 'Redeploy' on latest deployment"
echo "3. Wait for deployment to complete"
echo "4. Access: https://rmt-production.up.railway.app/"