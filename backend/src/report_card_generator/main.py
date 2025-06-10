import logging
from datetime import datetime
from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn

from .models import FeedbackImprovementRequest, FeedbackResponse, HealthResponse
from .feedback_improver import FeedbackImprover
from .config import get_settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Feedback Improvement API",
    description="AI-powered feedback improvement for teachers",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

settings = get_settings()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_cors_origins_list(),
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


def get_feedback_improver() -> FeedbackImprover:
    return FeedbackImprover()


@app.get("/api/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint for monitoring service status."""
    return HealthResponse(
        status="healthy",
        timestamp=datetime.utcnow().isoformat(),
        version="1.0.0"
    )


@app.post("/api/improve-feedback", response_model=FeedbackResponse)
async def improve_feedback(
    request: FeedbackImprovementRequest,
    improver: FeedbackImprover = Depends(get_feedback_improver)
):
    """Improve existing feedback using AI."""
    try:
        logger.info(f"Improving feedback: {request.original_feedback[:50]}...")
        
        improved_feedback = await improver.improve_feedback(
            original_feedback=request.original_feedback,
            subject=request.subject,
            grade_level=request.grade_level,
            tone=request.tone or "professional",
            length=request.length or "medium",
            custom_prompt=request.custom_prompt,
            focus_areas=request.focus_areas
        )
        
        return FeedbackResponse(
            success=True,
            data=improved_feedback,
            generated_at=datetime.utcnow().isoformat()
        )
        
    except Exception as e:
        logger.error(f"Error improving feedback: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to improve feedback: {str(e)}"
        )


@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "success": False,
            "error": exc.detail,
            "generated_at": datetime.utcnow().isoformat()
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request, exc):
    logger.error(f"Unexpected error: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content={
            "success": False,
            "error": "An unexpected error occurred",
            "generated_at": datetime.utcnow().isoformat()
        }
    )


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )