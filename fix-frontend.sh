#!/bin/bash

echo "Starting Next.js frontend with explicit API connection..."

# Set default port for the backend
export PORT=8000

# Create or update the .env.local file to ensure API URL is available during build
echo "Writing environment variables to .env.local..."
echo "NEXT_PUBLIC_API_URL=http://localhost:$PORT" > .env.local
cat .env.local

# Clean the Next.js cache to ensure a fresh build
echo "Cleaning Next.js cache..."
rm -rf .next

# Build the app with the environment variables
echo "Building application with environment variables..."
npm run build

# Start the frontend server
echo "Starting frontend server with API URL set to http://localhost:$PORT..."
npm start 