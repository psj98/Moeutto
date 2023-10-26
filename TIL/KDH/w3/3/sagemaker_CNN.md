Sagemaker 배포 예시 : CNN, 이미지 검색
https://www.youtube.com/watch?v=RkL470RnNZY&ab_channel=AmazonWebServicesKorea

주의사항 :
elasticsearch 7.14부터 사용에 제한이 있어서
이하의 버전을 사용하는 것을 권장합니다

모델 가져오는 코드 : 39:28

classification -> ResNet50

여기서 top layer 제거하면 feature vector 추출만 실행

input data를 전처리하고 output data를 후처리한
inference.py 필요



## 앞선 front 부분- 45:56
