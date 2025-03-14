@echo off
echo Starting Next.js frontend in development mode...

REM Set default port for the backend
set PORT=8000

REM Create or update the .env.local file
echo Writing environment variables to .env.local...
echo NEXT_PUBLIC_API_URL=http://localhost:%PORT% > .env.local
echo NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co >> .env.local
echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key >> .env.local
type .env.local

REM Start the frontend in development mode
echo Starting frontend in development mode...
npm run dev 