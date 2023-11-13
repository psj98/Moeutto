package logic

import (
	"myapp/internal/pkg/models"
	"testing"
	"time"
)

func TestSelectClothes(t *testing.T) {
	// Create dummy ClothesList
	clothesList := models.ClothesList{
		Outer:  []models.Clothes{{ClothesId: 1, Season: "0011", Thickness: 3, Frequency: 5, RecentDate: "2023-03-01"}},
		Top:    []models.Clothes{{ClothesId: 2, Season: "1100", Thickness: 2, Frequency: 3, RecentDate: "2023-04-01"}},
		Bottom: []models.Clothes{{ClothesId: 3, Season: "0011", Thickness: 1, Frequency: 2, RecentDate: "2023-05-01"}},
		Item:   []models.Clothes{{ClothesId: 4, Season: "0000", Thickness: 1, Frequency: 4, RecentDate: "2023-02-01"}},
	}

	// Create dummy WeatherInfo
	weatherInfos := []models.WeatherInfo{
		{Date: time.Now().Format("2006-01-02"), Tmx: 25.0, Tmn: 15.0, Wsd: 5.0},
		// Add more weather data as needed
	}

	// Call the SelectClothes function
	recommendations := SelectClothes(clothesList, weatherInfos)

	// Assertions to check the correctness of the recommendations
	// Example:
	if len(recommendations) == 0 {
		t.Error("Expected recommendations, got none")
	}
}
