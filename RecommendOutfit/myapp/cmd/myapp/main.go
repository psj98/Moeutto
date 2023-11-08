package main

import (
	"log"
	"myapp/internal/app/handlers"
	"net/http"
)

func main() {
	http.HandleFunc("/recommend", handlers.RecommendationHandler)

	log.Println("Starting server on port 9000...")
	if err := http.ListenAndServe(":9000", nil); err != nil {
		log.Fatal(err)
	}
}
