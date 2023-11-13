# 랭체인
from langchain.llms import OpenAI

# 데이터프레임
import pandas as pd

# JSON으로 변환
import json


def mk_comment(plain_txt: str):

    # tempurature : 0 ~ 1 로 높아질수록 랜덤한 답변 생성 / 창의력
    llm = OpenAI(model_name="gpt-3.5-turbo-16k", temperature=0.8)

    instruction = """
        Act as a Doctor

        [Instructions]
        The input should be in the following 'input_format'
        Based on the provided cloth_name, warmth_score(int), and temperature(int), write feedbacks in Korean. Each feedback should be between 30 and 50 characters, including spaces. For 'item', the feedback should focus on style or functionality, especially if it refers to fashion accessories or non-clothing items that do not contribute to warmth.

    	Keep the '[return_format]' as it is provided.
        [input_format]
        '''
        {
             "outer": [cloth_name(str),warmth_score(int)],
             "top": [cloth_name(str),warmth_score(int)],
             "bottom": [cloth_name(str),warmth_score(int)],
             "item": [cloth_name(str),warmth_score(int)],
             "temperature":temperature(int)
        }
        '''
    """
    return_format = """
    [return_format]
    ```
    {
        "outer":feedback(str),
        "top":feedback(str),
        "bottom":feedback(str),
        "item":feedback(str),
    }

    ```
    """
    # 최종적으로 GPT에 입력할 텍스트
    prompt = instruction + return_format + plain_txt
    res_plain_txt = llm(prompt)

    res_plain_txt = json.loads(res_plain_txt)

    return res_plain_txt


if __name__ == "__main__":
    import os
    from dotenv import load_dotenv

    load_dotenv()
    os.environ["OPENAI_API_KEY"] = os.getenv("apikey")

    my_req = """
    {
     "outer": ["검정 경량패딩",70],
     "top": [회색 긴팔티,65],
     "bottom": [회색 면바지,60],
     "item": [검은 안경,0] 
     "temperature": 9  
    }
    """

    ret = mk_comment(my_req)
    print(ret)