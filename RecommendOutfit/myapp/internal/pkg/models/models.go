package models

// Clothes 구조체는 개별 옷에 대한 정보를 담습니다.
type Clothes struct {
	ClothesId  int    `json:"clothesId"`
	Season     string `json:"season"`
	Color      string `json:"color"`
	Thickness  int    `json:"thickness"`
	Textile    string `json:"textile"`
	Frequency  int    `json:"frequency"`
	RecentDate string `json:"recentDate"` // 최근 착용 날짜
}

// ClothesList 구조체는 옷의 카테고리별로 그룹화된 리스트를 담습니다.
type ClothesList struct {
	Outer  []Clothes `json:"outer"`
	Top    []Clothes `json:"top"`
	Bottom []Clothes `json:"bottom"`
	Item   []Clothes `json:"item"`
}

// WeatherInfo 구조체는 날씨 정보를 담습니다.
type WeatherInfo struct {
	Date string  `json:"date"` // 날짜는 YYYY-MM-DD 형식의 문자열로 가정합니다.
	Tmx  float64 `json:"tmx"`  // 최고 온도
	Tmn  float64 `json:"tmn"`  // 최저 온도
	Wsd  float64 `json:"wsd"`  // 풍속
}

// RequestData 구조체는 클라이언트로부터 받은 요청 데이터를 나타냅니다.
type RequestData struct {
	ClothesList ClothesList   `json:"clothesList"`
	WeatherInfo []WeatherInfo `json:"weatherInfo"` // 3일간의 날씨 정보를 담는 배열
}

// LogicRecommendation 구조체는 하루에 대한 옷 추천 정보를 담습니다.
type LogicRecommendation struct {
	ClothesId []int  `json:"clothesId"` // 순서대로 outer, top, bottom, item에 해당
	RecDate   string `json:"recDate"`   // 추천 날짜
}

// ResponseData 구조체는 클라이언트에게 보낼 응답 데이터를 나타냅니다.
type ResponseData struct {
	AIRecommend []LogicRecommendation `json:"aiRecommend"` // 3일간의 옷 추천 정보
}
