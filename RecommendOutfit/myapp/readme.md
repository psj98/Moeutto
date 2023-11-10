
# 실행
cmd - myapp 디렉토리에서
```bash
go run main.go
```
명령어 실행

## 특이사항
### Response
- Golang에서는 함수가 명시적으로 값을 "리턴"하지 않아도 됩니다. 대신, http.ResponseWriter에 직접 쓰기를 수행하여 응답을 클라이언트에 전송합니다.
- Go 언어에서 HTTP 핸들러 함수는 일반적으로 http.ResponseWriter 인터페이스와 *http.Request 객체를 매개변수로 받습니다. 
- 핸들러 함수 내에서 http.ResponseWriter를 사용하여 클라이언트에 응답을 보내고, *http.Request 객체에서 클라이언트의 요청 정보를 받아옵니다.
  - 이는 일반적으로 쓰기연산이 호출될때마다 바로 클라이언트에게 데이터를 전송합니다