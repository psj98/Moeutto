package main

import (
	"bytes"
	"encoding/json"
	"myapp/internal/app/handlers"
	"net/http"
	"net/http/httptest"
	"reflect"
	"testing"
)

// TestRecommendationHandler 테스트 함수
func TestRecommendationHandler(t *testing.T) {
	// JSON 요청 데이터
	requestData := map[string]interface{}{
		"clothesList": map[string]interface{}{
			// 옷 목록 데이터
			"outer": []map[string]interface{}{
				{"clothesId": 1, "season": "1000", "color": "Red", "thickness": 3, "textile": "Wool", "frequency": 5, "recentDate": "2023-11-01"},
				{"clothesId": 2, "season": "0100", "color": "Blue", "thickness": 1, "textile": "Cotton", "frequency": 2, "recentDate": "2023-10-25"},
				{"clothesId": 3, "season": "0010", "color": "Green", "thickness": 2, "textile": "Linen", "frequency": 4, "recentDate": "2023-10-20"},
				{"clothesId": 4, "season": "0001", "color": "Black", "thickness": 3, "textile": "Leather", "frequency": 1, "recentDate": "2023-10-10"},
				{"clothesId": 5, "season": "1001", "color": "White", "thickness": 3, "textile": "Fur", "frequency": 3, "recentDate": "2023-09-15"},
				{"clothesId": 6, "season": "0110", "color": "Yellow", "thickness": 2, "textile": "Synthetic", "frequency": 7, "recentDate": "2023-08-30"},
				{"clothesId": 7, "season": "1111", "color": "Purple", "thickness": 1, "textile": "Silk", "frequency": 6, "recentDate": "2023-08-01"},
			},
			"top": []map[string]interface{}{
				{"clothesId": 8, "season": "1000", "color": "Red", "thickness": 3, "textile": "Wool", "frequency": 5, "recentDate": "2023-11-01"},
				{"clothesId": 9, "season": "0100", "color": "Blue", "thickness": 1, "textile": "Cotton", "frequency": 2, "recentDate": "2023-10-25"},
				{"clothesId": 10, "season": "0010", "color": "Green", "thickness": 2, "textile": "Linen", "frequency": 4, "recentDate": "2023-10-20"},
				{"clothesId": 11, "season": "0001", "color": "Black", "thickness": 3, "textile": "Leather", "frequency": 1, "recentDate": "2023-10-10"},
				{"clothesId": 12, "season": "1001", "color": "White", "thickness": 3, "textile": "Fur", "frequency": 3, "recentDate": "2023-09-15"},
				{"clothesId": 13, "season": "0110", "color": "Yellow", "thickness": 2, "textile": "Synthetic", "frequency": 7, "recentDate": "2023-08-30"},
				{"clothesId": 14, "season": "1111", "color": "Purple", "thickness": 1, "textile": "Silk", "frequency": 6, "recentDate": "2023-08-01"},
			},
			"bottom": []map[string]interface{}{
				{"clothesId": 15, "season": "1000", "color": "Red", "thickness": 3, "textile": "Wool", "frequency": 5, "recentDate": "2023-11-01"},
				{"clothesId": 16, "season": "0100", "color": "Blue", "thickness": 1, "textile": "Cotton", "frequency": 2, "recentDate": "2023-10-25"},
				{"clothesId": 17, "season": "0010", "color": "Green", "thickness": 2, "textile": "Linen", "frequency": 4, "recentDate": "2023-10-20"},
				{"clothesId": 18, "season": "0001", "color": "Black", "thickness": 3, "textile": "Leather", "frequency": 1, "recentDate": "2023-10-10"},
				{"clothesId": 19, "season": "1001", "color": "White", "thickness": 3, "textile": "Fur", "frequency": 3, "recentDate": "2023-09-15"},
				{"clothesId": 20, "season": "0110", "color": "Yellow", "thickness": 2, "textile": "Synthetic", "frequency": 7, "recentDate": "2023-08-30"},
				{"clothesId": 21, "season": "1111", "color": "Purple", "thickness": 1, "textile": "Silk", "frequency": 6, "recentDate": "2023-08-01"},
			},
			"item": []map[string]interface{}{
				{"clothesId": 22, "season": "1000", "color": "Red", "thickness": 3, "textile": "Wool", "frequency": 5, "recentDate": "2023-11-01"},
				{"clothesId": 23, "season": "0100", "color": "Blue", "thickness": 1, "textile": "Cotton", "frequency": 2, "recentDate": "2023-10-25"},
				{"clothesId": 24, "season": "0010", "color": "Green", "thickness": 2, "textile": "Linen", "frequency": 4, "recentDate": "2023-10-20"},
				{"clothesId": 25, "season": "0001", "color": "Black", "thickness": 3, "textile": "Leather", "frequency": 1, "recentDate": "2023-10-10"},
				{"clothesId": 26, "season": "1001", "color": "White", "thickness": 3, "textile": "Fur", "frequency": 3, "recentDate": "2023-09-15"},
				{"clothesId": 27, "season": "0110", "color": "Yellow", "thickness": 2, "textile": "Synthetic", "frequency": 7, "recentDate": "2023-08-30"},
				{"clothesId": 28, "season": "1111", "color": "Purple", "thickness": 1, "textile": "Silk", "frequency": 6, "recentDate": "2023-08-01"},
			},
		},
		"weatherInfo": []map[string]interface{}{
			// 날씨 정보 데이터
			{"date": "2023-11-09", "tmx": 30.0, "tmn": 25.0, "wsd": 2.5},
			{"date": "2023-11-10", "tmx": 28.0, "tmn": 24.0, "wsd": 3.0},
			{"date": "2023-11-11", "tmx": 29.0, "tmn": 23.0, "wsd": 2.0},
		},
	}
	// JSON으로 변환
	jsonData, err := json.Marshal(requestData)
	if err != nil {
		t.Fatalf("Failed to marshal JSON: %v", err)
	}

	// HTTP 요청 생성
	req, err := http.NewRequest("POST", "/recommend", bytes.NewBuffer(jsonData))
	if err != nil {
		t.Fatalf("Could not create request: %v", err)
	}

	// ResponseRecorder를 이용하여 응답을 기록
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(handlers.RecommendationHandler)

	// 핸들러 실행
	handler.ServeHTTP(rr, req)

	// 응답 상태 코드 확인
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("Handler returned wrong status code: got %v want %v", status, http.StatusOK)
	}

	// 응답 본문 확인

	// 실제 응답을 JSON 객체로 Deserialization
	var actual, expected map[string]interface{}

	if err := json.Unmarshal(rr.Body.Bytes(), &actual); err != nil {
		t.Fatalf("Failed to unmarshal actual response: %v", err)
	}

	expectedResponse := `{
    "aiRecommend": [
        {
            "clothesId": [
                6,
                13,
                20,
                27
            ],
            "recDate": "2023-11-09"
        },
        {
            "clothesId": [
                7,
                14,
                21,
                28
            ],
            "recDate": "2023-11-10"
        },
        {
            "clothesId": [
                3,
                10,
                17,
                24
            ],
            "recDate": "2023-11-11"
        }
		]
	}`
	if err := json.Unmarshal([]byte(expectedResponse), &expected); err != nil {
		t.Fatalf("Failed to unmarshal expected response: %v", err)
	}
	if !reflect.DeepEqual(actual, expected) {
		t.Errorf("Response does not match. \nExpected: %v\nGot: %v", expected, actual)
	}
}
