# 개요 
- 날씨와 계절에 맞는 옷을 추천해줍니다
- 사용자의 옷 정보와 3일간의 날씨를 입력으로 받고 적합한 옷 조합을 추천해줍니다

# 디렉토리 구조
```bash                     
├─fastapi                                     
└─myapp
   ├─cmd
   │  └─myapp
   └─internal
      ├─app
      │  ├─handlers
      │  └─logic
      └─pkg
          ├─models
          └─utils
```
## fast api
### 기술 스택 선정 이유
- 추후 확장성을 고려하여 ML 모델을 서빙하기 좋은 fast api 스켈레톤 코드를 작성하였습니다.

## myapp
### 기술 스택 선정 이유
- 가벼운 알고리즘으로 구성된 본 서버에 빠른 실행 속도를 가진 Go 언어가 적합하다고 생각되어 Go 언어로 구현하였습니다
- 명시적인 코드를 작성하고 Go 언어의 장점을 살리고자 다음 프로젝트의 구조를 참조하였습니다
  - https://github.com/golang-standards/project-layout

### cmd
- 주요 실행 코드인 main.go가 위치해있습니다
### internal
- app
  - 응답을 처리하고 로직을 호출하는 handler와 주요 알고리즘을 포함한 logic이 위치해있습니다
- pkg
  - 요청, 응답 데이터의 구조를 명시한 model이 위치하고 있습니다