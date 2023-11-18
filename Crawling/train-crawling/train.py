import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import pandas as pd

# GPU 설정
os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"] = "2,3"
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 데이터셋 클래스 정의
class MSSFashionDataset(Dataset):
    def __init__(self, csv_file, root_dir, transform=None):
        self.data = pd.read_csv(csv_file)
        self.root_dir = root_dir
        self.transform = transform

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        img_path = os.path.join(self.root_dir, self.data.iloc[idx, 2])
        image = Image.open(img_path).convert('RGB')  # 색상 이미지로 로드
        label = int(self.data.iloc[idx, 1])

        if self.transform:
            image = self.transform(image)

        return image, label

# 데이터 준비
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

dataset = MSSFashionDataset(csv_file='musinsa_dataset.csv', root_dir='path_to_images', transform=transform)
dataloader = DataLoader(dataset, batch_size=32, shuffle=True)

# MobileNet 모델 설정
model = models.mobilenet_v2(pretrained=True)
model.features[0][0] = nn.Conv2d(3, 32, 3, stride=1, padding=1)
num_classes = 3  # 분류할 클래스 수에 따라 수정
model.classifier[1] = nn.Linear(model.last_channel, num_classes)
model.to(device)

# 학습 설정
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# 학습 루프
num_epochs = 10  # 에포크 수에 따라 수정
for epoch in range(num_epochs):
    for inputs, labels in dataloader:
        inputs, labels = inputs.to(device), labels.to(device)

        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

# 모델 저장
torch.save(model.state_dict(), 'kwonjingu.pth')
