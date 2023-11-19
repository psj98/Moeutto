from fastapi import FastAPI
from pydantic import BaseModel

# usr lib
from score.mk_score import calculate_total_score,get_temp_weather
from clothes_vo import ClothesRequest,Clothes

# 시각화
from darkness.darkness import get_darkness
from darkness.color_vo import Color
from temperature.temperature import get_temperature
from temperature.thickness_vo import Thickness

import uvicorn

# add OPENAI_KEY to Enviroment
import os
from dotenv import load_dotenv

from GPT.mk_comment import mk_comment
import json


load_dotenv()
os.environ["OPENAI_API_KEY"] = os.getenv("apikey")


app = FastAPI()


def check_null(clothes: Clothes):
    if clothes.clothesId == -1:
        clothes.clothesName = "nothing"
        clothes.season = "0000"
        clothes.color = "multi"
        clothes.thickness = 1
        clothes.textile = "etc"
        clothes.frequency = 1
        clothes.largeCategoryId = "000"

# create_clothes return 해야 하는 format
class KJGResponse(BaseModel):

 @app.post("/clothes")
 async def create_clothes(clothes_request: ClothesRequest):
    # 개별 옷 피드백
    # 1. 텍스트 - 생성형 ai 이용
    # 2. 수치화 - 수식 사용 (두께, 계절)
    # 옷마다 예상 보온성(temperature)int 1~100,명암(darkness)int 1~100 뽑아서 리턴
    # 점 하나니까 전체 옷 합산해서 점 하나 찍는 것으로 보임 -> sum_darkness, sum_temperature

    check_null(clothes_request.outer)
    check_null(clothes_request.top)
    check_null(clothes_request.bottom)
    check_null(clothes_request.item)

    # temper는 두께로 계산
    # jg_temperature = Thickness(clothes_request.outer.thickness, clothes_request.top.thickness, clothes_request.bottom.thickness, clothes_request.item.thickness)
    jg_temperature = Thickness(
        outer=clothes_request.outer.thickness,
        top=clothes_request.top.thickness,
        bottom=clothes_request.bottom.thickness,
        item=clothes_request.item.thickness
    )
    jg_temperature = get_temperature(jg_temperature)

    # color에서 darkness 뽑고 mk_comment에서 온도 가져와서 합산
    # jg_color = Color(clothes_request.outer.color, clothes_request.top.color, clothes_request.bottom.color, clothes_request.item.color)
    jg_color = Color(
        outer = clothes_request.outer.color,
        top = clothes_request.top.color,
        bottom = clothes_request.bottom.color,
        item = clothes_request.item.color
    )

    darkness = get_darkness(jg_color)

    # score List : outer top bottom item 순으로 append
    # score = calculate_total_score(thickness, min_temp, max_temp, season)
    min_temp = clothes_request.weatherInfo.minTemperature
    max_temp = clothes_request.weatherInfo.maxTemperature
    avg_temp = int((min_temp + max_temp)/2)

    #
    season = get_temp_weather() # 1 2 3 4 봄 여름 가을 겨울
    score_list = [calculate_total_score(clothes_request.outer.thickness, min_temp, max_temp, season),
                  calculate_total_score(clothes_request.top.thickness, min_temp, max_temp, season),
                  calculate_total_score(clothes_request.bottom.thickness, min_temp, max_temp, season),
                  calculate_total_score(clothes_request.item.thickness, min_temp, max_temp, season)]

    # Comment List : outer top bottom item
    # {
    #     "outer": ["검정 경량패딩", 70],
    #     "top": [회색 긴팔티, 65],
    #     "bottom": [회색 면바지, 60],
    #     "item": [검은 안경, 0],
    #     "temperature": 9
    # }
    # 파이썬의 str은 immutable (append 불가능)
    outer_input_txt = '"outer": ["' + clothes_request.outer.clothesName + '", ' + str(score_list[0]) + '], '
    top_input_txt = '"top": ["' + clothes_request.top.clothesName + '", ' + str(score_list[1]) + '], '
    bottom_input_txt = '"bottom": ["' + clothes_request.bottom.clothesName + '", ' + str(score_list[2]) + '], '
    item_input_txt = '"item": ["' + clothes_request.item.clothesName + '", ' + str(score_list[3]) + '], '
    temperature_input_txt = '"temperature": ' + str(avg_temp)

    comment_input_txt = "{" + outer_input_txt + top_input_txt + bottom_input_txt + item_input_txt + temperature_input_txt + "}"
    comment_output_txt = mk_comment(comment_input_txt)

    # print(comment_input_txt)
    # comment_output_txt="""
    #     "outer": "따뜻하고 스타일리시한 아이템입니다.",
    #     "top": "따뜻한 옷이지만, 겉옷을 추가로 입는 것이 좋아요.",
    #     "bottom": "따뜻한 바지지만, 겉옷을 추가로 입는 것이 좋아요.",
    #     "item": "따뜻한 옷은 아니지만, 스타일에 도움이 되는 아이템이에요."
    # """
    comment_output_json = {"outer":"멋진 아우터네요, 따뜻하고 좋아요!","top":"오늘 날씨에 딱 좋아요!","bottom":"상의와 잘 어울리는 바지군요!","item":"아이템까지 완벽한 패셔니스타에요",}
    try:
        comment_output_json = json.loads(comment_output_txt)
    except:
        print("JSON Parsing ERROR:"+str(comment_output_txt))
    # {
    #     "outer": feedback(str),
    #     "top": feedback(str),
    #     "bottom": feedback(str),
    #     "item": feedback(str),
    # }

    if clothes_request.outer.clothesId == -1:
        score_list[0] = 0
    if clothes_request.top.clothesId == -1:
        score_list[1] = 0
    if clothes_request.bottom.clothesId == -1:
        score_list[2] = 0
    if clothes_request.item.clothesId == -1:
        score_list[3] = 0

    # ret > json format으로 하나씩 담아서 전송
    ret = {
        "clothesResult":[
            {# outer
                "clothesId": clothes_request.outer.clothesId,
                "result": comment_output_json["outer"],
                "fitnessNum":score_list[0]
            },
            {# top
                "clothesId": clothes_request.top.clothesId,
                "result": comment_output_json["top"],
                "fitnessNum": score_list[1]
            },
            {# bottom
                "clothesId": clothes_request.bottom.clothesId,
                "result": comment_output_json["bottom"],
                "fitnessNum": score_list[2]
            },
            {# item
                "clothesId": clothes_request.item.clothesId,
                "result": comment_output_json["item"],
                "fitnessNum": score_list[3]
            }
        ],
        "clothesFeature": {
            "temperature": jg_temperature,
            "darkness": darkness
        }
    }

    # {
    #   	"clothesResult": [ // 옷 적합도 결과
    #         {
    #             "clothesId": int, // 옷 id
    #             "result": String, // 검사 결과
    #             "fitnessNum": int // 적합도 수치 1~ 100 (score(calculate_total_score))
    #         }, ...
    #     ],
    #     "clothesFeature": {
    #         "temperature": int, // 따뜻한 정도 (낮을수록 시원) 1~ 100 (50 중간값)
    #         "darkness": int, // 색상 밝기 정도 (낮을수록 밝음) 1~ 100 (50 중간값)
    #     }
    #
    # }
    return ret
# 옷 속성 업데이트를 위한 도우미 함수


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