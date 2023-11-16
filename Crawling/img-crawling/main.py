from bs4 import BeautifulSoup
import requests
from io import BytesIO
from fashion_clip.fashion_clip import FashionCLIP
from PIL import Image
import chromadb
import re
#function
def img_vector(image):
    images = []
    images.append(image)
    embeded_cloth = fclip.encode_images(images, batch_size=1)
    embeded_list = [float(x) for x in embeded_cloth[0]]

    return embeded_list  # numpy.ndarray

def origin_run(goods_soup, img):
    # 카테고리
    category = goods_soup.find_all('p', attrs={'class': 'item_categories'})[0]  # 대분류 이름
    category_id = category.get_text()
    category_detail = category_id.replace(' ', '').replace('\n', '').replace('(무신사스탠다드)', '').split('>')  # 중분류 이름
    if (len(category.select('a')) <= 2):
        # continue
        return

    category_top = str(category.select('a')[0]).split('"')[1].split('/')[-1]  # 대분류 번호
    category_bottom = str(category.select('a')[1]).split('"')[1].split('/')[-1]  # 중분류 번호
    category_info = category_detail[0]+category_detail[1]+category_top+category_bottom # ids로 사용

    # 타이틀
    print("title: " + str(img['title']))
    # class
    price = goods_soup.find_all('span', attrs={'class': 'product_article_price'})[0]  # 가격 정보
    price = re.sub(r'[^0-9]', '', price.get_text().split()[-1])
    print("price : " + str(price))
    # 이미지 태그 추출
    image_tag = goods_soup.find('img', {'id': 'bigimg'})

    # 이미지 URL 추출
    image_url = image_tag['src']
    if not image_url.startswith('http:'):
        image_url = 'http:' + image_url
    print("image_url : " + str(image_url))
    # 이미지 다운로드
    image_response = requests.get(image_url)
    image = Image.open(BytesIO(image_response.content))

    # 임베딩(이미지 데이터를 백터로 변환)
    embeded_list = img_vector(image)  # numpy.ndarray
    # chromadb - all_clothes에 임베딩
    collection.add(
        # documents=["doc1"], # 비구조화된 추가정보
        embeddings=[embeded_list],
        metadatas=[{"title": str(img['title']), "price": str(price), "image": image_url}],  # 구조화된 추가정보
        ids=[category_info]  # 고유 식별자
    )
    print(start, "finish")


def crawl(start):
    print(start, " start")

    url = ('https://www.musinsa.com/brands/musinsastandard?category3DepthCodes=&category2DepthCodes'
           '=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods'
           '=&timeSale=&includeKeywords=&sortCode=emt_high&tags=&page={'
           '}&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods=').format(
        start)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')

    for img in soup.find_all('a', attrs={'class': 'img-block'}):
        goods_num = img['href'].split('/')[-1]

        goods_url = 'https://www.musinsa.com/app/goods/{}'.format(goods_num)
        goods_response = requests.get(goods_url, headers={"User-Agent": "Chrome/39.0.2171.95"})
        goods_soup = BeautifulSoup(goods_response.text, 'lxml')

        # 상세 페이지 분류 시작
        origin_run(goods_soup, img)

    return


if __name__ == '__main__':

    chroma_client = chromadb.Client()
    try:
        collection = chroma_client.get_collection(name="all_clothes")
    except:
        collection = chroma_client.create_collection(name="all_clothes")
    fclip = FashionCLIP('fashion-clip')

    for start in range(1, 20):
        crawl(start)