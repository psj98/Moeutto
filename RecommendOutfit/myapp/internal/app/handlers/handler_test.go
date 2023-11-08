package handlers

import (
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
)

func TestRecommendationHandlerReturnsBadRequestOnInvalidJSON(t *testing.T) {
	// 잘못된 JSON 데이터를 가진 요청 생성
	req, err := http.NewRequest("POST", "/recommendations", strings.NewReader(`{invalid json}`))
	if err != nil {
		t.Fatal(err)
	}

	// ResponseRecorder를 생성하여 응답을 캡처
	rr := httptest.NewRecorder()
	handler := http.HandlerFunc(RecommendationHandler)

	// 핸들러 함수 호출
	handler.ServeHTTP(rr, req)

	// 예상하는 응답 코드가 맞는지 확인
	if status := rr.Code; status != http.StatusBadRequest {
		t.Errorf("handler returned wrong status code: got %v want %v",
			status, http.StatusBadRequest)
	}

	// 응답 본문이 적절한 에러 메시지를 포함하는지 확인
	// ...
}
