import os
import torch
import torch.nn as nn
import torch.optim as optim
from torchvision import models, transforms
from torch.utils.data import Dataset, DataLoader, Subset
from PIL import Image
import pandas as pd
import mlflow
import mlflow.pytorch
import optuna
from sklearn.model_selection import KFold

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

# 학습 데이터셋 로드
train_dataset = MSSFashionDataset(csv_file='./musinsa_train_dataset.csv', root_dir='./', transform=transform)

# MLflow 설정
mlflow.set_tracking_uri("http://localhost:5000")
mlflow.set_experiment("Fashion Classification with HPO and K-Fold")

# Optuna 목적 함수 정의
num_classes = 3
def objective(trial):
    # 하이퍼파라미터 설정
    lr = trial.suggest_float('lr', 1e-5, 1e-1, log=True)
    batch_size = trial.suggest_categorical('batch_size', [16, 32, 64])
    criterion = nn.CrossEntropyLoss()

    # K-fold 교차 검증
    kfold = KFold(n_splits=5, shuffle=True)
    avg_val_accuracy = 0

    for fold, (train_ids, val_ids) in enumerate(kfold.split(train_dataset)):
        # 데이터셋 분할
        train_subs = Subset(train_dataset, train_ids)
        val_subs = Subset(train_dataset, val_ids)
        train_loader = DataLoader(train_subs, batch_size=batch_size, shuffle=True)
        val_loader = DataLoader(val_subs, batch_size=batch_size, shuffle=False)

        # 모델 설정
        model = models.mobilenet_v2(weights=True)
        model.features[0][0] = nn.Conv2d(3, 32, 3, stride=1, padding=1)
        num_classes = 3
        model.classifier[1] = nn.Linear(model.last_channel, num_classes)
        model.to(device)
        optimizer = optim.Adam(model.parameters(), lr=lr)

        # 학습 및 검증 루프
        for epoch in range(10):
            model.train()
            for inputs, labels in train_loader:
                inputs, labels = inputs.to(device), labels.to(device)
                optimizer.zero_grad()
                outputs = model(inputs)
                loss = criterion(outputs, labels)
                loss.backward()
                optimizer.step()

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

            val_accuracy = 100 * correct / total
            avg_val_accuracy += val_accuracy

        # MLflow 로깅
        with mlflow.start_run(nested=True):
            mlflow.log_param("lr", lr)
            mlflow.log_param("batch_size", batch_size)
            mlflow.log_metric("fold_{}_val_accuracy".format(fold), val_accuracy)

    return avg_val_accuracy / 5

# Optuna 최적화 실행
study = optuna.create_study(direction='maximize')
study.optimize(objective, n_trials=10)

# 최적의 하이퍼파라미터 출력
print("Best trial:")
trial = study.best_trial
print("  Value: ", trial.value)
print("  Params: ")
for key, value in trial.params.items():
    print("    {}: {}".format(key, value))

# 최적 하이퍼파라미터로 모델 재학습 및 저장
best_lr = trial.params['lr']
best_batch_size = trial.params['batch_size']

# 재학습을 위한 전체 데이터셋 로더
full_train_loader = DataLoader(train_dataset, batch_size=best_batch_size, shuffle=True)

# 최적의 하이퍼파라미터로 모델 설정
model = models.mobilenet_v2(weights=True)
model.features[0][0] = nn.Conv2d(3, 32, 3, stride=1, padding=1)
model.classifier[1] = nn.Linear(model.last_channel, num_classes)
model.to(device)
optimizer = optim.Adam(model.parameters(), lr=best_lr)
criterion = nn.CrossEntropyLoss()

# 모델 재학습
for epoch in range(10):
    model.train()
    for inputs, labels in full_train_loader:
        inputs, labels = inputs.to(device), labels.to(device)
        optimizer.zero_grad()
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        loss.backward()
        optimizer.step()

# 모델 저장
model_file_path = 'kwonjingu_optuna.pth'
torch.save(model.state_dict(), model_file_path)

# MLflow에 최적 모델 저장
with mlflow.start_run():
    mlflow.log_params(trial.params)
    mlflow.log_metric("best_val_accuracy", trial.value)
    mlflow.pytorch.log_model(model, "best_model")
