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

@app.post("/clothes")
async def create_clothes(clothes_request: ClothesRequest):



# 각 옷





    return {"message": "Data received successfully"}
