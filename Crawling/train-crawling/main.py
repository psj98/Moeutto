import process as kjg
from PIL import Image
from io import BytesIO
import torch

import requests
from bs4 import BeautifulSoup
import pandas as pd
from PIL import Image
from io import BytesIO
import os

os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]="0,1"
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
seg_model_path = 'model/cloth_segm.pth'
seg_model = kjg.load_seg_model(seg_model_path, device=device)


image_dir = 'downloaded_images'
os.makedirs(image_dir, exist_ok=True)

def origin_run(goods_soup, img, title_list, category_list, image_list, image_count):
    # 대분류 이름 추출 및 카테고리 번호 할당
    print("oring run start")
    category_name = goods_soup.find_all('p', attrs={'class': 'item_categories'})[0].get_text().strip().split('>')[0]

    print(category_name)
    print(type(category_name))
    category_name = category_name.strip()
    # 아우터, 상의, 바지에 해당하는 경우에만 데이터 저장
    if category_name in ['아우터', '상의', '바지']:
        print("category correct")
        category_num = 0 if category_name == '아우터' else 1 if category_name == '상의' else 2

        title = img['title'].strip()
        title_list.append(title)

        # 이미지 다운로드 및 저장
        image_tag = goods_soup.find('img', {'id': 'bigimg'})
        image_url = 'http:' + image_tag['src'] if not image_tag['src'].startswith('http:') else image_tag['src']
        response = requests.get(image_url)
        image = Image.open(BytesIO(response.content))

        #이미지 똑같이 전처리
        ret = kjg.main(image, seg_model)

        image_filename = f"{image_count}.PNG"
        image_path = os.path.join(image_dir, image_filename)
        ret.save(image_path)
        print(str(image_filename)+"saved")
        image_list.append(image_path)
        category_list.append(category_num)

        return image_count + 1
    else:
        return image_count

def crawl(start, title_list, category_list, image_list, image_count):
    print("seg start")
    url = ('https://www.musinsa.com/brands/musinsastandard?category3DepthCodes=&category2DepthCodes'
           '=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods'
           '=&timeSale=&includeKeywords=&sortCode=emt_high&tags=&page={'
           '}&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods=').format(start)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')

    for img in soup.find_all('a', attrs={'class': 'img-block'}):
        goods_num = img['href'].split('/')[-1]
        goods_url = 'https://www.musinsa.com/app/goods/{}'.format(goods_num)
        goods_response = requests.get(goods_url, headers={"User-Agent": "Chrome/39.0.2171.95"})
        goods_soup = BeautifulSoup(goods_response.text, 'lxml')

        image_count = origin_run(goods_soup, img, title_list, category_list, image_list, image_count)

    return image_count

if __name__ == '__main__':
    title_list = []
    category_list = []
    image_list = []
    image_count = 0

    # image_count = crawl(1, title_list, category_list, image_list, image_count)
    for start in range(1, 20):
        image_count = crawl(start, title_list, category_list, image_list, image_count)

    # 데이터프레임 생성 및 CSV 파일로 저장
    df = pd.DataFrame({
        'title': title_list,
        'category': category_list,
        'image_path': image_list
    })
    df.to_csv('musinsa_dataset.csv', index=False, encoding='utf-8-sig')
