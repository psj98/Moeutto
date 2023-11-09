
# 실행
```bash
go build -o myapp
./myapp
```

## 특이사항
### Response
- Golang에서는 함수가 명시적으로 값을 "리턴"하지 않아도 됩니다. 대신, http.ResponseWriter에 직접 쓰기를 수행하여 응답을 클라이언트에 전송합니다.
- Go 언어에서 HTTP 핸들러 함수는 일반적으로 http.ResponseWriter 인터페이스와 *http.Request 객체를 매개변수로 받습니다. 
- 핸들러 함수 내에서 http.ResponseWriter를 사용하여 클라이언트에 응답을 보내고, *http.Request 객체에서 클라이언트의 요청 정보를 받아옵니다.
  - 이는 일반적으로 쓰기연산이 호출될때마다 바로 클라이언트에게 데이터를 전송합니다

## 예시 데이터

### request
```
{
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
	"weatherInfo": [
		{
			"date": String, // 날짜
			"tmx": float //최고 온도
		  "tmn": float //최저 온도
	    "wsd": float  // 풍속
			// 날씨 정보
		}, ...
	]
}
```

### response

```
{
  "aiRecommend": [
    {
      "clothesId": [1, 2, 3, 4], // 순서대로 outer, top, bottom, item에 해당
      "recDate": "2023-11-08"    // 오늘 날짜
    },
    {
      "clothesId": [5, 6, 7, 8], // 순서대로 outer, top, bottom, item에 해당
      "recDate": "2023-11-09"    // 내일 날짜
    },
    {
      "clothesId": [9, 10, 11, 12], // 순서대로 outer, top, bottom, item에 해당
      "recDate": "2023-11-10"       // 모레 날짜
    }
  ]
}
```