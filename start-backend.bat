@echo off
echo Starting Xenovate Backend Server...

cd xenovate\backend

:: Check if virtual environment exists, if not create it
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)

:: Activate virtual environment
call venv\Scripts\activate

:: Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

:: Set environment variables
set GOOGLE_API_KEY=AIzaSyAjJFj4qVB-cWHgn5fAlXibnLfdMZDaLRU

:: Start the backend server
echo Starting server...
python -m app.main

:: If we get here, the server stopped
echo Server stopped.
pause 