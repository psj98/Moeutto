import selenium
from selenium import webdriver as wd
import time
import pandas as pd
from bs4 import BeautifulSoup
import requests
from multiprocessing import Pool, freeze_support

from itertools import repeat
import re

# url = 'https://www.musinsa.com/brands/musinsastandard?category3DepthCodes=&category2DepthCodes=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods=&timeSale=&includeKeywords=&sortCode=emt_high&tags=&page=1&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods='
# response = requests.get(url)
# soup = BeautifulSoup(response.text, 'lxml')
#
# # soup에 해당 url 페이지의 parsing된 html 정보 모두 담기게 됨
#
#
# # list = soup.find_all('div', attrs={'class':'article_info'})
# #
# # for soup in list:
# #     price = soup.find_all('p', attrs={'class': 'price'})
# #     # print(price[0].get_text())
# #
# #     # print(len(price[0]))
# #     # # print("\n")
# #     # for p in price[0]:
# #     #     print(str(p).strip())
# #
# #     if soup.find_all('del') is not None:
# #         print(price[0].get_text().split()[-1])
# #     else:
# #         print(price[0].get_text())
#
#
#
#
# soup.find_all('a', attrs={'class':'img-block'})[0]['href'] # url
# soup.find_all('a', attrs={'class':'img-block'})[0]['title'] # 상품제목
#
# soup.find_all('p', attrs={'class':'price'})[0].get_text()
#
# soup.find_all('p', attrs={'class':'price'})[0].get_text().split()[0]
#
# [re.sub(r'[^0-9]', '', soup.get_text().split()[0]) for soup in soup.find_all('p', attrs={'class':'price'})]

start = 1
title_list = []
url_list = []
category_list = []
price_list = []

while start < 37:  # 1페이지~36페이지
    try:
        url = ('https://www.musinsa.com/brands/musinsastandard?category3DepthCodes=&category2DepthCodes'
               '=&category1DepthCode=&colorCodes=&startPrice=&endPrice=&exclusiveYn=&includeSoldOut=&saleGoods'
               '=&timeSale=&includeKeywords=&sortCode=emt_high&tags=&page={'
               '}&size=90&listViewType=small&campaignCode=&groupSale=&outletGoods=false&boutiqueGoods=').format(
            start)
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'lxml')

        for img in soup.find_all('a', attrs={'class': 'img-block'}):
            title_list.append(img['title'])

            goods_num = img['href'].split('/')[-1]
            url_list.append('https:' + img['href'])

            goods_url = 'https://www.musinsa.com/app/goods/{}'.format(goods_num)
            goods_response = requests.get(goods_url, headers={"User-Agent": "Chrome/39.0.2171.95"})
            goods_soup = BeautifulSoup(goods_response.text, 'lxml')

            category = goods_soup.find_all('p', attrs={'class': 'item_categories'})[0]
            category_detail = category.get_text().replace(' ','').replace('\n','').replace('(무신사스탠다드)','').split('>')
            category_top = str(category.select('a')[0]).split('"')[1].split('/')[-1]
            category_bottom = str(category.select('a')[1]).split('"')[1].split('/')[-1]

            category_info = [category_detail[0], category_detail[1], category_top, category_bottom]
            category_list.append(category_info)

        for article in soup.find_all('div', attrs={'class': 'article_info'}):
            price = article.find_all('p', attrs={'class': 'price'})
            price_list.append(re.sub(r'[^0-9]', '', price[0].get_text().split()[-1]))

        start += 1

    except:
        print("except")
        break

print(len(title_list))
print(len(category_list))
# print(len(price_list))
# df = pd.DataFrame({'상품명': title_list, 'url': url_list, '가격': price_list, '카테고리': category_list})
# df.to_csv('무신사.csv', encoding='utf-8-sig')
