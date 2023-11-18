import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from torch.utils.data import Dataset, DataLoader
from PIL import Image
import pandas as pd
import mlflow
import mlflow.pytorch

# MLflow 실험 설정
mlflow.set_experiment("Fashion Classification Experiment")

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
        image = Image.open(img_path).convert('RGB')
        label = int(self.data.iloc[idx, 1])

        if self.transform:
            image = self.transform(image)

        return image, label

# 데이터 변환 설정
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# 학습 및 검증 데이터셋 로드
train_dataset = MSSFashionDataset(csv_file='./musinsa_train_dataset.csv', root_dir='./', transform=transform)
val_dataset = MSSFashionDataset(csv_file='./musinsa_val_dataset.csv', root_dir='./', transform=transform)

train_loader = DataLoader(train_dataset, batch_size=32, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

# 모델 설정
model = models.mobilenet_v2(weights=True)
model.features[0][0] = nn.Conv2d(3, 32, 3, stride=1, padding=1)
num_classes = 3
model.classifier[1] = nn.Linear(model.last_channel, num_classes)
model.to(device)

# 학습 설정
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# MLflow로 실험 추적 시작
with mlflow.start_run():
    num_epochs = 15

    mlflow.log_param("epochs", num_epochs)
    mlflow.log_param("batch_size", 32)
    mlflow.log_param("learning_rate", 0.001)


    for epoch in range(num_epochs):
        print("epoch : " + str(epoch))
        model.train()
        for inputs, labels in train_loader:
            inputs, labels = inputs.to(device), labels.to(device)
            optimizer.zero_grad()
            outputs = model(inputs)
            loss = criterion(outputs, labels)
            loss.backward()
            optimizer.step()

        # 검증 루프
        model.eval()
        val_loss = 0
        correct = 0
        total = 0
        with torch.no_grad():
            for inputs, labels in val_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                val_loss += loss.item()
                _, predicted = torch.max(outputs.data, 1)
                total += labels.size(0)
                correct += (predicted == labels).sum().item()

        # 평균 검증 손실 및 정확도 계산
        val_loss /= len(val_loader)
        val_accuracy = 100 * correct / total

        mlflow.log_metric("train_loss", loss.item(), step=epoch)
        mlflow.log_metric("val_loss", val_loss, step=epoch)
        mlflow.log_metric("val_accuracy", val_accuracy, step=epoch)

    mlflow.pytorch.log_model(model, "model")

torch.save(model.state_dict(), 'kwonjingu.pth')
