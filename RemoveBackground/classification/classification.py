# RemoveBackground/classification/classification.py

import torch
import torch.nn as nn
import torch.nn.functional as F
from torchvision import models, transforms
from PIL import Image
import io

# 모델 설정 및 가중치 로드 함수
def load_model(model_path, device):
    model = models.mobilenet_v2(weights=True)
    model.features[0][0] = nn.Conv2d(3, 32, 3, stride=1, padding=1)
    num_classes = 3
    model.classifier[1] = nn.Linear(model.last_channel, num_classes)
    model.load_state_dict(torch.load(model_path, map_location=device))
    model.eval()
    return model

# 이미지 분류 함수 정의
def classify_image(image_data, model, device, threshold=0.5):
    # 이미지 변환 설정
    transform = transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

    image = Image.open(io.BytesIO(image_data)).convert('RGB')
    image = transform(image).unsqueeze(0)
    image = image.to(device)

    with torch.no_grad():
        outputs = model(image)
        probabilities = F.softmax(outputs, dim=1)
        max_prob, predicted = torch.max(probabilities, 1)
        if max_prob < threshold:
            return 3  # 'item'으로 분류
        else:
            return predicted.item()

# 예측 함수
def predict_image(image_data, model, device):
    labels_map = {0: 'outer', 1: 'top', 2: 'bottom', 3: 'item'}
    predicted_class = classify_image(image_data, model, device)
    return labels_map[predicted_class]
