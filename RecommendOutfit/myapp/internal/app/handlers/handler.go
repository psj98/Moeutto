package handlers

import (
	"encoding/json"
	"fmt"
	"myapp/internal/app/logic"
	"myapp/internal/pkg/models"
	"net/http"
)

func RecommendationHandler(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "text/plain; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Max-Age", "10")

	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	var requestData models.RequestData
	fmt.Println(requestData)
	fmt.Println("콘텐츠 타입 : ", r.Header.Get("Content-Type"))
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
