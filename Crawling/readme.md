# 개요 
- 의류 추천에서 사용할 데이터 수집을 위한 코드
- 무신사 홈페이지 내 의류 데이터 수집

# 디렉토리 구조 
```shell
├─auto-crawling
└─img-crawling
```
- auto-crawling 
  - csv 형태로 크롤링 데이터를 저장합니다
- img-crawling
  - Vector store에 크롤링한 이미지를 임베딩하여 가격, 이름, 이미지 url을 포함한 메타데이터와 함께 저장합니다
  

# 실행 매뉴얼
## 파이썬 버전 
3.9 사용
## 가상환경
- python -m venv myvenv
- source myvenv/Scripts/activate
## 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
## main.py run
- main.py 파일을 run 해주세요

