package main

import (
	"fmt"
	"log"
	"myapp/internal/app/handlers"
	"net/http"
)

func jinguHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Only GET method is accepted", http.StatusMethodNotAllowed)
		return
	}

	// "jingu" 문자열을 반환
	fmt.Fprint(w, "jingu")
}

func main() {

	http.HandleFunc("/recommend", handlers.RecommendationHandler)
	http.HandleFunc("/kwon", jinguHandler) // "/kwon" 경로에 대한 핸들러 추가

	log.Println("Starting server on port 9000...")
	if err := http.ListenAndServe(":9000", nil); err != nil {
		log.Fatal(err)
	}
}
