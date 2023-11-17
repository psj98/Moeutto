from network import U2NET

import os
from PIL import Image
import gdown
import numpy as np

import torch
import torch.nn.functional as F
import torchvision.transforms as transforms


from collections import OrderedDict


def load_checkpoint(model, checkpoint_path):
    if not os.path.exists(checkpoint_path):
        print("----No checkpoints at given path----")
        return
    model_state_dict = torch.load(checkpoint_path, map_location=torch.device("cpu"))
    new_state_dict = OrderedDict()
    for k, v in model_state_dict.items():
        name = k[7:]  # remove `module.`
        new_state_dict[name] = v

    model.load_state_dict(new_state_dict)
    print("----checkpoints loaded from path: {}----".format(checkpoint_path))
    return model


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
            palette[j * 3 + 0] |= (((lab >> 0) & 1) << (7 - i))
            palette[j * 3 + 1] |= (((lab >> 1) & 1) << (7 - i))
            palette[j * 3 + 2] |= (((lab >> 2) & 1) << (7 - i))
            i += 1
            lab >>= 3
    return palette


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


def apply_transform(img):
    transforms_list = []
    transforms_list += [transforms.ToTensor()]
    transforms_list += [Normalize_image(0.5, 0.5)]
    transform_rgb = transforms.Compose(transforms_list)
    return transform_rgb(img)


def extract_segmented_image(input_image, mask_image):
    input_array = np.array(input_image)
    mask_array = np.array(mask_image)
    # segmented_image = np.zeros_like(input_array)
    # for i in range(input_array.shape[0]):
    #     for j in range(input_array.shape[1]):
    #         if mask_array[i, j] > 0:
    #             segmented_image[i, j, :] = input_array[i, j, :]
    segmented_image = np.zeros((input_array.shape[0], input_array.shape[1], 4), dtype=np.uint8)
    for i in range(input_array.shape[0]):
        for j in range(input_array.shape[1]):
            if mask_array[i, j] > 0:
                segmented_image[i, j, :3] = input_array[i, j, :]
                segmented_image[i, j, 3] = 255  # 알파 채널을 불투명하게 설정
            else:
                segmented_image[i, j, 3] = 0  # 알파 채널을 투명하게 설정
    segmented_image = Image.fromarray(segmented_image)
    return segmented_image


def generate_mask(input_image, net, palette, device='cpu'):
    img = input_image
    img_size = img.size
    img = img.resize((768, 768), Image.BICUBIC)
    image_tensor = apply_transform(img)
    image_tensor = torch.unsqueeze(image_tensor, 0)

    with torch.no_grad():
        output_tensor = net(image_tensor.to(device))
        output_tensor = F.log_softmax(output_tensor[0], dim=1)
        output_tensor = torch.max(output_tensor, dim=1, keepdim=True)[1]
        output_tensor = torch.squeeze(output_tensor, dim=0)
        output_arr = output_tensor.cpu().numpy()

    classes_to_save = []
    for cls in range(1, 4):  # Exclude background class (0)
        if np.any(output_arr == cls):
            classes_to_save.append(cls)

    cloth_seg = Image.fromarray(output_arr[0].astype(np.uint8), mode='P')
    cloth_seg.putpalette(palette)
    cloth_seg = cloth_seg.resize(img_size, Image.BICUBIC)
    return cloth_seg


def check_or_download_model(file_path):
    if not os.path.exists(file_path):
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        url = "https://drive.google.com/uc?id=11xTBALOeUkyuaK3l60CpkYHLTmv7k3dY"
        gdown.download(url, file_path, quiet=False)
        print("Model downloaded successfully.")
    else:
        print("Model already exists.")


def load_seg_model(checkpoint_path, device='cpu'):
    net = U2NET(in_ch=3, out_ch=4)
    check_or_download_model(checkpoint_path)
    net = load_checkpoint(net, checkpoint_path)
    net = net.to(device)
    net = net.eval()
    return net


def main(img,model):
    device = 'cpu'
    # checkpoint_path = 'model/cloth_segm.pth'


    print("img segmentation start")
    # image_path = 'input/test.jpg'
    # img = Image.open(image_path).convert('RGB')
    # model = load_seg_model(checkpoint_path, device=device)
    palette = get_palette(4)

    cloth_seg = generate_mask(img, net=model, palette=palette, device=device)
    segmented_image = extract_segmented_image(img, cloth_seg)

    return segmented_image
    # segmented_image_path = 'output/segmented_image.png'
    # segmented_image.save(segmented_image_path)
    # print(f"Segmented image saved at {segmented_image_path}")

if __name__ == '__main__':
    # 테스트용 코드
    image_path = 'classification/test.jpg'
    img = Image.open(image_path).convert('RGB')

    segmented_image = main(img)

    segmented_image_path = 'output/segmented_image.png'
    segmented_image.save(segmented_image_path)
    print(type(segmented_image))  # <class 'PIL.Image.Image'>