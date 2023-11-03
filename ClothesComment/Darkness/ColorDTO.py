from pydantic import BaseModel
class Color(BaseModel):
    def __init__(self, outer_color, top_color, bottom_color, item_color):
        super().__init__()  # 부모 클래스의 생성자 호출

        # 인스턴스 변수 초기화
        self.outer = outer_color
        self.top = top_color
        self.bottom = bottom_color
        self.item = item_color

    outer: str
    top: str
    bottom: str
    item: str