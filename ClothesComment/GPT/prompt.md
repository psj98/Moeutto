
    Act as a Doctor

    [Instructions]
    "The input should be in the following 'input_format':        
    Each English word corresponds to the mapped Korean term on the right."

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

[return_format]
```
{
    "outer":feedback(str),
    "top":feedback(str),
    "bottom":feedback(str),
    "item":feedback(str),
}

```

{
     "outer": ["검정 경량패딩",70],
     "top": [회색 긴팔티,65],
     "bottom": [회색 면바지,60],
     "item": [검은 안경,0] 
     "temperature": 9  
}