import os
import pytest
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

@pytest.fixture
def api_key():
    key = os.getenv("GOOGLE_API_KEY")
    assert key is not None, "GOOGLE_API_KEY environment variable is not set"
    return key

@pytest.fixture
def model(api_key):
    genai.configure(api_key=api_key)
    return genai.GenerativeModel('gemini-1.5-flash-002')

def test_api_key_present(api_key):
    """Test that API key is present and properly formatted."""
    assert len(api_key) > 0
    assert api_key.startswith("AI")

def test_model_initialization(model):
    """Test that the model can be initialized."""
    assert model is not None

def test_content_generation(model):
    """Test basic content generation functionality."""
    prompt = "What is the time complexity of a binary search algorithm? Answer in one short paragraph."
    response = model.generate_content(prompt)
    assert response.text is not None
    assert len(response.text) > 0 