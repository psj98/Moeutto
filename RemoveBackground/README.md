# 개요
- u2net
- fashion - clip

# 주요 기능
- 배경을 제거하고 하나의 의류 이미지로 변환
- 가운데 픽셀 기준으로 rgb -> hex 값 반환
- 카테고리 분류

# 테스트
## postman
- main.py 실행 (cpu)
- key : file
- value : 이미지 파일 등록
- http://localhost:9010/predict -> send


# 파이썬 환경 설정
### 가상환경(virtual venv)
- python -m venv myvenv 로 가상환경을 만들어주세요
- source myvenv/Scripts/activate 로 가상환경을 실행해주세요
### 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
### main.py run
- main.py 파일을 run 해주세요


## pyenv
- 여러 버전의 파이썬을 관리
### 사용법 
- 가상환경 생성
  - pyenv virtualenv venv
  - ~/.pyenv/versions 디텍터리 내에 저장
- 가상 환경 활성화
  - pyenv local venv
  - 현재 디렉토리에서 venv 환경 사용

# 수정 사항
- segmentation을 거친 이미지에 검정색 배경이 생기는 문제
    - 

# conda 
## 사용법

### conda virtual venv create

```bash
conda --version
conda create -n venv
conda activate venv

```
```bash
pip3 install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu118
```


# Copyright
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1LGgLiHiWcmpQalgazLgq4uQuVUm9ZM4M?usp=sharing)

This repo contains inference code and gradio demo script using pre-trained U2NET model for Cloths Parsing from human portrait.</br>
Here clothes are parsed into 3 category: Upper body(red), Lower body(green) and Full body(yellow). The provided script also generates alpha images for each class. 

# Acknowledgements
- U2net model is from original [u2net repo](https://github.com/xuebinqin/U-2-Net). Thanks to Xuebin Qin for amazing repo.
- Most of the code is taken and modified from  [levindabhi/cloth-segmentation](https://github.com/levindabhi/cloth-segmentation)
