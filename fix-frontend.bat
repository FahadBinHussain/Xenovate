@echo off
echo Starting Next.js frontend with explicit API connection...

REM Set default port for the backend
set PORT=8000

REM Create or update the .env.local file to ensure API URL is available during build
echo Writing environment variables to .env.local...
echo NEXT_PUBLIC_API_URL=http://localhost:%PORT% > .env.local
type .env.local

REM Clean the Next.js cache to ensure a fresh build
echo Cleaning Next.js cache...
if exist ".next" rd /s /q .next

REM Build the app with the environment variables
echo Building application with environment variables...
npm run build

REM Start the frontend server
echo Starting frontend server with API URL set to http://localhost:%PORT%...
npm start 