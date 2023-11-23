from math import sqrt

color_palette = [
    [  # 범위 넓게
        {'name': 'red', 'kr': '빨강', 'hex_color': '#FF0000'},
        {'name': 'purple', 'kr': '보라', 'hex_color': '#800080'},
        {'name': 'blue', 'kr': '파랑', 'hex_color': '#0000FF'},
    ],
    [  # 범위 중간
        {'name': 'green', 'kr': '초록', 'hex_color': '#008000'},
        {'name': 'grey', 'kr': '회색', 'hex_color': '#808080'},
        {'name': 'pink', 'kr': '핑크', 'hex_color': '#FFC0CB'},
    ],
    [  # 굉장히 좁은 범위
        {'name': 'orange', 'kr': '주황', 'hex_color': '#FFA500'},
        {'name': 'yellow', 'kr': '노랑', 'hex_color': '#FFFF00'},
        {'name': 'khaki', 'kr': '카키', 'hex_color': '#F0E68C'},
    ],
    [  # 검흑
        {'name': 'black', 'kr': '검정', 'hex_color': '#000000'},
        {'name': 'white', 'kr': '하양', 'hex_color': '#FFFFFF'},
    ]
]


def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    hlen = len(hex_color)
    return tuple(int(hex_color[i:i + hlen // 3], 16) for i in range(0, hlen, hlen // 3))


def normalize_rgb(rgb):
    min_value = min(rgb)
    return tuple(c - min_value for c in rgb)


def weighted_color_distance(rgb1, rgb2):
    max_weight = 2.0  # 가장 높은 구성 요소에 부여할 가중치
    min_weight = 1.0  # 다른 구성 요소에 부여할 가중치

    weights = [min_weight, min_weight, min_weight]
    max_index = rgb1.index(max(rgb1))
    weights[max_index] = max_weight

    r_diff = (rgb1[0] - rgb2[0]) * weights[0]
    g_diff = (rgb1[1] - rgb2[1]) * weights[1]
    b_diff = (rgb1[2] - rgb2[2]) * weights[2]

    return sqrt(r_diff ** 2 + g_diff ** 2 + b_diff ** 2)


def closest_color(hex_color):
    input_rgb = normalize_rgb(hex_to_rgb(hex_color))
    # input_rgb = hex_to_rgb(hex_color)
    min_distance = float('inf')
    closest_color_name = None

    idx_weight = [0.8, 3.0, 3.8, 4.6] # 조정 필요, 낮을 수록 높은 우선순위
    for idx,color_category_palette in enumerate(color_palette, start=0): # 0 1 2 3
        for color in color_category_palette:
            palette_rgb = normalize_rgb(hex_to_rgb(color['hex_color']))

            distance = idx_weight[idx]*weighted_color_distance(input_rgb, palette_rgb) # 차등 가중치

            if distance < min_distance:
                min_distance = distance
                closest_color_name = color['name']

    return closest_color_name
