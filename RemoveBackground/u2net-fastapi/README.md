# 개요

# 수정 사항
- mask 합쳐서 하나의 이미지 생성
- fast api wrapping

## 추가 구현 요구사항
- 이미지 crop/resize (전처리)
- 가운데 픽셀 기준으로 rgb -> hex 값 반환







# Copyright
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1LGgLiHiWcmpQalgazLgq4uQuVUm9ZM4M?usp=sharing)

This repo contains inference code and gradio demo script using pre-trained U2NET model for Cloths Parsing from human portrait.</br>
Here clothes are parsed into 3 category: Upper body(red), Lower body(green) and Full body(yellow). The provided script also generates alpha images for each class. 

# Acknowledgements
- U2net model is from original [u2net repo](https://github.com/xuebinqin/U-2-Net). Thanks to Xuebin Qin for amazing repo.
- Most of the code is taken and modified from  [levindabhi/cloth-segmentation](https://github.com/levindabhi/cloth-segmentation)
