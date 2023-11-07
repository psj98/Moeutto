from pydantic import BaseModel


class Thickness(BaseModel):

    outer: int = 0
    top: int = 0
    bottom: int = 0
    item: int = 0

