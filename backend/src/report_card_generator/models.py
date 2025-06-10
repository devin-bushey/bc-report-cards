from pydantic import BaseModel, Field
from typing import Optional, List


class FeedbackImprovementRequest(BaseModel):
    original_feedback: str = Field(..., min_length=1, max_length=1000)
    subject: Optional[str] = None
    grade_level: Optional[str] = None
    tone: Optional[str] = Field("encouraging", max_length=50)
    length: Optional[str] = Field("short", pattern="^(short|medium|long)$")
    custom_prompt: Optional[str] = Field(None, max_length=500)
    focus_areas: Optional[List[str]] = Field(None, description="Areas to emphasize in the feedback")


class ImprovedFeedback(BaseModel):
    comment: str
    word_count: int


class FeedbackResponse(BaseModel):
    success: bool
    data: Optional[ImprovedFeedback] = None
    error: Optional[str] = None
    generated_at: str


class HealthResponse(BaseModel):
    status: str
    timestamp: str
    version: str = "1.0.0"