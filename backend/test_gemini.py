import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get the API key
api_key = os.getenv("GOOGLE_API_KEY")
print(f"API Key (first 4 chars): {api_key[:4]}...")

try:
    # Configure the Gemini API
    genai.configure(api_key=api_key)
    
    # List available models
    print("\nAvailable Models:")
    print("-" * 50)
    models = genai.list_models()
    for model in models:
        if "generateContent" in model.supported_generation_methods:
            print(f"- {model.name}")
    
    # Test with Gemini model
    print("\nTesting Gemini Content Generation:")
    print("-" * 50)
    model = genai.GenerativeModel('gemini-1.5-flash-002')
    
    # Try a simple prompt
    prompt = "What is the time complexity of a binary search algorithm? Answer in one short paragraph."
    print(f"Prompt: {prompt}")
    
    response = model.generate_content(prompt)
    print("\nResponse:")
    print("-" * 50)
    print(response.text)
    
    print("\nTest completed successfully!")

except Exception as e:
    print(f"\nError: {e}")
    print("\nTroubleshooting tips:")
    print("1. Check if the API key is valid")
    print("2. Verify that you have access to the Gemini API")
    print("3. Check for any rate limiting or quota issues")
    print("4. Make sure your internet connection is working properly") 