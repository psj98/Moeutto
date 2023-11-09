from pydantic import BaseModel
from typing import List, Dict

class Clothes(BaseModel):
    clothesId: int
    season: str
    color: str
    thickness: int
    textile: str
    frequency: int

class ClothesCategory(BaseModel):
    outer: List[Clothes]
    top: List[Clothes]
    bottom: List[Clothes]
    item: List[Clothes]

# 파이썬은 double이 없습니다
# tmd : 최저 기온
# tmx : 최고 기온
class DailyWeatherInfo(BaseModel):
    date: str
    tmx: float
    tmn: float
    wsd: float

class ClothesListRequest(BaseModel):
    clothesList: ClothesCategory
    weatherInfo: List[DailyWeatherInfo]
