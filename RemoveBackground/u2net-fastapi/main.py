from fastapi import FastAPI, File, UploadFile
import uvicorn

import process as kjg
from PIL import Image
from io import BytesIO

from fastapi.responses import JSONResponse,StreamingResponse
import base64

app = FastAPI()

@app.get("/test")
def say_hello(name: str = "kwonjingoo"):
    return {"message": f"Hello {name}"}


@app.post("/test_image")
async def test_image(file: UploadFile = File(...)):
    image_data = await file.read()
    return StreamingResponse(BytesIO(image_data), media_type=file.content_type)


@app.post("/predict")
async def create_report(file: UploadFile = File(...)):
    # 이 사이에서 문제 발생
    try:
        img = await file.read()
        img = Image.open(BytesIO(img)).convert('RGB')
        # img = Image.open(BytesIO(content)).convert('RGB')
        #  이 사이에서 문제 발생

        # print("img Type : "+str(type(img)))
        ret = kjg.main(img)
        # print("predict 완료")
        # print("ret type:"+str(type(ret)))
        width, height = ret.size
        center_pixel = ret.getpixel((width // 2, height // 2))
        hex_color = '#{:02x}{:02x}{:02x}'.format(center_pixel[0], center_pixel[1], center_pixel[2])

        # ret tpye:<class 'PIL.Image.Image'>
        # ret-> segmented img
        # return {'file': ret}
        buffer = BytesIO()
        ret.save(buffer, format='JPEG')
        buffer.seek(0)
        encoded_image = base64.b64encode(buffer.getvalue()).decode()

        # JSON 응답으로 이미지와 색상 정보 반환
        # multipart response
        # return StreamingResponse(buffer, media_type="image/jpeg")

        # 분류
        category = "top"


        return JSONResponse(content={"image": encoded_image, "color": hex_color, "category" : category})

    except Exception as e:
        # 예외가 발생하면 오류 메시지를 반환합니다.
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9010)
