import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import transforms
from PIL import Image, ImageOps
import io

# CNN Model Definition

class FashionCNN(nn.Module):
    def __init__(self):
        super(FashionCNN, self).__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.dropout1 = nn.Dropout2d(0.25)
        self.dropout2 = nn.Dropout2d(0.5)
        self.fc1 = nn.Linear(9216, 128)
        self.fc2 = nn.Linear(128, 10)

    def forward(self, x):
        x = self.conv1(x)
        x = F.relu(x)
        x = self.conv2(x)
        x = F.relu(x)
        x = F.max_pool2d(x, 2)
        x = self.dropout1(x)
        x = torch.flatten(x, 1)
        x = self.fc1(x)
        x = F.relu(x)
        x = self.dropout2(x)
        x = self.fc2(x)
        output = F.log_softmax(x, dim=1)
        return output

# Load the trained model
def load_model(model_path):
    model = FashionCNN()
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model

# Class to category mapping
class_to_category = {
    0: "top",
    1: "bottom",
    2: "dress",
    3: "outer",
    4: "pants",
    5: "shoes",
    6: "accessories",
    7: "bag",
    8: "scarf",
    9: "hat"
}

# Image transformation
transform = transforms.Compose([
    transforms.Grayscale(num_output_channels=1),
    transforms.ToTensor(),
    transforms.Normalize((0.5,), (0.5,))
])

# Resize and pad image function
def resize_and_pad_image(image, target_size=(28, 28), fill_color=(0, 0, 0)):
    ratio = min(target_size[0] / image.width, target_size[1] / image.height)
    new_size = (int(image.width * ratio), int(image.height * ratio))
    image = image.resize(new_size, Image.Resampling.LANCZOS)
    new_image = Image.new("L", target_size, fill_color[0])  # 'L' mode for grayscale
    new_image.paste(image, ((target_size[0] - new_size[0]) // 2, (target_size[1] - new_size[1]) // 2))
    return new_image


# Predicting a new image
def predict_image(image_bytes, model):
    image = Image.open(io.BytesIO(image_bytes))
    processed_image = resize_and_pad_image(image)
    if processed_image.mode != 'L':
        processed_image = processed_image.convert('L')
    image_tensor = transform(processed_image).unsqueeze(0)
    outputs = model(image_tensor)
    _, predicted = torch.max(outputs, 1)
    predicted_category = class_to_category[predicted.item()]
    return predicted_category


# 이미지 처리 및 모델 예측을 수행하는 테스트 함수
def test_image_processing_and_prediction(image_path, model):
    with open(image_path, 'rb') as f:
        image_bytes = f.read()

    # 이미지 처리
    image = Image.open(io.BytesIO(image_bytes))
    processed_image = resize_and_pad_image(image)

    # 처리된 이미지 정보 출력
    print("Processed Image Size:", processed_image.size)
    print("Processed Image Mode:", processed_image.mode)

    # 모델 예측 수행
    predicted_category = predict_image(image_bytes, model)
    print("Predicted Category:", predicted_category)

# 모델 로드


if __name__ == "__main__":
    model_path = './fashion_cnn.pth'
    model = load_model(model_path)

    # 이미지 경로
    image_path = './test.jpg'

    # 테스트 실행
    test_image_processing_and_prediction(image_path, model)