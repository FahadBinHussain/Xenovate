#!/bin/bash

# Set default port if not set
if [ -z "$PORT" ]; then
    export PORT=8000
fi

echo "Starting Xenovate services..."

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
pip install -r requirements.txt
if [ $? -ne 0 ]; then
    echo "Failed to install backend dependencies"
    exit 1
fi

# Set environment variables for backend
export PYTHONPATH=$PYTHONPATH:$(pwd)

# Start backend server in the background
echo "Starting backend server..."
python -m uvicorn app.main:app --host 0.0.0.0 --port $PORT &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Go back to root directory
cd ..

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm ci
if [ $? -ne 0 ]; then
    echo "Failed to install frontend dependencies"
    exit 1
fi

# Build frontend
echo "Building frontend..."
npm run build
if [ $? -ne 0 ]; then
    echo "Failed to build frontend"
    exit 1
fi

# Start frontend server
echo "Starting frontend server..."
export NEXT_PUBLIC_API_URL=http://localhost:$PORT

echo "Running npm start..."
npm start
echo "Frontend started at http://localhost:3000" 