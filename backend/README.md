# Algorithm Optimizer Backend

This is the backend API for the Algorithm Optimizer application, built with FastAPI and Python.

## Features

- Analyze algorithm time and space complexity
- Suggest optimizations for algorithms
- Convert code between different programming languages
- Explain algorithms in simple terms
- Real-time feedback via WebSockets

## Setup

1. Clone the repository
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Copy `.env.example` to `.env` and fill in your configuration:
   ```bash
   cp .env.example .env
   ```
5. Run the server:
   ```bash
   uvicorn app.main:app --reload
   ```

## API Documentation

Once the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Analyze Algorithm
- **URL**: `/analyze`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]",
    "language": "python",
    "user_id": "optional-user-id",
    "session_id": "optional-session-id"
  }
  ```
- **Response**:
  ```json
  {
    "time_complexity": "O(n²)",
    "space_complexity": "O(1)",
    "explanation": "Detailed explanation of the algorithm's complexity..."
  }
  ```

### Optimize Algorithm
- **URL**: `/optimize`
- **Method**: `POST`
- **Request Body**: Same as `/analyze`
- **Response**:
  ```json
  {
    "original_code": "...",
    "optimized_code": "...",
    "improvements": ["Improvement 1", "Improvement 2"],
    "complexity_before": {"time": "O(n²)", "space": "O(1)"},
    "complexity_after": {"time": "O(n log n)", "space": "O(1)"}
  }
  ```

### Convert Code
- **URL**: `/convert`
- **Method**: `POST`
- **Request Body**: Same as `/analyze` plus `target_language` parameter
- **Response**:
  ```json
  {
    "original_code": "...",
    "target_language": "java",
    "converted_code": "..."
  }
  ```

### Explain Algorithm
- **URL**: `/explain`
- **Method**: `POST`
- **Request Body**: Same as `/analyze`
- **Response**:
  ```json
  {
    "explanation": "Simple explanation of the algorithm..."
  }
  ```

### WebSocket Connection
- **URL**: `/ws/{client_id}`
- **Protocol**: WebSocket
- **Message Format**:
  ```json
  {
    "action": "analyze|optimize|convert|explain",
    "code": "...",
    "language": "python",
    "user_id": "optional-user-id"
  }
  ```

## Deployment

This backend is designed to be deployed on Fly.io. See the deployment instructions in the main README.md file. 