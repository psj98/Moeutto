https://github.com/kakaobrain/kogpt
- 지시문에 대해 원하는 형식의 결과가 산출되지 않아 사용하지 않았습니다.

```shell

    Act as a Doctor

    [Instructions]
    "The input should be in the following 'input_format':
    Each English word corresponds to the mapped Korean term on the right."

    Based on the given cloth_name, warmth_score(int), temperature(int)
    write compact feedbacks in Korean, between 20 and 30 characters including spaces.

    keep the '[return_format]'
    [input_format]
    """
    {
         "outer": [cloth_name(str),warmth_score(int)],
         "top": [cloth_name(str),warmth_score(int)],
         "bottom": [cloth_name(str),warmth_score(int)],
         "item": [cloth_name(str),warmth_score(int)],
         "temperature":temperature(int)
    }[prompt.py](prompt.py)
    """

[return_format]"""
{    "outer":feedback(str),
    "top":feedback(str),
    "bottom":feedback(str),
    "item":feedback(str),
}

"""

{
     "outer": ["검정 경량패딩",70],
     "top": [회색 긴팔티,65],
     "bottom": [회색 면바지,60],
     "item": [검은 안경,0]
     "temperature": 9
}
      """
{


    "outer": ["검은색 경량패딩",75],
    "top": ["검정 긴팔티",65],
    "bottom": ["흰색 면바지",60],
    "item": ["검은색 안경",0],
    
수행 시간
46.76815 sec
```
- 한글 지시문 
```shell
   instruction = """
    의사처럼 동작하시오

    [Instructions]
    "입력은 아래의'input_format'을 따릅니다        

    제공된 cloth_name, warmth_score(int), and temperature(int)에 따라서 피드백을 작성하시오. 각 피드백은 공백을 포함하여 30~50 글자 사이여야 합니다. 'item'에 한해서는, 피드백은 보온성에 관계 없이 스타일에 의거하여 작성하시오

	아래의'[return_format]' 에 의거하여 산출물을 작성하시오.
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
```
    - 결과값
```shell
"\n    의사처럼 동작하시오\n\n    [Instructions]\n    \"입력은 아래의'input_format'을 따릅니다        \n\n    제공된 cloth_name, warmth_score(int), and temperature(int)에 따라서 피드백을 작성하시오. 각 피드백은 공백을 포함하여 30~50 글자 사이여야 합니다. 'item'에 한해서는, 피드백은 보온성에 관계 없이 스타일에 의거하여 작성하시오\n\n\t아래의'[return_format]' 에 의거하여 산출물을 작성하시오.\n    [input_format]\n    '''\n    {\n         \"outer\": [cloth_name(str),warmth_score(int)],\n         \"top\": [cloth_name(str),warmth_score(int)],\n         \"bottom\": [cloth_name(str),warmth_score(int)],\n         \"item\": [cloth_name(str),warmth_score(int)],\n         \"temperature\":temperature(int)\n    }\n    '''\n    \n    [return_format]\n    ```\n    {\n        \"outer\":feedback(str),\n        \"top\":feedback(str),\n        \"bottom\":feedback(str),\n        \"item\":feedback(str),\n    }\n    \n    ```\n    \n{\n     \"outer\": [\"검정 경량패딩\",70],\n     \"top\": [회색 긴팔티,65],\n     \"bottom\": [회색 면바지,60],\n     \"item\": [검은 안경,0] \n     \"temperature\": 9  \n}\n    [Instructions]\n    \"입력은 아래의'input_format'을 따릅니다          \n\n    제공된 cloth_name, warmth_score(int), and temperature(int"
```