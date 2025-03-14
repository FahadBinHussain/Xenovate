import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    print("Error: GOOGLE_API_KEY not found in environment variables")
    sys.exit(1)

print(f"Using API key: {api_key[:4]}...{api_key[-4:]}")

try:
    # Configure the Gemini API
    genai.configure(api_key=api_key)
    
    # List available models
    print("\nAvailable models:")
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            print(f"- {m.name}")
    
    # Try different model versions
    models_to_try = [
        "gemini-pro",
        "gemini-1.0-pro",
        "gemini-1.5-pro",
        "gemini-1.5-flash"
    ]
    
    for model_name in models_to_try:
        print(f"\nTrying model: {model_name}")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Hello, what's your name?")
            print(f"✅ Success with {model_name}!")
            print(f"Response: {response.text[:100]}...")
        except Exception as e:
            print(f"❌ Error with {model_name}: {str(e)}")
    
except Exception as e:
    print(f"Error initializing Gemini API: {str(e)}")
    sys.exit(1)

print("\nTest completed.") 