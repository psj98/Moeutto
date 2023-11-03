# 개요

# 개발 상황
# 요구 사항
- res_clothesResult_result -> LM 필요 -> 한줄정도만 써도 됨 
- 온도, 밝기 수치화 알고리즘
- 적합도 평가 알고리즘 필요

# LM

# 온도, 밝기
- color (0XFFFFFF) -> 온도, 밝기 뽑아서 1~ 100으로 return 
-> 혼합은 50으로 


# 적합도 평가
옷()
m 두께 + n * 계절



- 항목 중 소재_기타 < 어떤 점수를 매기기 모호해서 수치화에서 제외
- 

- 계절 
  -

- 두께
    - 1~3
- 소재 ( 기타가 있어서 낮은 계수로 보정값 정도로 사용 )
  - cotton
  - denim
  - wool
  - leather
  - silk
  - etc



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
		"temperature": int, // 따뜻한 정도 (낮을수록 시원) 1~ 100 50 중간값
		"darkness": int, // 색상 밝기 정도 (낮을수록 밝음) 1~ 100 50 중간값
	}
}
## 시각화 기준 
- 요약 : 두께 / 색상
    x축 (여름-겨울)
    옷의 두께(thickness): 겨울에는 두꺼운 옷을 입기 때문에 두꺼운 옷일수록 x축의 오른쪽에 위치하게 됩니다. 반대로 여름에는 얇은 옷을 입기 때문에 얇은 옷일수록 x축의 왼쪽에 위치하게 됩니다.
    y축 (봄-가을)
    옷의 색상(color): 봄과 가을에는 다양한 색상의 옷을 입기 때문에 색상에 따라 y축에 위치시킬 수 있습니다. 예를 들어, 파스텔 색상의 옷은 y축의 위쪽에, 어두운 색상의 옷은 y축의 아래쪽에 위치시킬 수 있습니다.


## 실행 매뉴얼 
- 파이썬 버전 : 3.11
### 가상환경 생성, 적용
- python -m venv myvenv
- source myvenv/Scripts/activate
### 필수 패키지 설치
- pip install -r requirements.txt 로 필요한 패키지를 설치해주세요
### main.py run
- main.py 파일을 run 해주세요
