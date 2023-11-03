import onnxruntime as ort
import numpy as np
from PIL import Image

import torchvision.transforms as transforms

import os

onnx_file_path = os.path.join(os.getcwd(), "u2net_cloth_seg.onnx")
session = ort.InferenceSession(onnx_file_path)

class Normalize_image(object):

    def __init__(self, mean, std):
        assert isinstance(mean, (float))
        if isinstance(mean, float):
            self.mean = mean

        if isinstance(std, float):
            self.std = std

        self.normalize_1 = transforms.Normalize(self.mean, self.std)
        self.normalize_3 = transforms.Normalize([self.mean] * 3, [self.std] * 3)
        self.normalize_18 = transforms.Normalize([self.mean] * 18, [self.std] * 18)

    def __call__(self, image_tensor):
        if image_tensor.shape[0] == 1:
            return self.normalize_1(image_tensor)

        elif image_tensor.shape[0] == 3:
            return self.normalize_3(image_tensor)

        elif image_tensor.shape[0] == 18:
            return self.normalize_18(image_tensor)

        else:
            assert "Please set proper channels! Normlization implemented only for 1, 3 and 18"

def get_palette(num_cls):

    n = num_cls
    palette = [0] * (n * 3)
    for j in range(0, n):
        lab = j
        palette[j * 3 + 0] = 0
        palette[j * 3 + 1] = 0
        palette[j * 3 + 2] = 0
        i = 0
        while lab:
            palette[j * 3 + 0] |= ((lab >> 0) & 1) << (7 - i)
            palette[j * 3 + 1] |= ((lab >> 1) & 1) << (7 - i)
            palette[j * 3 + 2] |= ((lab >> 2) & 1) << (7 - i)
            i += 1
            lab >>= 3
    return palette

def rembg():

    transforms_list = []
    transforms_list += [transforms.ToTensor()]
    transforms_list += [Normalize_image(0.5, 0.5)]
    transform_rgb = transforms.Compose(transforms_list)

    img_file = "../pants.jpg"

    img = Image.open(img_file).convert("RGB")
    img = img.resize((768, 768))

    image_tensor = transform_rgb(img)
    image_tensor = np.expand_dims(image_tensor, 0)

    outs = session.run(None, {'input': image_tensor})

    # 출력을 화면에 표시합니다.
    print(np.unique(outs[0][0]))

    # 처리된 이미지를 생성하고 표시합니다.
    output_numpy = outs[0][0].astype(np.uint8)  # Convert output to uint8
    output_image = Image.fromarray(output_numpy)  # Convert numpy array to PIL image
    output_image.show()  # Display the image

if __name__ == "__main__":
    rembg()
