package handlers

import (
	"encoding/json"
	"myapp/internal/app/logic"
	"myapp/internal/pkg/models"
	"net/http"
	"fmt"
)

func RecommendationHandler(w http.ResponseWriter, r *http.Request) {
	
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	var requestData models.RequestData
	fmt.Println(requestData)
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest) 
		fmt.Println(r.Body)
		return
	}

	//같은 옷이 추천되는 문제 해결 필요
	selectedClothes := logic.SelectClothes(requestData.ClothesList, requestData.WeatherInfo)

	var aiRecommendations []models.LogicRecommendation
	for _, rec := range selectedClothes { //3회 반복
		aiRec := models.LogicRecommendation{
			ClothesId: rec.ClothesId,
			RecDate:   rec.RecDate,
		}
		aiRecommendations = append(aiRecommendations, aiRec)
	}

	responseData := models.ResponseData{
		AIRecommend: aiRecommendations,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(responseData)
}
