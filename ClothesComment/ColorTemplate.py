class Color:
    def __init__(self, name: str, kr: str, background: str):
        self.name = name
        self.kr = kr
        self.background = background

colors_data = [
    {'name': 'red', 'kr': '빨강', 'background': '#FFA7A7'},
    {'name': 'orange', 'kr': '주황', 'background': '#FFA7A7'},
    {'name': 'yellow', 'kr': '노랑', 'background': '#FDFF9E'},
    {'name': 'green', 'kr': '초록', 'background': '#A0FF90'},
    {'name': 'blue', 'kr': '파랑', 'background': '#BEADFF'},
    {'name': 'purple', 'kr': '보라', 'background': '#D09AD9'},
    {'name': 'pink', 'kr': '핑크', 'background': '#FF98D6'},
    {'name': 'khaki', 'kr': '카키', 'background': '#C0AE6F'},
    {'name': 'black', 'kr': '검정', 'background': '#131313'},
    {'name': 'white', 'kr': '하양', 'background': '#FFFFFF'},
    {'name': 'grey', 'kr': '회색', 'background': '#E2E2E2'},
    {'name': 'multi', 'kr': '혼합', 'background': 'linear-gradient(180deg, #F19494 0%, #FFFCBC 51.56%, #22D7FF 86.98%, #DF18FF 100%)'},
]

colors = [Color(**data) for data in colors_data]


if __name__ == "__main__":
    for color in colors:
        print(f'name: {color.name}, kr: {color.kr}, background: {color.background}')
