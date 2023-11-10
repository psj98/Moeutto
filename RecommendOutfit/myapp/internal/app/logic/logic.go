package logic

import (
	"errors"
	"myapp/internal/pkg/models"
	"time"
)

const layout = "2006-01-02" // Go의 날짜 파싱을 위한 레이아웃

// SelectClothes 함수는 주어진 날씨에 가장 적합한 옷을 선택합니다.
func SelectClothes(clothes []models.Clothes, weather models.WeatherInfo) (models.Clothes, error) {
	var selectedClothes models.Clothes
	var latestValidDate time.Time

	for _, c := range clothes {
		parsedDate, err := time.Parse(layout, c.RecentDate)
		if err != nil {
			return selectedClothes, err // 에러 반환
		}

		// 오늘 입은 옷은 제외
		if parsedDate.Before(time.Now().AddDate(0, 0, -1)) {
			// 날짜와 다른 조건들을 고려하여 옷을 선택하는 로직
			// 예: 최근에 입지 않은 옷 중에서 선택
			if latestValidDate.IsZero() || parsedDate.After(latestValidDate) {
				latestValidDate = parsedDate
				selectedClothes = c
			}
		}
	}

	// 선택된 옷이 없다면 에러 반환
	if latestValidDate.IsZero() {
		return selectedClothes, errors.New("적합한 옷을 찾을 수 없습니다")
	}

	return selectedClothes, nil
}

// GenerateRecommendations 함수는 주어진 날씨와 옷 목록을 기반으로 추천을 생성합니다.
func GenerateRecommendations(data models.RequestData) (models.ResponseData, error) {
	var aiRecommendations []models.AIRecommendation

	for _, weather := range data.WeatherInfo {
		// 각 카테고리별로 적합한 옷을 선택합니다.
		outer, err := SelectClothes(data.ClothesList.Outer, weather)
		if err != nil {
			return models.ResponseData{}, err
		}
		top, err := SelectClothes(data.ClothesList.Top, weather)
		if err != nil {
			return models.ResponseData{}, err
		}
		bottom, err := SelectClothes(data.ClothesList.Bottom, weather)
		if err != nil {
			return models.ResponseData{}, err
		}
		item, err := SelectClothes(data.ClothesList.Item, weather)
		if err != nil {
			return models.ResponseData{}, err
		}

		aiRecommendation := models.AIRecommendation{
			RecDate: weather.Date,
			ClothesId: []int{
				outer.ClothesId,
				top.ClothesId,
				bottom.ClothesId,
				item.ClothesId,
			},
		}
		aiRecommendations = append(aiRecommendations, aiRecommendation)
	}

	return models.ResponseData{AIRecommend: aiRecommendations}, nil
}
