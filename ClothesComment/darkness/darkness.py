from .color_vo import Color
from .color_list import colors_data
# 점수 1~100, 코멘트 10~20 글자

"""
[response format]

"""
# "1A" 와 같은 두자리 hex 값을 int로 변환합니다
def get_color_num(color_hex):
    # color_hex : "FF"
    color_hex_str = "0X"+color_hex
    try:
        int_value = int(color_hex_str, 16)
    except:
        print("get_color_num error ERROR CODE : KJG_COLOR_NUM")
        return 255
    return int_value

# "2A3B2F"와 같은 6자리 str hex로부터 명암을 계산합니다
def calculate_darkness(color): # 만점 100
    # hex 값에서 r g b 분리
    red = get_color_num(color[0:2])
    blue = get_color_num(color[2:4])
    green = get_color_num(color[4:6])

    ret = (red*0.3+blue*0.6+green*0.1)
    ret = int(ret*100/255)
    return ret
# RGB(6자리/str/hex)리스트를 받아와서 명암으로 변환 후 리턴합니다
# 모든 옷의 명암을 고려한 값 return
def get_darkness(item_colors , jg_empty):# color[] , 0/1[]
    ret = 0
    weights = [0.196,0.098,0.065,0.032]
    # colors = [item_colors.outer, item_colors.top, item_colors.bottom, item_colors.item]
    # item colors -> 0/1, 컬러 0-> 무시
    count_color=0
    for idx, i in enumerate(item_colors):
        if jg_empty[idx] == 0:
            continue
        count_color = count_color+1
        try:
            color_hex = colors_data[i]
        except:
            print("get_darkness error ERROR CODE : KJG_COLOR_HEX")
            color_hex = "FFFFFF"
        color_int = calculate_darkness(color_hex)
        ret += weights[idx] * color_int
    # colors : str
    ret = 100-int(ret/count_color)

    if ret < 0 or ret > 100:
        # unexpected value
        print("unexpected value : darkness ")
        ret = 50

    return ret

if __name__ == "__main__":
    print("main start")


    print("main end")