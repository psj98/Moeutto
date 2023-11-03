from fastapi import FastAPI, File, UploadFile
import uvicorn

import process as kjg
from PIL import Image
from io import BytesIO

from fastapi.responses import StreamingResponse

app = FastAPI()

@app.get("/test")
def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/predict")
async def create_report(file: UploadFile = File(...)):
    # 이 사이에서 문제 발생
    img = await file.read()
    img = Image.open(BytesIO(img)).convert('RGB')
    # img = Image.open(BytesIO(content)).convert('RGB')
    #  이 사이에서 문제 발생


    print("img Type : "+str(type(img)))
    ret = kjg.main(img)
    print("predict 완료")
    print("ret type:"+str(type(ret)))
    # ret tpye:<class 'PIL.Image.Image'>
    # ret-> segmented img
    # return {'file': ret}
    buffer = BytesIO()
    ret.save(buffer, format='JPEG')
    buffer.seek(0)

    return StreamingResponse(buffer, media_type="image/jpeg")

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=9010)
