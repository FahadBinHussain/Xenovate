import os
from typing import Dict, Any
from dotenv import load_dotenv

def validate_environment() -> Dict[str, Any]:
    """Validate all required environment variables are present and properly formatted."""
    load_dotenv()
    
    required_vars = {
        'GOOGLE_API_KEY': {
            'required': True,
            'format': lambda x: x.startswith('AI'),
            'error': 'Google API key must start with "AI"'
        },
        'PORT': {
            'required': True,
            'format': lambda x: x.isdigit() and 1 <= int(x) <= 65535,
            'error': 'PORT must be a number between 1 and 65535'
        },
        'HOST': {
            'required': True,
            'format': lambda x: x in ['0.0.0.0', 'localhost', '127.0.0.1'],
            'error': 'HOST must be one of: 0.0.0.0, localhost, 127.0.0.1'
        }
    }
    
    results = {}
    for var, config in required_vars.items():
        value = os.getenv(var)
        if config['required'] and not value:
            raise ValueError(f"Required environment variable {var} is not set")
        
        if value and not config['format'](value):
            raise ValueError(f"Invalid {var}: {config['error']}")
        
        results[var] = value
    
    return results

def validate_model_config(model_name: str) -> bool:
    """Validate that the specified model name is supported."""
    supported_models = ['gemini-1.5-flash-002']
    return model_name in supported_models

def get_validated_config() -> Dict[str, Any]:
    """Get a validated configuration dictionary for the application."""
    env_vars = validate_environment()
    
    return {
        'api_key': env_vars['GOOGLE_API_KEY'],
        'port': int(env_vars['PORT']),
        'host': env_vars['HOST'],
        'debug': os.getenv('DEBUG', 'False').lower() == 'true',
        'log_level': os.getenv('LOG_LEVEL', 'INFO')
    } 