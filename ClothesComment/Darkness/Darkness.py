from ColorDTO import Color

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
def calculate_darkness(color):
    # hex 값에서 r g b 분리
    red = get_color_num(color[0:2])
    blue = get_color_num(color[2:4])
    green = get_color_num(color[4:6])

    ret = (red*0.3+blue*0.6+green*0.1)
    ret = int(ret*100/255)
    return ret

# RGB(6자리/str/hex)리스트를 받아와서 명암으로 변환 후 리턴합니다
def get_darkness(colors : Color):

    ret = {
        'outer':calculate_darkness(colors.outer),
        'top': calculate_darkness(colors.top),
        'bottom': calculate_darkness(colors.bottom),
        'item': calculate_darkness(colors.item),
    }
    return ret

if __name__ == "__main__":
    print("main start")


    print("main end")