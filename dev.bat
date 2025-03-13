@echo off
setlocal

:: Set the workspace path
set WORKSPACE_PATH=%~dp0

:: Create and activate virtual environment
python -m venv venv
call venv\Scripts\activate

:: Install backend dependencies
pip install -r xenovate\backend\requirements.txt
pip install google-generative-ai

:: Start the backend server in a new window
start cmd /k "cd %WORKSPACE_PATH% && call venv\Scripts\activate && cd xenovate\backend && python -m uvicorn main:app --reload"

:: Install frontend dependencies and start the development server
cd xenovate
npm install
npm run dev

endlocal 