import requests
from PIL import Image
from io import BytesIO

if __name__ == "__main__":
    test_img_path = "input/03615_00.jpg"
    url = "http://127.0.0.1:9010/predict/"  # FastAPI 서버 주소
    files = {'file': ('image.jpg', open(test_img_path, 'rb'))}  # 보낼 파일

    response = requests.post(url, files=files)  # 응답
    # 예상 타입  <class 'PIL.Image.Image'>
    print(type(response))

    segmented_image = response['file']
    if response.status_code == 200:
        print("200")
        # segmented_image = Image.open(BytesIO(response.content))
        segmented_image_path = 'output/segmented_image.png'
        segmented_image.save(segmented_image_path)
    else:
        print("Error:", response.status_code)
        print(response.text)  # 서버에서 반환하는 오류 메시지를 출력
