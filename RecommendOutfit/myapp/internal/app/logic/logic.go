package logic

import (
	"myapp/internal/pkg/models"
)

func GenerateRecommendations(data models.RequestData) (models.ResponseData, error) {
	var weeklyRecommendation models.WeeklyRecommendation

	for _, weather := range data.WeatherInfo {
		dailyRecommendation := models.DayRecommendation{
			Date: weather.Date,
			// SelectClothes 함수는 옷과 날씨 정보를 기반으로 적합한 옷을 선택합니다.
			Outer:  SelectClothes(data.ClothesList.Outer, weather),
			Top:    SelectClothes(data.ClothesList.Top, weather),
			Bottom: SelectClothes(data.ClothesList.Bottom, weather),
			Item:   SelectClothes(data.ClothesList.Item, weather),
		}
		weeklyRecommendation.Recommendations = append(weeklyRecommendation.Recommendations, dailyRecommendation)
	}

	return models.ResponseData{Recommendations: weeklyRecommendation}, nil
}

// SelectClothes 함수는 주어진 날씨에 가장 적합한 옷을 선택합니다.
// 여기서는 단순화를 위해 날씨와 옷의 속성에 기반한 간단한 로직을 사용합니다.
func SelectClothes(clothes []models.Clothes, weather models.WeatherInfo) models.Clothes {
	// 여기에 옷을 선택하는 로직을 구현합니다.
	// 예를 들어, 온도에 따라 두께가 적합한 옷을 선택할 수 있습니다.
	selectedClothes := clothes[0] // 임시로 첫 번째 옷을 선택
	// 실제 로직은 더 복잡한 조건을 고려할 것입니다.
	return selectedClothes
}
