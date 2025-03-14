@echo off

REM Set default port if not set
if "%PORT%"=="" set PORT=8000

echo Starting Xenovate services...

REM Install backend dependencies
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
if errorlevel 1 (
    echo Failed to install backend dependencies
    exit /b 1
)

REM Set environment variables for backend
set PYTHONPATH=%PYTHONPATH%;%CD%

REM Start backend server in a new window
echo Starting backend server...
start "Xenovate Backend" cmd /k "python -m uvicorn app.main:app --host 0.0.0.0 --port %PORT%"

REM Go back to root directory
cd ..

REM Install frontend dependencies
echo Installing frontend dependencies...
npm ci
if errorlevel 1 (
    echo Failed to install frontend dependencies
    exit /b 1
)

REM Build frontend
echo Building frontend...
npm run build
if errorlevel 1 (
    echo Failed to build frontend
    exit /b 1
)

REM Start frontend server
echo Starting frontend server...
set NEXT_PUBLIC_API_URL=http://localhost:%PORT%

REM Start frontend in a new window
start "Xenovate Frontend" cmd /k "npm start"
echo Frontend started at http://localhost:3000 