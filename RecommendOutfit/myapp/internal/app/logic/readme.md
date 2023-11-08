## 추천 시스템 계획
### 메인 아이디어
- 최대점수 feature를 만들고 (ideal_clothes)
- 유사한 (L2거리가 가까운) 옷들을 5개 반환 (최근 1일 이내 착용 고려)

### feature
- 계절 < 지금 계절로
- 색상 < 계절별로 추천되는 색상 찾아서 적용(등록에서 받은 색상 template 반영)
- 옷의 두께 < 계절 , 온도 반영

### 세부 아이디어
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