package logic

import (
	"math/rand"
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

		// 카테고리별 옷 선택
		recommendation.ClothesId = append(recommendation.ClothesId, selectClothForCategory(clothesList.Outer, weather))
		recommendation.ClothesId = append(recommendation.ClothesId, selectClothForCategory(clothesList.Top, weather))
		recommendation.ClothesId = append(recommendation.ClothesId, selectClothForCategory(clothesList.Bottom, weather))
		recommendation.ClothesId = append(recommendation.ClothesId, selectClothForCategory(clothesList.Item, weather))

		recommendations = append(recommendations, recommendation)

	}

	return recommendations
}

// selectClothForCategory - 특정 카테고리의 옷 중에서 최적의 옷을 선택
func selectClothForCategory(clothes []models.Clothes, weather models.WeatherInfo) int {
	suitableClothes := filterByWeather(clothes, weather)
	sortByFrequencyAndDiversity(&suitableClothes)
	demoteRecentlyWornClothes(&suitableClothes, 3)

	// 모든 옷이 최근에 착용되었다면, 첫 번째 옷을 반환
	if len(suitableClothes) == 0 && len(clothes) > 0 {
		return clothes[0].ClothesId
	}

	if len(suitableClothes) > 0 {
		return suitableClothes[0].ClothesId
	}

	return -1
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

// sortByFrequencyAndDiversity - 착용 횟수와 다양성을 고려하여 옷을 정렬
func sortByFrequencyAndDiversity(clothes *[]models.Clothes) {
	rand.Seed(time.Now().UnixNano())
	sort.SliceStable(*clothes, func(i, j int) bool {
		if (*clothes)[i].Frequency == (*clothes)[j].Frequency {
			return rand.Intn(2) == 0 // 동일한 빈도일 때는 무작위로 선택
		}
		return (*clothes)[i].Frequency > (*clothes)[j].Frequency
	})
}

// demoteRecentlyWornClothes - 최근에 착용한 옷을 리스트의 뒤로 이동
func demoteRecentlyWornClothes(clothes *[]models.Clothes, days int) {
	today := time.Now()
	for i := 0; i < len(*clothes); i++ {
		clothDate, _ := time.Parse("2006-01-02", (*clothes)[i].RecentDate)
		if today.Sub(clothDate).Hours() < float64(days*24) {
			// 최근에 착용한 옷은 리스트 뒤로 이동
			*clothes = append(*clothes, (*clothes)[i])
			*clothes = append((*clothes)[:i], (*clothes)[i+1:]...)
			i-- // 다음 옷을 확인하기 위해 인덱스 조정
		}
	}
}
