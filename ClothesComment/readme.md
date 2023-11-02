# 개요

# 개발 상황
# 요구 사항

## response 형식
    {
	"clothesResult": [ // 옷 적합도 결과
		{ 
			"clothesId": int, // 옷 id
			"result": String, // 검사 결과
			"fitnessNum": int // 적합도 수치
		}, ...
	],
	"clothesFeature": {
		"temperature": int, // 따뜻한 정도 (낮을수록 시원)
		"darkness": int, // 색상 밝기 정도 (낮을수록 밝음)
		"seasonX": int, // 계절 정보 x좌표 (여름, 겨울)
		"seasonY": int // 계절 정보 y좌표 (봄, 가을)
	}
}


## 실행 매뉴얼 
- 파이썬 버전 : 3.11
### 가상환경 생성, 적용
- python -m venv myvenv
- source myvenv/Scripts/activate
### 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
### main.py run
- main.py 파일을 run 해주세요
