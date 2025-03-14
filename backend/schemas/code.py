from pydantic import BaseModel, Field
from typing import Optional

class CodeAnalysisRequest(BaseModel):
    code: str = Field(..., description="The code to analyze")
    language: str = Field(..., description="The programming language of the code")
    target_language: Optional[str] = Field(None, description="Target language for code conversion")

class CodeAnalysisResponse(BaseModel):
    complexity: str = Field(..., description="Time and space complexity analysis")
    explanation: str = Field(..., description="Explanation of how the code works")
    optimization: str = Field(..., description="Optimization suggestions")
    converted_code: Optional[str] = Field(None, description="Code converted to target language")

class ErrorResponse(BaseModel):
    error: str = Field(..., description="Error message")
    details: Optional[str] = Field(None, description="Additional error details") 