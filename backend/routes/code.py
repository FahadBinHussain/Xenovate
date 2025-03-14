from fastapi import APIRouter, HTTPException, Depends
from ..schemas.code import CodeAnalysisRequest, CodeAnalysisResponse, ErrorResponse
from ..services.code_analysis import CodeAnalysisService
from ..config.settings import get_settings

router = APIRouter(prefix="/api/v1/code", tags=["code"])
settings = get_settings()

@router.post("/analyze", response_model=CodeAnalysisResponse, responses={400: {"model": ErrorResponse}})
async def analyze_code(request: CodeAnalysisRequest):
    """Analyze code and provide complexity analysis, explanation, and optimization suggestions."""
    try:
        service = CodeAnalysisService()
        analysis = await service.analyze_code(request.code, request.language)
        
        # If target language is specified, convert the code
        converted_code = None
        if request.target_language:
            converted_code = await service.convert_code(
                request.code,
                request.language,
                request.target_language
            )
        
        return CodeAnalysisResponse(
            complexity=analysis['complexity'],
            explanation=analysis['explanation'],
            optimization=analysis['optimization'],
            converted_code=converted_code
        )
    except Exception as e:
        raise HTTPException(
            status_code=400,
            detail=ErrorResponse(
                error="Failed to analyze code",
                details=str(e)
            ).dict()
        ) 