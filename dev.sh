#!/bin/bash
echo "Starting Algorithm Optimizer development environment..."

# Start the backend server
(cd xenovate && cd backend && python -m uvicorn main:app --reload) &

# Start the frontend development server
(cd xenovate && npm install && npm run dev) &

echo "Development servers started!"
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:3000"

# Wait for both processes to finish
wait 