from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Depends, HTTPException, status, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional
import json
import os
from dotenv import load_dotenv
import asyncio
from datetime import datetime
import google.generativeai as genai
import re

# Load environment variables
load_dotenv()

# Configure Google AI
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
print(f"GOOGLE_API_KEY loaded: {GOOGLE_API_KEY[:4] if GOOGLE_API_KEY else 'None'}...")
if GOOGLE_API_KEY:
    try:
        genai.configure(api_key=GOOGLE_API_KEY)
        # Use gemini-1.5-flash which we confirmed is working
        model = genai.GenerativeModel('gemini-1.5-flash')
        # Test the model with a simple query
        test_response = model.generate_content("Hello")
        print("Gemini model initialized successfully!")
        app_mode = "ACTIVE"
    except Exception as e:
        print(f"Error initializing Gemini model: {e}")
        model = None
        app_mode = "FALLBACK MODE"
else:
    print("GOOGLE_API_KEY not found. Using fallback mode.")
    model = None
    app_mode = "FALLBACK MODE"

# Initialize FastAPI app
app = FastAPI(title="Xenovate API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------- Models --------------

class AlgorithmInput(BaseModel):
    code: str
    language: str
    user_id: Optional[str] = None
    session_id: Optional[str] = None

class AlgorithmAnalysis(BaseModel):
    time_complexity: str
    space_complexity: str
    explanation: str

class OptimizationSuggestion(BaseModel):
    optimized_code: str
    improvements: List[str]

class CodeConversion(BaseModel):
    original_code: str
    target_language: str
    converted_code: str

# -------------- Routes --------------

@app.get("/")
async def root():
    return {"message": f"Xenovate API is running [{app_mode}]"}

@app.post("/api/analyze", response_model=AlgorithmAnalysis)
async def analyze_algorithm(input_data: AlgorithmInput):
    if model is None:
        # Fallback implementation if Google AI is not configured
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(1)",
            "explanation": "This is a fallback implementation. The actual analysis would be performed by the Google AI model."
        }
    
    try:
        # Prepare the prompt for the AI model
        prompt = f"""Analyze this {input_data.language} code and provide:
        1. Time complexity
        2. Space complexity
        3. A brief explanation

        Code:
        {input_data.code}

        Please format your response as JSON with keys: time_complexity, space_complexity, explanation"""

        # Get response from the AI model
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Clean up the response text to ensure it's valid JSON
        response_text = response_text.strip()
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        try:
            result = json.loads(response_text)
            # Clean up markdown formatting from the explanation
            explanation = result.get("explanation", "No explanation available")
            explanation = explanation.replace('`', '')  # Remove backticks
            explanation = explanation.replace('**', '')  # Remove bold markers
            explanation = explanation.replace('*', '')   # Remove italic markers
            
            return {
                "time_complexity": result.get("time_complexity", "Unknown"),
                "space_complexity": result.get("space_complexity", "Unknown"),
                "explanation": explanation
            }
        except json.JSONDecodeError:
            # If the response isn't valid JSON, try to extract the information from the text
            time_complexity = "Unknown"
            space_complexity = "Unknown"
            explanation = response_text

            # Try to find time complexity
            if "time complexity" in response_text.lower():
                time_match = re.search(r"O\([^)]+\)", response_text)
                if time_match:
                    time_complexity = time_match.group(0)

            # Try to find space complexity
            if "space complexity" in response_text.lower():
                space_match = re.search(r"O\([^)]+\)", response_text)
                if space_match:
                    space_complexity = space_match.group(0)

            # Clean up markdown formatting from the explanation
            explanation = explanation.replace('`', '')  # Remove backticks
            explanation = explanation.replace('**', '')  # Remove bold markers
            explanation = explanation.replace('*', '')   # Remove italic markers

            return {
                "time_complexity": time_complexity,
                "space_complexity": space_complexity,
                "explanation": explanation
            }
    except Exception as e:
        # If there's an error with the AI model, return the fallback implementation
        return {
            "time_complexity": "O(n)",
            "space_complexity": "O(1)",
            "explanation": f"Error analyzing code: {str(e)}"
        }

@app.post("/api/optimize", response_model=OptimizationSuggestion)
async def optimize_algorithm(input_data: AlgorithmInput):
    if model is None:
        # Fallback implementation if Google AI is not configured
        return {
            "optimized_code": input_data.code,
            "improvements": ["This is a fallback implementation. The actual optimization would be performed by the Google AI model."]
        }
    
    try:
        # Prepare the prompt for the AI model
        prompt = f"""Optimize this {input_data.language} code and provide:
        1. The optimized code
        2. A list of improvements made

        Code:
        {input_data.code}

        Please format your response as JSON with keys: optimized_code, improvements"""

        # Get response from the AI model
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Clean up the response text to ensure it's valid JSON
        response_text = response_text.strip()
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        try:
            result = json.loads(response_text)
            return {
                "optimized_code": result.get("optimized_code", input_data.code),
                "improvements": result.get("improvements", ["No improvements available."])
            }
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return a basic optimization
            return {
                "optimized_code": input_data.code,
                "improvements": ["Unable to parse optimization suggestions. Please try again."]
            }
    except Exception as e:
        # If there's an error with the AI model, return the fallback implementation
        return {
            "optimized_code": input_data.code,
            "improvements": [f"Error optimizing code: {str(e)}"]
        }

