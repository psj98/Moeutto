package handlers

import (
	"encoding/json"
	"myapp/internal/app/logic"
	"myapp/internal/pkg/models"
	"net/http"
)

func RecommendationHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	var requestData models.RequestData
	if err := json.NewDecoder(r.Body).Decode(&requestData); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	recommendations, err := logic.GenerateRecommendations(requestData)
	if err != nil {
		http.Error(w, "Error processing request", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(recommendations)
}
