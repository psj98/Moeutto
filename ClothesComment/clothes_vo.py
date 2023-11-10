from pydantic import BaseModel


class Clothes(BaseModel):
    largeCategoryId: str
    clothesId: int
    clothesName: str
    season: str
    color: str
    thickness: int
    textile: str
    frequency: int


class WeatherInfo(BaseModel):
    minTemperature: int
    maxTemperature: int
    weather: int #weather : pty강수 형태 코드 ( 0 없음, 1 비, 2 비/눈, 3 눈, 4 소나기)

class ClothesRequest(BaseModel):
    outer: Clothes
    top: Clothes
    bottom: Clothes
    item: Clothes
    weatherInfo: WeatherInfo