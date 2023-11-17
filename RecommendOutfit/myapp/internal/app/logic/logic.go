package logic

import (
	"myapp/internal/pkg/models"
	"sort"
	"strconv"
	"time"
)

// SelectClothes - 날씨 정보와 옷 목록을 바탕으로 최적의 옷을 선택하여 추천 결과를 생성합니다.
func SelectClothes(clothesList models.ClothesList, weatherInfos []models.WeatherInfo) []models.LogicRecommendation {
	var recommendations []models.LogicRecommendation
	yesterdayRecommended := make(map[int]bool)
	dayBeforeYesterdayRecommended := make(map[int]bool)

	for _, weather := range weatherInfos {
		recommendation := models.LogicRecommendation{
			ClothesId: []int{},
			RecDate:   weather.Date,
		}

		// 각 카테고리별로 최적의 옷을 선택합니다.
		for _, category := range [][]models.Clothes{clothesList.Outer, clothesList.Top, clothesList.Bottom, clothesList.Item} {
			selectedClothId := selectBestCloth(category, weather, yesterdayRecommended, dayBeforeYesterdayRecommended)
			recommendation.ClothesId = append(recommendation.ClothesId, selectedClothId)
		}

		// 어제와 그제 추천된 아이템을 업데이트합니다.
		updateRecentlyRecommended(&yesterdayRecommended, &dayBeforeYesterdayRecommended, recommendation.ClothesId)

		recommendations = append(recommendations, recommendation)
	}

	return recommendations
}

// selectBestCloth - 특정 카테고리의 옷 중에서 날씨와 최근 사용 정보를 바탕으로 최적의 옷을 선택합니다.
func selectBestCloth(clothes []models.Clothes, weather models.WeatherInfo, yesterdayRecommended map[int]bool, coupledaysagoRecommended map[int]bool) int {
	if len(clothes) == 0 {
		return -1 // 해당 카테고리에 옷이 없는 경우
	}

	// 옷을 점수에 따라 정렬합니다.
	sort.SliceStable(clothes, func(i, j int) bool {
		return scoreClothingItem(clothes[i], weather, yesterdayRecommended, coupledaysagoRecommended) > scoreClothingItem(clothes[j], weather, yesterdayRecommended, coupledaysagoRecommended)
	})

	return clothes[0].ClothesId
}

// scoreClothingItem - 날씨, 착용 빈도, 최근 사용 여부에 따라 각 옷에 점수를 매깁니다.
func scoreClothingItem(cloth models.Clothes, weather models.WeatherInfo, yesterdayRecommended map[int]bool, coupledaysagoRecommended map[int]bool) int {
	score := 0

	// 계절에 부합하는지 확인
	if isSeasonMatch(cloth.Season, determineSeason(weather)) {
		score += 20
	}

	// 온도 적합성에 따라 점수를 조정
	avgTemp := (weather.Tmx + weather.Tmn) / 2
	switch {
	case avgTemp >= 20 && cloth.Thickness == 1:
		score += 15
	case avgTemp < 20 && avgTemp >= 10 && cloth.Thickness == 2:
		score += 15
	case avgTemp < 10 && cloth.Thickness == 3:
		score += 15
	}

	// 착용 빈도에 따라 점수 조정 (적게 착용할수록 높은 점수)
	score += max(0, 10-cloth.Frequency)

	// 어제와 그제 추천된 아이템에 따라 점수를 감점합니다.
	if yesterdayRecommended[cloth.ClothesId] {
		score -= 60 // 어제 추천된 경우 더 큰 점수 감점
	} else if coupledaysagoRecommended[cloth.ClothesId] {
		score -= 30 // 그제 추천된 경우 작은 점수 감점
	}

	return score
}

// updateRecentlyRecommended - 어제와 그제 추천된 아이템을 업데이트합니다.
func updateRecentlyRecommended(yesterdayRecommended *map[int]bool, dayBeforeYesterdayRecommended *map[int]bool, todayRecommended []int) {
	// 그제 추천된 아이템을 초기화합니다.
	*dayBeforeYesterdayRecommended = *yesterdayRecommended

	// 어제 추천된 아이템을 오늘 추천된 아이템으로 업데이트합니다.
	*yesterdayRecommended = make(map[int]bool)
	for _, id := range todayRecommended {
		(*yesterdayRecommended)[id] = true
	}
}

// isSeasonMatch - 옷의 계절 정보와 결정된 계절이 일치하는지 확인합니다.
func isSeasonMatch(clothesSeason, currentSeason string) bool {
	clothesSeasonBits, _ := strconv.ParseInt(clothesSeason, 2, 64)
	currentSeasonBits, _ := strconv.ParseInt(currentSeason, 2, 64)

	return (clothesSeasonBits & currentSeasonBits) > 0
}

// determineSeason - 날씨 정보를 바탕으로 계절을 결정합니다.
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

// daysSince - 주어진 날짜로부터 경과한 일 수를 계산합니다. 여기서 '오늘'은 입력받은 WeatherInfo의 날짜를 사용합니다.
func daysSince(dateStr string, todayStr string) int {
	today, _ := time.Parse("2006-01-02", todayStr)
	pastDate, _ := time.Parse("2006-01-02", dateStr)
	return int(today.Sub(pastDate).Hours() / 24)
}

//
//// max - 두 정수 중 더 큰 값을 반환합니다.
//func max(a, b int) int {
//	if a > b {
//		return a
//	}
//	return b
//}
