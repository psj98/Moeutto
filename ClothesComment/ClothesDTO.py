from pydantic import BaseModel


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