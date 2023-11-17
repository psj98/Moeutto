## pre logic
```go
package logic

import (
	"myapp/internal/pkg/models"
	"sort"
	"strconv"
	"time"
)

// SelectClothes - 날씨 정보와 옷 목록을 바탕으로 최적의 옷을 선택하여 추천 결과를 생성
func SelectClothes(clothesList models.ClothesList, weatherInfos []models.WeatherInfo) []models.LogicRecommendation {
	var recommendations []models.LogicRecommendation

	for _, weather := range weatherInfos {
		recommendation := models.LogicRecommendation{
			ClothesId: []int{},
			RecDate:   weather.Date,
		}

		outerClothesId, outerIndex := selectClothForCategory(clothesList.Outer, weather)
		topClothesId, topIndex := selectClothForCategory(clothesList.Top, weather)
		bottomClothesId, bottomIndex := selectClothForCategory(clothesList.Bottom, weather)
		itemClothesId, itemIndex := selectClothForCategory(clothesList.Item, weather)

		recommendation.ClothesId = append(recommendation.ClothesId, outerClothesId, topClothesId, bottomClothesId, itemClothesId)

		// 각 카테고리별로 ClothesId에 해당하는 옷의 빈도와 최근 착용 날짜 업데이트
		updateClothesUsage(&clothesList, []int{outerIndex, topIndex, bottomIndex, itemIndex}, weather.Date)

		recommendations = append(recommendations, recommendation)
	}

	return recommendations
}

// selectClothForCategory - 특정 카테고리의 옷 중에서 최적의 옷을 선택
func selectClothForCategory(clothes []models.Clothes, weather models.WeatherInfo) (int, int) {
	// 현재 날짜 구하기
	currentTime, _ := time.Parse("2006-01-02", weather.Date)
	yesterday := currentTime.AddDate(0, 0, -1).Format("2006-01-02")
	dayBeforeYesterday := currentTime.AddDate(0, 0, -2).Format("2006-01-02") // 2일 전 날짜 추가

	// 착용 횟수, 최근 착용 날짜, 계절 고려 정렬
	sort.SliceStable(clothes, func(i, j int) bool {
		// 계절 부합성 확인
		isSeasonMatchI := isSeasonMatch(clothes[i].Season, determineSeason(weather)) //bool
		isSeasonMatchJ := isSeasonMatch(clothes[j].Season, determineSeason(weather)) //bool

		// 최근 착용 날짜 확인
		recentWornI := clothes[i].RecentDate == weather.Date || clothes[i].RecentDate == yesterday || clothes[i].RecentDate == dayBeforeYesterday
		recentWornJ := clothes[j].RecentDate == weather.Date || clothes[j].RecentDate == yesterday || clothes[j].RecentDate == dayBeforeYesterday

		// 착용 횟수 확인
		frequentWornI := clothes[i].Frequency >= 30
		frequentWornJ := clothes[j].Frequency >= 30

		// 조건별 우선 순위 결정
		if frequentWornI != frequentWornJ {
			return !frequentWornI // 착용 횟수가 30회 미만인 옷 우선
		} else if recentWornI != recentWornJ {
			return !recentWornI // 최근에 착용하지 않은 옷 우선
		} else if isSeasonMatchI != isSeasonMatchJ {
			return isSeasonMatchI // 계절에 맞는 옷 우선
		} else {
			return clothes[i].Frequency > clothes[j].Frequency // 나머지 경우 착용 횟수가 많은 옷 우선
		}
	})

	// 최적의 옷 선택
	if len(clothes) > 0 {
		return clothes[0].ClothesId, 0
	}

	return -1, -1
}

// updateClothesUsage - 옷의 사용 정보 업데이트
func updateClothesUsage(clothesList *models.ClothesList, indices []int, date string) {
	categories := []*[]models.Clothes{&clothesList.Outer, &clothesList.Top, &clothesList.Bottom, &clothesList.Item}
	for i, index := range indices {
		if index != -1 {
			category := categories[i]
			(*category)[index].Frequency++
			(*category)[index].RecentDate = date
		}
	}
}

// filterByWeather - 날씨 조건에 맞는 옷을 필터링
func filterByWeather(clothes []models.Clothes, weather models.WeatherInfo) []models.Clothes {
	var filtered []models.Clothes
	for _, cloth := range clothes {
		if isSuitableForWeather(cloth, weather) {
			filtered = append(filtered, cloth)
		}
	}
	return filtered
}

// isSuitableForWeather - 날씨 조건에 따라 적합한 옷을 판별
func isSuitableForWeather(cloth models.Clothes, weather models.WeatherInfo) bool {
	season := determineSeason(weather)
	return isSeasonMatch(cloth.Season, season) && isThicknessSuitable(cloth.Thickness, weather)
}

// determineSeason - 날씨 정보를 바탕으로 계절을 결정
func determineSeason(weather models.WeatherInfo) string {
	date, _ := time.Parse("2006-01-02", weather.Date)
	month := date.Month()

	switch {
	case month >= 3 && month <= 5:
		return "1000" // 봄
	case month >= 6 && month <= 8:
		return "0100" // 여름
	case month >= 9 && month <= 11:
		return "0010" // 가을
	default:
		return "0001" // 겨울
	}
}

// isSeasonMatch - 옷의 계절 정보와 결정된 계절이 일치하는지 확인
func isSeasonMatch(clothesSeason, currentSeason string) bool {
	clothesSeasonBits, _ := strconv.ParseInt(clothesSeason, 2, 64)
	currentSeasonBits, _ := strconv.ParseInt(currentSeason, 2, 64)

	return (clothesSeasonBits & currentSeasonBits) > 0
}

// isThicknessSuitable - 옷의 두께가 현재 날씨 조건에 적합한지 판별
func isThicknessSuitable(thickness int, weather models.WeatherInfo) bool {
	avgTemp := (weather.Tmx + weather.Tmn) / 2

	switch {
	case avgTemp >= 20:
		return thickness <= 1 // 더운 날씨에는 얇은 옷
	case avgTemp >= 10:
		return thickness <= 2 // 중간 날씨에는 중간 두께
	default:
		return thickness >= 3 // 추운 날씨에는 두꺼운 옷
	}
}

```