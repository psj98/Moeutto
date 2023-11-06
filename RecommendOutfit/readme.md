# 착장 조합 추천

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