@app.post("/api/convert", response_model=CodeConversion)
async def convert_code(input_data: AlgorithmInput, target_language: str = Query(..., description="Target programming language")):
    if model is None:
        # Fallback implementation if Google AI is not configured
        return {
            "original_code": input_data.code,
            "target_language": target_language,
            "converted_code": "# This is a fallback implementation. The actual conversion would be performed by the Google AI model."
        }
    
    try:
        # Prepare the prompt for the AI model
        prompt = f"""Convert this {input_data.language} code to {target_language}:

        Code:
        {input_data.code}

        Please format your response as JSON with keys: original_code, target_language, converted_code"""

        # Get response from the AI model
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Clean up the response text to ensure it's valid JSON
        response_text = response_text.strip()
        if response_text.startswith('```json'):
            response_text = response_text[7:]
        if response_text.endswith('```'):
            response_text = response_text[:-3]
        response_text = response_text.strip()
        
        # Parse the response
        try:
            result = json.loads(response_text)
            return {
                "original_code": result.get("original_code", input_data.code),
                "target_language": result.get("target_language", target_language),
                "converted_code": result.get("converted_code", "# Conversion failed. Please try again.")
            }
        except json.JSONDecodeError:
            # If the response isn't valid JSON, return a basic conversion
            return {
                "original_code": input_data.code,
                "target_language": target_language,
                "converted_code": "# Unable to convert code. Please try again."
            }
    except Exception as e:
        # If there's an error with the AI model, return the fallback implementation
        return {
            "original_code": input_data.code,
            "target_language": target_language,
            "converted_code": f"# Error converting code: {str(e)}"
        }

@app.post("/api/explain")
async def explain_algorithm(input_data: AlgorithmInput):
    if model is None:
        # Fallback implementation if Google AI is not configured
        return {
            "explanation": "This is a fallback implementation. The actual explanation would be provided by the Google AI model."
        }
    
    try:
        # Prepare the prompt for the AI model
        prompt = f"""Explain this {input_data.language} code in plain language:

        Code:
        {input_data.code}

        Please provide a clear and concise explanation of what the code does."""

        # Get response from the AI model
        response = model.generate_content(prompt)
        response_text = response.text
        
        # Clean up the response text
        response_text = response_text.strip()
        if response_text.startswith('```'):
            response_text = response_text.split('\n', 1)[1]
        if response_text.endswith('```'):
            response_text = response_text.rsplit('\n', 1)[0]
        response_text = response_text.strip()
        
        # Clean up markdown formatting
        response_text = response_text.replace('`', '')  # Remove backticks
        response_text = response_text.replace('**', '')  # Remove bold markers
        response_text = response_text.replace('*', '')   # Remove italic markers
        
        return {
            "explanation": response_text
        }
    except Exception as e:
        # If there's an error with the AI model, return the fallback implementation
        return {
            "explanation": f"Error explaining code: {str(e)}"
        }

# -------------- WebSocket Support --------------

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, client_id: str):
        if client_id in self.active_connections:
            del self.active_connections[client_id]

    async def send_message(self, message: str, client_id: str):
        if client_id in self.active_connections:
            await self.active_connections[client_id].send_text(message)

manager = ConnectionManager()

@app.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(websocket, client_id)
    try:
        while True:
            data = await websocket.receive_text()
            # Process the received data
            try:
                message = json.loads(data)
                # Handle different message types
                if message.get("action") == "analyze":
                    result = await analyze_algorithm(AlgorithmInput(**message))
                    await manager.send_message(json.dumps(result), client_id)
                elif message.get("action") == "optimize":
                    result = await optimize_algorithm(AlgorithmInput(**message))
                    await manager.send_message(json.dumps(result), client_id)
                elif message.get("action") == "convert":
                    result = await convert_code(AlgorithmInput(**message), message.get("target_language", "python"))
                    await manager.send_message(json.dumps(result), client_id)
                elif message.get("action") == "explain":
                    result = await explain_algorithm(AlgorithmInput(**message))
                    await manager.send_message(json.dumps(result), client_id)
            except Exception as e:
                await manager.send_message(json.dumps({"error": str(e)}), client_id)
    except WebSocketDisconnect:
        manager.disconnect(client_id)

# Run the app with: uvicorn app.main:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True) 