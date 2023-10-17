# Remove Background 
- 옷 사진을 등록할 때 배경을 제거
# Contents

# 고려중인 모델
- SAM
- rembg
## SAM
- [github](https://github.com/facebookresearch/segment-anything)
## rembg
- [github](https://github.com/danielgatis/rembg)
- fine tunine 가능
- python: >3.7, <3.12
### model
- u2net_cloth_seg :  A pre-trained model for Cloths Parsing from human portrait. Here clothes are parsed into 3 category: Upper body, Lower body and Full body.
- sam






# 파이썬 환경 설정
### 가상환경(virtual venv)
- python -m venv myvenv 로 가상환경을 만들어주세요
- source myvenv/Scripts/activate 로 가상환경을 실행해주세요
### 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
### main.py run
- main.py 파일을 run 해주세요