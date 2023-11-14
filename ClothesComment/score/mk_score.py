from datetime import datetime
def get_temp_weather(): # 8 4 2 1
    # 3 4 5 / 6 7 8 / 9 10 11 / 12 1 2
    temp_month = datetime.now().month  # 현재 월 가져오기
    if temp_month > 8:
        if temp_month > 11:
            return 1
        else:
            return 2
    else:
        if temp_month < 6:
            if temp_month < 3:
                return 4
            else:
                return 8
        else:
            return 4
def calculate_temperature_score(thickness, min_temp, max_temp):
    avg_temp = (min_temp + max_temp) / 2

    # 이상적인 두께 설정
    if avg_temp < 0:
        ideal_thickness = 3
    elif 0 <= avg_temp <= 15:
        ideal_thickness = 2
    else:
        ideal_thickness = 1

    # 온도 적합성 점수 계산
    # 두께 차이가 0이면 만점(60점), 차이가 1이면 20점 감점, 차이가 2이면 40점 감점
    score = max(0, 60 - 20 * abs(thickness - ideal_thickness))
    return score


# season 1 2 3 4 봄 여름 가을 겨울
def calculate_season_score(season = "1111", current_season = 1):
    # 계절이 일치하면 만점(40점), 일치하지 않으면 0점
    # season : 1111
    int_season =1
    try:
        int_season = int(season)
    except:
        print("season must be int")

    if (int_season & current_season) > 1:
        score = 40
    else:
        score = 0
    return score


def calculate_total_score(thickness, min_temp, max_temp, season):
    # 각 점수 계산
    # 1 2 3 4 봄 여름 가을 겨울
    current_season = get_temp_weather()
    temp_score = calculate_temperature_score(thickness, min_temp, max_temp)
    season_score = calculate_season_score(season, current_season)

    total_score = temp_score + season_score

    return total_score