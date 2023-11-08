package handlers

import (
	"encoding/json"
	"myapp/internal/app/logic"
	"myapp/internal/pkg/models"
	"net/http"
)

func RecommendationHandler(w http.ResponseWriter, r *http.Request) {
	//POST가 아닐 경우 ERROR
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	//body of request에서 JSON 데이터를 읽어서 requestData struct로 decoding
	var requestData models.RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	//추천 로직을 호출하고 결과를 받습니다
	recommendations, err := logic.GenerateRecommendations(requestData)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	//response header에 Content-Type을 application/json으로 설정합니다.
	w.Header().Set("Content-Type", "application/json")

	// 생성된 추천 데이터를 JSON으로 인코딩하여 클라이언트에게  response로 반환합니다.
	json.NewEncoder(w).Encode(recommendations)
}
