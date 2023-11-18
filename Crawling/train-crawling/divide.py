import pandas as pd

# CSV 파일 로드
file_path = './musinsa_dataset.csv'
data = pd.read_csv(file_path)

# 데이터셋을 80% 학습, 20% 검증으로 분할
train_size = int(0.8 * len(data))
train_data = data[:train_size]
val_data = data[train_size:]

# 분할된 데이터셋을 새로운 CSV 파일로 저장
train_file_path = './musinsa_train_dataset.csv'
val_file_path = './musinsa_val_dataset.csv'
train_data.to_csv(train_file_path, index=False)
val_data.to_csv(val_file_path, index=False)


