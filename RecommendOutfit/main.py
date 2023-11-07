from fastapi import FastAPI
from pydantic import BaseModel


from ClothesDTO import ClothesListRequest
from RetDTO import AIRecommendationList

import uvicorn

app = FastAPI()


# create_clothes return 해야 하는 format
class KJGResponse(BaseModel):

    @app.post("/clothes")
    async def create_clothes(clothes_request: ClothesListRequest):

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

    # temperature test
    # test_temperature = Thickness(outer = 3, top = 3, bottom = 3, item = 3)
    # temperature = get_temperature(test_temperature)
    # print(temperature)