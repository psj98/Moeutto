# from multiprocessing import pool
import multiprocessing
import time
import pandas as pd
from bs4 import BeautifulSoup
import requests
import re


# while start < 37:  # 1페이지~36페이지
def crawl(start, title_list, url_list, category_list, price_list, gender_list):
    print(start, " start")

    url = ('https://www.musinsa.com/brands/musinsastandard?category3DepthCodes=&category2DepthCodes'
           '=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods'
           '=&timeSale=&includeKeywords=&sortCode=emt_high&tags=&page={'
           '}&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods=').format(
        start)
    response = requests.get(url, verify = False)
    soup = BeautifulSoup(response.text, 'lxml')

    for img in soup.find_all('a', attrs={'class': 'img-block'}):
        goods_num = img['href'].split('/')[-1]

        goods_url = 'https://www.musinsa.com/app/goods/{}'.format(goods_num)
        goods_response = requests.get(goods_url, headers={"User-Agent": "Chrome/39.0.2171.95"},verify = False)
        goods_soup = BeautifulSoup(goods_response.text, 'lxml')

        category = goods_soup.find_all('p', attrs={'class': 'item_categories'})[0] # 대분류 이름
        category_detail = category.get_text().replace(' ', '').replace('\n', '').replace('(무신사스탠다드)', '').split('>') # 중분류 이름

        if(len(category.select('a')) <= 2):
            continue

        category_top = str(category.select('a')[0]).split('"')[1].split('/')[-1] # 대분류 번호
        category_bottom = str(category.select('a')[1]).split('"')[1].split('/')[-1] # 중분류 번호

        title_list.append(img['title'])
        url_list.append('https:' + img['href'])
        category_info = [category_detail[0], category_detail[1], category_top, category_bottom]
        category_list.append(category_info)
# class
        price = goods_soup.find_all('span', attrs={'class': 'product_article_price'})[0] # 가격 정보
        price_list.append(re.sub(r'[^0-9]', '', price.get_text().split()[-1]))
# 수정 필요 : 성별 추가
        gender = goods_soup.find_all('span', attrs={'class': 'txt_gender'})[0] # 성별 정보
        gender_list.append(gender.get_text())
    # for article in soup.find_all('div', attrs={'class': 'article_info'}):
    #     price = article.find_all('p', attrs={'class': 'price'})
    #     price_list.append(re.sub(r'[^0-9]', '', price[0].get_text().split()[-1]))

    print(start, " finish")

    return


if __name__ == '__main__':
    manager = multiprocessing.Manager()
    title_list = manager.list()
    url_list = manager.list()
    category_list = manager.list()
    price_list = manager.list()
    # 성별 추가
    gender_list = manager.list()

    start_time = time.time()
    print("--- %s seconds ---" % start_time)

    pool = multiprocessing.Pool(processes=8)
    pool.starmap(crawl, [(start + 1, title_list, url_list, category_list, price_list, gender_list) for start in range(20)])
    pool.close()
    pool.join()

    title_list = list(title_list)
    price_list = list(price_list)
    url_list = list(url_list)
    # 성별 리스트 추가
    gender_list = list(gender_list)

    large_category_name = [sublist[0] for sublist in category_list]
    middle_category_name = [sublist[1] for sublist in category_list]
    large_category_num = [sublist[2] for sublist in category_list]
    middle_category_num = [sublist[3] for sublist in category_list]

    df = pd.DataFrame({'상품명': title_list, 'url': url_list, '가격': price_list, '성별': gender_list,
                        '대분류 이름': large_category_name, '중분류 이름': middle_category_name,
                        '대분류 번호': large_category_num, '중분류 번호': middle_category_num})
    df.to_csv('무신사.csv', encoding='utf-8-sig')
    print("--- %s seconds ---" % (time.time() - start_time))
