class ColorList:
    def __init__(self, name: str, kr: str, background: str):
        self.name = name
        self.kr = kr
        self.background = background

colors_data = {
    "red":"FFA7A7",
    "orange":"FF7F00",
    "yellow":"FDFF9E",
    "green":"A0FF90",
    "blue":"BEADFF",
    "purple":"D09AD9",
    "pink":"FF98D6",
    "khaki":"C0AE6F",
    "black":"000000",
    "white":"FFFFFF",
    "grey":"E2E2E2",
    "multi":"000000"
    # 혼합 색은 편의상 명도 계산에서 검정색으로 취급
}