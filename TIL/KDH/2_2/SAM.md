(youtube 링크)[https://www.youtube.com/watch?v=KQ3haqbIaSk&ab_channel=%EC%9D%B8%EA%B3%B5%EC%A7%80%EB%8A%A5%ED%8C%A9%ED%86%A0%EB%A6%AC%28AIFactory%29]

60:00 이후

# QnA
## ambiguity, 모호성에 대한 문제
- 특정 element 선택 시 선글라스를 잡을 지 선글라스를 착용한 사람을 잡을지 혹은 얼굴까지 잡을 지
- 3개의 mask를 출력
## finetuning
- 특정 영역에 전문화하도록 파인튜닝 가능

# 3부
- clip + sam -> text segmentation 조합이 가능하다, 만들어둔 것도 있다
- inpaint anything -> segment + inpaint(LaMa, sd)
- 자율주행에서 segment + tracking 가능
- grounding Dino 1:27:39 (txt로 object detection + segmentation)
    - grounded segement anything
    - 여기에 stable diffusion까지 적용 가능
- 
## finetuning
- medical img에서 finetuning을 한 모델도 있다
  - 이미지 인코더가 가장 중요(이미지 정보를 압축하는 파트)
  - 이미지 인코더 임베딩
  - 인코더 파트를 파인튜닝 할 수도 있다

# github
- python>=3.8
-> 3.11 사용하면 될 것으로 보임

# model
Three model versions of the model are available with different backbone sizes. These models can be instantiated by running

```py
from segment_anything import sam_model_registry
sam = sam_model_registry["<model_type>"](checkpoint="<path/to/checkpoint>")
```

default or vit_h: ViT-H SAM model. : 제일 무거움, 2.4gb
vit_l: ViT-L SAM model. : 중간, 1.2gb
vit_b: ViT-B SAM model. : 제일 가벼움 358mb

# 사용법
- 다운로드받은 pth 경로를 아래 checkpoint에 입력하고 사용
- 