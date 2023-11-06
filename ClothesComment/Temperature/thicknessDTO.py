from pydantic import BaseModel
class Thickness(BaseModel):
    def __init__(self, outer_thickness, top_thickness, bottom_thickness, item_thickness):
        super().__init__()  # 부모 클래스의 생성자 호출

        # 인스턴스 변수 초기화
        self.outer = outer_thickness
        self.top = top_thickness
        self.bottom = bottom_thickness
        self.item = item_thickness

    outer: int
    top: int
    bottom: int
    item: int