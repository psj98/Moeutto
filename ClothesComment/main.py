from fastapi import FastAPI
from pydantic import BaseModel

# usr lib
from comment import MKComment as kwon
from ClothesDTO import ClothesRequest

# 시각화
from Darkness.Darkness import get_darkness
from Darkness.ColorDTO import Color
from Temperature.Temperature import get_temperature
from Temperature.thicknessDTO import Thickness

import uvicorn

app = FastAPI()

# create_clothes return 해야 하는 format
class KJGResponse(BaseModel):

 @app.post("/clothes")
 async def create_clothes(clothes_request: ClothesRequest):
    # 개별 옷 피드백
    # 1. 텍스트 - 생성형 ai 이용
    # 2. 수치화 - 수식 사용 (두께, 계절)
    ai_feedback = kwon.mk_comment(clothes_request)

    # 옷마다 예상 보온성(temperature)int 1~100,명암(darkness)int 1~100 뽑아서 리턴
    # 점 하나니까 전체 옷 합산해서 점 하나 찍는 것으로 보임 -> sum_darkness, sum_temperature


    # temper는 두께로 계산
    jg_temperature = Thickness(clothes_request.outer.thickness,clothes_request.top.thickness,clothes_request.bottom.thickness,clothes_request.item.thickness)
    jg_temperature = get_temperature(jg_temperature)

    # color에서 darkness 뽑고 mk_comment에서 온도 가져와서 합산
    jg_color = Color(clothes_request.outer.color,clothes_request.top.color,clothes_request.bottom.color,clothes_request.item.color)
    darkness = get_darkness(jg_color)

    ret = """
    {
      	"clothesResult": [ // 옷 적합도 결과
            { 
                "clothesId": int, // 옷 id
                "result": String, // 검사 결과 
                "fitnessNum": int // 적합도 수치 1~ 100 (score(calculate_total_score))
            }, ...
        ],
        "clothesFeature": {
            "temperature": int, // 따뜻한 정도 (낮을수록 시원) 1~ 100 (50 중간값)
            "darkness": int, // 색상 밝기 정도 (낮을수록 밝음) 1~ 100 (50 중간값)
        }
      
    }
    """
    return {ret}




# 각 옷착장 평가
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=9011)

    # darkness test
    # test_darkness = Color(outer = "red",top = "red",bottom = "black",item = "black")
    # darkness = get_darkness(test_darkness)
    # print(darkness)

    #temperature test
    # test_temperature = Thickness(outer = 3, top = 3, bottom = 3, item = 3)
    # temperature = get_temperature(test_temperature)
    # print(temperature)