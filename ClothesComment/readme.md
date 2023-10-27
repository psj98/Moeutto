# 개요
- 착장 사진 segmentation - classification(keyword including category) - text - gpt(comment)
# 개발 상황
## 고려중인 모델

- segmentation 
  - sam (여러 segment 추출 가능, 빠른 속도) / 프롬프트 입력(위치) 필요
  - ~~- matting - [MA](https://github.com/SHI-Labs/Matting-Anything)~~
  - u2net_cloth
- classification - fashionClip
- generate text - chat gpt 


## 실행 매뉴얼 
- 파이썬 버전 : 3.12 
### 가상환경 생성, 적용
- python -m venv myvenv
- source myvenv/Scripts/activate
### 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
### main.py run
- main.py 파일을 run 해주세요
