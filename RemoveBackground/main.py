from fastapi import FastAPI, File, UploadFile
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

import process as kjg
from PIL import Image
from io import BytesIO

from color import closest_color

from fastapi.responses import JSONResponse,StreamingResponse
import base64

from classification.classification import load_model, predict_image  # classification 폴더에서 classification 모듈 임포트


seg_model_path = 'model/cloth_segm.pth'
seg_model = kjg.load_seg_model(seg_model_path, device='cpu')

classification_model_path = './classification/fashion_cnn.pth'
classification_model = load_model(classification_model_path)


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

        # 배경 제거
        ret = kjg.main(img, seg_model)
        ret.show()
        # 색상 추출
        width, height = ret.size
        center_pixel = ret.getpixel((width // 2, height // 2))
        hex_color = '#{:02x}{:02x}{:02x}'.format(center_pixel[0], center_pixel[1], center_pixel[2])
        str_color = closest_color(hex_color)

        # 이미지 인코딩
        buffer = BytesIO()
        ret.save(buffer, format='PNG')# JPEG -> PNG
        buffer.seek(0)
        encoded_image = base64.b64encode(buffer.getvalue()).decode()
        # return StreamingResponse(buffer, media_type="image/jpeg")

        # category(분류)
        # category = "top"
        buffer.seek(0)
        category = predict_image(buffer.getvalue(), classification_model)

        return JSONResponse(content={"file": encoded_image, "color": str_color, "category" : category})

    except Exception as e:
        # 예외가 발생하면 오류 메시지를 반환합니다.
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9010)
