
import os
from PIL import Image
import numpy as np

import torch
import onnxruntime as ort
import torchvision.transforms as transforms

from collections import OrderedDict
from options import opt


def get_palette(num_cls):
    # (Same as before)
    n = num_cls
    palette = [0] * (n * 3)
    for j in range(0, n):
        lab = j
        palette[j * 3 + 0] = 0
        palette[j * 3 + 1] = 0
        palette[j * 3 + 2] = 0
        i = 0
        while lab:
            palette[j * 3 + 0] |= (((lab >> 0) & 1) << (7 - i))
            palette[j * 3 + 1] |= (((lab >> 1) & 1) << (7 - i))
            palette[j * 3 + 2] |= (((lab >> 2) & 1) << (7 - i))
            i += 1
            lab >>= 3
    return palette


class Normalize_image(object):
    # (Same as before)
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


def apply_transform(img):
    transforms_list = []
    transforms_list += [transforms.ToTensor()]
    transforms_list += [Normalize_image(0.5, 0.5)]
    transform_rgb = transforms.Compose(transforms_list)
    return transform_rgb(img)


def generate_mask(input_image, onnx_model, palette):
    img = input_image
    img_size = img.size
    img = img.resize((768, 768), Image.BICUBIC)
    image_tensor = apply_transform(img)
    image_tensor = torch.unsqueeze(image_tensor, 0)

    alpha_out_dir = os.path.join(opt.output,'alpha')
    cloth_seg_out_dir = os.path.join(opt.output,'cloth_seg')

    os.makedirs(alpha_out_dir, exist_ok=True)
    os.makedirs(cloth_seg_out_dir, exist_ok=True)

    ort_session = ort.InferenceSession(onnx_model)
    ort_inputs = {ort_session.get_inputs()[0].name: image_tensor.numpy()}
    ort_outs = ort_session.run(None, ort_inputs)
    output_arr = np.argmax(ort_outs[0], axis=1)

    classes_to_save = []

    for cls in range(1, 4):  # Exclude background class (0)
        if np.any(output_arr == cls):
            classes_to_save.append(cls)

    for cls in classes_to_save:
        alpha_mask = (output_arr == cls).astype(np.uint8) * 255
        alpha_mask = alpha_mask[0]  # Selecting the first channel to make it 2D
        alpha_mask_img = Image.fromarray(alpha_mask, mode='L')
        alpha_mask_img = alpha_mask_img.resize(img_size, Image.BICUBIC)
        alpha_mask_img.save(os.path.join(alpha_out_dir, f'{cls}.png'))

    cloth_seg = Image.fromarray(output_arr[0].astype(np.uint8), mode='P')
    cloth_seg.putpalette(palette)
    cloth_seg = cloth_seg.resize(img_size, Image.BICUBIC)
    cloth_seg.save(os.path.join(cloth_seg_out_dir, 'final_seg.png'))
    return cloth_seg


def main():
    palette = get_palette(4)
    image_path = 'classification/test.jpg'
    onnx_model_path = 'model/u2net_cloth_seg.onnx'
    img = Image.open(image_path).convert('RGB')
    cloth_seg = generate_mask(img, onnx_model_path, palette)


if __name__ == '__main__':
    main()

