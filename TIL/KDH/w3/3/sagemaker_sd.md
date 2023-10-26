# stablediffusion v2 in sagemaker
- https://www.youtube.com/watch?v=DIxWMsbJa50&ab_channel=AmazonWebServicesKorea
# foundation model
- gpt 3와 비슷한 MML -> Bloom

## diffusion
- 정변환, 역변환
- 데이터 -> 노이즈

### 역변환은 resnet _ u-net

VRAM 10GB에서도 사용 가능

img to img, upscaling, 이미지의 일부만 수행하는 인페인팅도 가능

# V2의 개선접
- OpenClip을 Text Encoder로 활용하면서 이미지의 품질 개선

- 출력 이미지 768 768 사용 가능
- 업스케일로 2048 2048 이상 이미지 생성 가능
- 이미지 depth 추출하고 이를 txt 정보와 컨디션 텀으로 활용해 이미지 생성 가능

## in sagemaker
- 원클릭으로 fine tuning, 호스팅 가능


# Sagemaker Jumpstart

- ML 모델을 출시할 때 빠르게 테스트하고 출시하게 하는 도구
- 사전학습모델, 빌트인알고리즘 빠르게 적용 가능
- 재학습, 배포도 가능
- 파이썬코드로도 가능하고 UI로도 가능하고

## 사용법
- 한번의 클릭으로 필요한
  s3 bugket
  cloud watch
  sagemaker 인스턴스 생성
- 단지 훈련을 위한 모델을 s3에 업로드하면 바로 사용 가능
## demo
17:54

- 모델 안쓸때 바로바로 삭제안하면 과금 많이 나올 수 있음
- 엔드포인트도 바로바로 삭제


## 맺음말
- explore.skillbuilder.aws
- aws skill builder에서 ai&ml 과정 학습 가능 (무료)