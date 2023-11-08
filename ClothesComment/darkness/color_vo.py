from pydantic import BaseModel


class Color(BaseModel):

    outer: str = "black"
    top: str = "black"
    bottom: str = "black"
    item: str = "black"
