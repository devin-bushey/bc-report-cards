import logging
from typing import List, Optional
from openai import AsyncOpenAI
from .models import ImprovedFeedback
from .config import get_settings

logger = logging.getLogger(__name__)


class FeedbackImprover:
    def __init__(self):
        self.settings = get_settings()
        if not self.settings.openai_api_key:
            raise ValueError("OpenAI API key is required. Please set OPENAI_API_KEY in your .env file.")
        self.client = AsyncOpenAI(api_key=self.settings.openai_api_key)
    
    async def improve_feedback(
        self, 
        original_feedback: str,
        subject: Optional[str] = None,
        grade_level: Optional[str] = None,
        tone: str = "professional",
        length: str = "medium",
        custom_prompt: Optional[str] = None,
        focus_areas: Optional[List[str]] = None
    ) -> ImprovedFeedback:
        try:
            if custom_prompt:
                prompt = self._build_custom_prompt(original_feedback, custom_prompt)
            else:
                prompt = self._build_standard_prompt(
                    original_feedback, subject, grade_level, tone, length, focus_areas
                )
            
            response = await self.client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an experienced teacher helping to improve, revise, and rewrite other teachers' report card feedback. Please improve the feedback according to the instructions provided."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=1000,
                temperature=0.7
            )
            
            improved_text = response.choices[0].message.content.strip()
            word_count = len(improved_text.split())
            
            return ImprovedFeedback(
                comment=improved_text,
                word_count=word_count
            )
            
        except Exception as e:
            logger.error(f"Error improving feedback: {str(e)}")
            raise Exception(f"Failed to improve feedback: {str(e)}")
    
    def _build_custom_prompt(self, original_feedback: str, custom_prompt: str) -> str:
        return f"""Original feedback: {original_feedback}

        Custom instructions: {custom_prompt}

        Please improve the feedback according to the custom instructions provided."""
    
    def _build_standard_prompt(
        self, 
        original_feedback: str, 
        subject: Optional[str], 
        grade_level: Optional[str], 
        tone: str, 
        length: str,
        focus_areas: Optional[List[str]] = None
    ) -> str:
        length_guidelines = {
            "short": "1-2 sentences",
            "medium": "3-4 sentences", 
            "long": "5+ sentences"
        }
        
        prompt = f"""Please improve this report card feedback:

        Original feedback: {original_feedback}

        Improvement guidelines:
        - Read the original feedback and use a similar writing style in your improved feedback.
        - The improved feedback should still sound like the person who wrote the original feedback.
        - Favor smaller adjustments as opposed to full rewrites.
        - Avoid sophisticated vocabulary and jargon in your improved feedback.

        Consider the following when improving the original feedback:
        - Length: {length_guidelines[length]}. Do not make the sentences too long. Be concise.
        - Tone: {tone}"""

        if subject and subject != 'other':
            prompt += f"\n- Subject context: {subject.replace('_', ' ').title()}"
        
        if grade_level and grade_level != 'general':
            prompt += f"\n- Grade level: {grade_level.title()}"

        if focus_areas:
            focus_area_descriptions = {
                'strengths': 'Highlight specific strengths and accomplishments',
                'improvements': 'Identify clear areas for improvement with actionable suggestions',
                'examples': 'Include specific examples of work or behavior',
                'next_steps': 'Provide concrete next steps or learning goals',
                'behavior': 'Address behavior, attitude, and classroom conduct',
                'participation': 'Comment on class participation and engagement',
                'growth': 'Emphasize progress and growth over time',
                'effort': 'Acknowledge effort, work habits, and persistence'
            }
            
            selected_focuses = [
                focus_area_descriptions[area] 
                for area in focus_areas 
                if area in focus_area_descriptions
            ]
            
            if selected_focuses:
                prompt += f"\n- Focus particularly on: {', '.join(selected_focuses)}"

        prompt += "\n\nProvide only the improved feedback text, no additional commentary."

        print(prompt)
        return prompt
