from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

app = FastAPI()

class Clothes(BaseModel):
    largeCategoryId: str
    clothesId: int
    season: str
    color: str
    thickness: int
    textile: str
    frequency: int


class WeatherInfo(BaseModel):
    minTemperature: int
    maxTemperature: int
    weather: int

class ClothesRequest(BaseModel):
    outer: Clothes
    top: Clothes
    bottom: Clothes
    item: Clothes
    weatherInfo: WeatherInfo

class KJGResponse(BaseModel):




 @app.post("/clothes")
 async def create_clothes(clothes_request: ClothesRequest):
    # 옷 수치화 ( 색상, 두께 )
    min_temperature = clothes_request.weatherInfo.minTemperature
    max_temperature = clothes_request.weatherInfo.maxTemperature

    if clothes_request.outer is not None:
        fitnessNum = clothes_request.outer.season

    if clothes_request.top is not None:
        fitnessNum = clothes_request.top.season

    if clothes_request.bottom is not None:
        fitnessNum = clothes_request.bottom.season

    if clothes_request.item is not None:
        fitnessNum = clothes_request.item.season


    # 코멘트, 각 점수는 받아오기

    ai_feedback = "default feedback"

# 각 옷착장 평가
if __name__ == "__main__":




    return {"message": "Data received successfully"}
