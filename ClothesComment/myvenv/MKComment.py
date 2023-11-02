# 점수 1~100, 코멘트 10~20 글자

"""
[response format]
clothesId : int
result : ""
fitnessNum : int 1~100
"""


# res : outer, top bottom item 4개 각각 result fitnessNum

# 각 아이템 리스트 전부 값 받아오거나 스트링 받아와도 됨
def mk_comment():
    # test용 init
    ret = {
        'outer':[{'result':"아우터 굿", 'fitnessNum' : 100}],
        'top': [{'result': "탑 굿", 'fitnessNum': 80}],
        'bottom': [{'result': "바텀 쏘쏘", 'fitnessNum': 30}],
        'item': [{'result': "아이템 배드", 'fitnessNum': 10}],
    }

    # 실제 코멘트 생성 로직 구현 필요





    return ret



if __name__ == "__main__":

    print("")