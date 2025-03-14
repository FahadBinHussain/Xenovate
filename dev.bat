@echo off
echo Starting Xenovate development environment...

REM Set workspace path
set WORKSPACE=%~dp0

REM Create and activate virtual environment if it doesn't exist
if not exist "venv" (
    python -m venv venv
)
call venv\Scripts\activate

REM Install backend dependencies
cd backend
pip install -r requirements.txt

REM Set environment variables for backend
set GOOGLE_API_KEY=AIzaSyAjJFj4qVB-cWHgn5fAlXibnLfdMZDaLRU
set PYTHONPATH=%WORKSPACE%backend

REM Start backend server in a new window
start "Xenovate Backend" cmd /k "cd %WORKSPACE%backend && python -m uvicorn app.main:app --reload --port 8000"

REM Install frontend dependencies and start frontend server in a new window
cd ..
set NEXT_PUBLIC_API_URL=http://localhost:8000
start "Xenovate Frontend" cmd /k "npm install && npm run dev"

echo.
echo Development servers started!
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo.
echo Press Ctrl+C in the respective windows to stop the servers 