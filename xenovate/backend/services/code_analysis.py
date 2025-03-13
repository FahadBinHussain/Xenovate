from typing import Dict, Any
import google.generativeai as genai
from ..config.settings import get_settings

settings = get_settings()

class CodeAnalysisService:
    def __init__(self):
        genai.configure(api_key=settings.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel('gemini-1.5-flash-002')

    async def analyze_code(self, code: str, language: str) -> Dict[str, Any]:
        """Analyze code and provide complexity analysis, explanation, and optimization suggestions."""
        try:
            prompt = f"""
            Analyze this {language} code and provide:
            1. Time and space complexity analysis
            2. A clear explanation of how the code works
            3. Optimization suggestions
            
            Code:
            {code}
            """
            
            response = await self.model.generate_content_async(prompt)
            analysis = response.text
            
            # Parse the response into structured format
            sections = analysis.split('\n\n')
            
            return {
                'complexity': sections[0] if len(sections) > 0 else '',
                'explanation': sections[1] if len(sections) > 1 else '',
                'optimization': sections[2] if len(sections) > 2 else ''
            }
        except Exception as e:
            raise Exception(f"Error analyzing code: {str(e)}")

    async def convert_code(self, code: str, source_language: str, target_language: str) -> str:
        """Convert code from one programming language to another."""
        try:
            prompt = f"""
            Convert this {source_language} code to {target_language}.
            Maintain the same functionality and logic.
            Include appropriate imports and necessary language-specific constructs.
            
            Code:
            {code}
            """
            
            response = await self.model.generate_content_async(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Error converting code: {str(e)}") 