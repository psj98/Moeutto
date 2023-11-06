# 착장 조합 추천

## 개요 
- 날씨 정보를 기반으로 3일 간의 옷을 추천
- 



## 입출력 포맷
back to python

```shell
{
	// 대분류 카테고리 별 옷 목록
	"clothesList": {
		"outer": [
			{
				"clothesId": int,
				"season": String,
				"color": String,
				"thickness": int,
				"textile": String,
				"frequency": int,
			}, ...
		],
		"top": [
			{
				"clothesId": int,
				"season": String,
				"color": String,
				"thickness": int,
				"textile": String,
				"frequency": int,
			}, ...
		],
		"bottom": [
			{
				"clothesId": int,
				"season": String,
				"color": String,
				"thickness": int,
				"textile": String,
				"frequency": int,
			}, ...
		],
		"item": [
			{
				"clothesId": int,
				"season": String,
				"color": String,
				"thickness": int,
				"textile": String,
				"frequency": int,
			}, ...
		]
	},
	// 3일 간 날씨 정보
	"weatherInfo": [
		{
			"date": String, // 날짜
			// 날씨 정보
		}, ...
	]
}



```
날씨 정보는 기온만 사용
		"tmn": double, // 일 최저 기온
		"tmx": double, // 일 최고 기온
(옷에 기온 외에 정보가 없음)



python to back
```shell
{
	"aiRecommend": [
		{
			"clothesId": [
				"id": int, ...
			],
			"recDate": Date,
		}, ...
	]
}

```