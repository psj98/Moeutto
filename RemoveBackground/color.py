from math import sqrt

color_palette = [
    {'name': 'red', 'kr': '빨강', 'background': '#FF0000'},
    {'name': 'orange', 'kr': '주황', 'background': '#FFA500'},
    {'name': 'yellow', 'kr': '노랑', 'background': '#FFFF00'},
    {'name': 'green', 'kr': '초록', 'background': '#008000'},
    {'name': 'blue', 'kr': '파랑', 'background': '#0000FF'},
    {'name': 'purple', 'kr': '보라', 'background': '#800080'},
    {'name': 'pink', 'kr': '핑크', 'background': '#FFC0CB'},
    {'name': 'khaki', 'kr': '카키', 'background': '#F0E68C'},
    {'name': 'black', 'kr': '검정', 'background': '#000000'},
    {'name': 'white', 'kr': '하양', 'background': '#FFFFFF'},
    {'name': 'grey', 'kr': '회색', 'background': '#808080'}
]

def hex_to_rgb(hex_color):
    hex_color = hex_color.lstrip('#')
    hlen = len(hex_color)
    return tuple(int(hex_color[i:i+hlen//3], 16) for i in range(0, hlen, hlen//3))

def color_distance(rgb1, rgb2):
    r_diff = rgb1[0] - rgb2[0]
    g_diff = rgb1[1] - rgb2[1]
    b_diff = rgb1[2] - rgb2[2]
    return sqrt((r_diff**2) * 0.299 + (g_diff**2) * 0.587 + (b_diff**2) * 0.114)


def closest_color(hex_color):

    input_rgb = hex_to_rgb(hex_color)
    min_distance = float('inf')
    closest_color_name = None

    for color in color_palette:
        palette_rgb = hex_to_rgb(color['background'])
        distance = color_distance(input_rgb, palette_rgb)
        if distance < min_distance:
            min_distance = distance
            closest_color_name = color['name']

    return closest_color_name

