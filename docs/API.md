# Xenovate API Documentation

## Base URL

```
http://localhost:8000/api/v1
```

## Endpoints

### Code Analysis

#### POST /code/analyze

Analyze code and provide complexity analysis, explanation, and optimization suggestions.

**Request Body:**
```json
{
  "code": "string",
  "language": "string",
  "target_language": "string (optional)"
}
```

**Response:**
```json
{
  "complexity": "string",
  "explanation": "string",
  "optimization": "string",
  "converted_code": "string (optional)"
}
```

**Example Request:**
```bash
curl -X POST http://localhost:8000/api/v1/code/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(0, n-i-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]\n    return arr",
    "language": "python",
    "target_language": "java"
  }'
```

**Example Response:**
```json
{
  "complexity": "Time Complexity: O(n²)\nSpace Complexity: O(1)",
  "explanation": "This is a bubble sort implementation...",
  "optimization": "1. Add a flag to detect if the array is already sorted\n2. Track the last swap position...",
  "converted_code": "public class BubbleSort {\n    public static int[] bubbleSort(int[] arr) {...}\n}"
}
```

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "error": "string",
  "details": "string (optional)"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error",
  "details": "string (optional)"
}
```

## Supported Languages

- Python
- JavaScript
- Java
- C++
- Go
- Rust
- Swift
- Kotlin
- TypeScript
- Ruby

## Rate Limiting

The API is rate limited to 100 requests per minute per IP address.

## Authentication

Currently, the API is public and does not require authentication. Future versions may implement API key authentication. 