## 추천 시스템 계획

## resource
- 현재_옷장의 모든 옷들을 input으로 받음
    - 매 번 임베딩, overhead  
- vector store에 접근 가능하면 usr id만 알아도 모든 옷에 접근 가능합니다
## 개선 사항
- 등록에서 vector store에 올리고 
- usr id request로 받고 해당하는 usr 옷장에서 검색
- 그럼 유저별로 구분된 chroma vector store가 가능한지 찾기 
    -> 유저 id별로 (파일이름에 usr ID를 포함시켜)vector store 구성
    -> 각 usr의 vector을 database에 저장
## 메인 아이디어
- 최대점수 feature를 만들고 (ideal_clothes)
- 유사한 (L2거리가 가까운) 옷들을 5개 반환 (최근 1일 이내 착용 고려)
### 장점 
- 확장 가능 

## feature
- 색상 < 계절별로 추천되는 색상 찾아서 적용(등록에서 받은 색상 template 반영)
- 옷의 두께 < 온도 반영
- 옷의 재질 < 등록한 옷들 중 가장 많은 재질

## 세부 아이디어
- 수치화된 추천 점수 정렬한 후, 상위 5개 리스트 제공
- 이 5개에 frequency 반영 (많을수록 최대 10점(var f_man) up)

```
    f_man = int(frequency /10 )
    if f_man> 10 :
    f_man = 10
    
    fin_score = L2_distance + f_man
    
    // fin_score 순으로 정렬
    
    //recent_date가 최근 1일 이내라면 생략하고
    //높은 순으로 1, 2 3 > list에 담기
    recommend_outer_list = []
    //...
    
    
    recommend_list = [
    recommend_outer_list,
    ...
    ]
    
    return recommend_list
```