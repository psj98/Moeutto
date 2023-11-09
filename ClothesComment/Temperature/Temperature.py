from .thicknessDTO import Thickness

# 모든 옷의 temperature를 고려한 따뜻한 정도 return
def get_temperature(thickness : Thickness):

    weights = [14,8,8,3] # outer, top, bottom, item
    ret = 1
    thickness_list = [thickness.outer,thickness.top,thickness.bottom,thickness.item]

    for idx, i in enumerate(thickness_list):
        ret = ret + weights[idx]*thickness_list[i]

    return ret
