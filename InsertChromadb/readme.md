- python 3.9.13

# 진행 상황 
- 안 쓸수도 있음 
- 인자 2개로 추천하기에는 기능적으로 아쉬워서 최대한 정교한(기능적으로 우수한)
# 개요
- Java에서 chromaDB에 손쉽게 insert하기 위한 micro server
- vector > mongoDB atlas에 저장

# 구현 방법
- color, thickness
- 세가지 feature 유사도 측정해서 점수 변환 

- in memory - chromadb

- 요소가 이것만 있으면 굳이 임베딩 할 필요가 없음 -> 단순 수식으로 
- r g b (0 ~ 255)
- (1 ~ 3) 

# 고민중
