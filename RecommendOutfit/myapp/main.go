package main

import (
	"encoding/json"
	"log"
	"net/http"
	"time"
)

// Define the structures
type ClothesItem struct {
	ClothesID int    `json:"clothesId"`
	Season    string `json:"season"`
	Color     string `json:"color"`
	Thickness int    `json:"thickness"`
	Textile   string `json:"textile"`
	Frequency int    `json:"frequency"`
}

type WeatherInfo struct {
	Date string  `json:"date"`
	Tmx  float64 `json:"tmx"`
	Tmn  float64 `json:"tmn"`
	Wsd  float64 `json:"wsd"`
}

type ClothesList struct {
	Outer  []ClothesItem `json:"outer"`
	Top    []ClothesItem `json:"top"`
	Bottom []ClothesItem `json:"bottom"`
	Item   []ClothesItem `json:"item"`
}

type AIRecommendation struct {
	ClothesID []int  `json:"clothesId"`
	RecDate   string `json:"recDate"`
}

type GoResponse struct {
	ClothesList ClothesList   `json:"clothesList"`
	WeatherInfo []WeatherInfo `json:"weatherInfo"`
}

type BackToGo struct {
	AIRecommend []AIRecommendation `json:"aiRecommend"`
}

// Handler for the Web API
func apiHandler(w http.ResponseWriter, r *http.Request) {
	// 요청 메서드가 POST가 아니면 클라이언트에 에러를 반환합니다.
	if r.Method != http.MethodPost {
		http.Error(w, "Only POST method is accepted", http.StatusMethodNotAllowed)
		return
	}

	// GoResponse 구조체를 초기화합니다.
	var goResp GoResponse

	// r.Body로부터 JSON을 읽어서 GoResponse 구조체에 Decode합니다.
	err := json.NewDecoder(r.Body).Decode(&goResp)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	//수정해야 하는 코드
	//GoResponse를 처리하여 BackToGo 응답을 생성하는 로직을 추가 필요
	aiRec := BackToGo{
		AIRecommend: []AIRecommendation{
			{
				ClothesID: []int{1, 2, 3},
				RecDate:   time.Now().Format(time.RFC3339),
			},
		},
	}

	// BackToGo 구조체를 JSON으로 인코딩하여 응답으로 사용
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(aiRec)
}

func main() {
	http.HandleFunc("/api", apiHandler)
	log.Fatal(http.ListenAndServe(":9000", nil))
}
