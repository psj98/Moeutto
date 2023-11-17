package logic

import (
	"myapp/internal/pkg/models"
	"sort"
	"strconv"
	"time"
)

func SelectClothes(clothesList models.ClothesList, weatherInfos []models.WeatherInfo) []models.LogicRecommendation {
	var recommendations []models.LogicRecommendation
	yesterdayRecommended := make(map[int]bool)
	dayBeforeYesterdayRecommended := make(map[int]bool)

	for _, weather := range weatherInfos {
		recommendation := models.LogicRecommendation{
			ClothesId: []int{},
			RecDate:   weather.Date,
		}

		for _, category := range [][]models.Clothes{clothesList.Outer, clothesList.Top, clothesList.Bottom, clothesList.Item} {
			selectedClothId := selectBestCloth(category, weather, yesterdayRecommended, dayBeforeYesterdayRecommended)
			recommendation.ClothesId = append(recommendation.ClothesId, selectedClothId)
		}

		recommendations = append(recommendations, recommendation)

		updateRecentlyRecommended(&yesterdayRecommended, &dayBeforeYesterdayRecommended, recommendation.ClothesId)
	}

	return recommendations
}

func selectBestCloth(clothes []models.Clothes, weather models.WeatherInfo, yesterdayRecommended map[int]bool, dayBeforeYesterdayRecommended map[int]bool) int {
	if len(clothes) == 0 {
		return -1
	}

	sort.SliceStable(clothes, func(i, j int) bool {
		return scoreClothingItem(clothes[i], weather, yesterdayRecommended, dayBeforeYesterdayRecommended) > scoreClothingItem(clothes[j], weather, yesterdayRecommended, dayBeforeYesterdayRecommended)
	})

	return clothes[0].ClothesId
}

func scoreClothingItem(cloth models.Clothes, weather models.WeatherInfo, yesterdayRecommended map[int]bool, dayBeforeYesterdayRecommended map[int]bool) int {
	score := 0

	if isSeasonMatch(cloth.Season, determineSeason(weather)) {
		score += 20
	}

	avgTemp := (weather.Tmx + weather.Tmn) / 2
	switch {
	case avgTemp >= 20 && cloth.Thickness == 1:
		score += 15
	case avgTemp < 20 && avgTemp >= 10 && cloth.Thickness == 2:
		score += 15
	case avgTemp < 10 && cloth.Thickness == 3:
		score += 15
	}

	score += max(0, 10-cloth.Frequency)

	if yesterdayRecommended[cloth.ClothesId] {
		score -= 60
	} else if dayBeforeYesterdayRecommended[cloth.ClothesId] {
		score -= 35
	}

	return score
}

func updateRecentlyRecommended(yesterdayRecommended *map[int]bool, dayBeforeYesterdayRecommended *map[int]bool, todayRecommended []int) {
	*dayBeforeYesterdayRecommended = *yesterdayRecommended

	*yesterdayRecommended = make(map[int]bool)
	for _, id := range todayRecommended {
		(*yesterdayRecommended)[id] = true
	}
}

func isSeasonMatch(clothesSeason, currentSeason string) bool {
	clothesSeasonBits, _ := strconv.ParseInt(clothesSeason, 2, 64)
	currentSeasonBits, _ := strconv.ParseInt(currentSeason, 2, 64)
	return (clothesSeasonBits & currentSeasonBits) > 0
}

func determineSeason(weather models.WeatherInfo) string {
	date, _ := time.Parse("2006-01-02", weather.Date)
	month := date.Month()
	switch {
	case month >= 3 && month <= 5:
		return "1000"
	case month >= 6 && month <= 8:
		return "0100"
	case month >= 9 && month <= 11:
		return "0010"
	default:
		return "0001"
	}
}
