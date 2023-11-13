from pydantic import BaseModel, Field
from typing import List, Dict
from datetime import date

class ClothesId(BaseModel):
    id: int

class AIRecommendation(BaseModel):
    clothesId: List[ClothesId]
    recDate: date

class AIRecommendationList(BaseModel):
    aiRecommend: List[AIRecommendation]
