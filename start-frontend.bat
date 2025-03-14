@echo off
echo Starting Next.js frontend server...

REM Set default port if not set
if "%PORT%"=="" set PORT=8000

REM Set the API URL for frontend to connect to backend - MUST be set before npm start
set NEXT_PUBLIC_API_URL=http://localhost:%PORT%
echo API URL set to %NEXT_PUBLIC_API_URL%

REM Build the app first to ensure environment variables are applied
echo Building application with environment variables...
npm run build

REM Start the frontend server with verbose output
echo Starting frontend server...
npm start 