package main

import (
	"encoding/json"
	"log"
	"myapp/internal/app/handlers"
	"net/http"
)

func jinguHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	response := map[string][]map[string]interface{}{
		"aiRecommend": {
			{
				"clothesId": []int{83, 104, 100, 87},
				"recDate":   "2023-11-19",
			},
			{
				"clothesId": []int{87, 101, 85, 86},
				"recDate":   "2023-11-20",
			},
			{
				"clothesId": []int{84, 87, 86},
				"recDate":   "2023-11-21",
			},
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func main() {

	http.HandleFunc("/recommend2", handlers.RecommendationHandler)
	http.HandleFunc("/recommend", jinguHandler) // "/kwon" 경로에 대한 핸들러 추가

	log.Println("Starting server on port 9000...")
	if err := http.ListenAndServe(":9000", nil); err != nil {
		log.Fatal(err)
	}
}
