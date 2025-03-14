@echo off 
call "C:\Users\fahad\Downloads\Xenovate\venv\Scripts\activate.bat" 
set PYTHONPATH=C:\Users\fahad\Downloads\Xenovate\backend 
cd "C:\Users\fahad\Downloads\Xenovate\backend" 
python -m uvicorn app.main:app --reload --port 8000 
