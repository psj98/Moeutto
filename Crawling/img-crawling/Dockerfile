FROM amd64/python:3.10-slim
WORKDIR /crawler

#파일이나 폴더를 이미지에 복사합니다 상대경로를 사용할 경우 WORKDIR로 지정한 dir 기준으로 복사합니다
COPY ./requirements.txt /crawler/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /crawler/requirements.txt

COPY . /crawler
EXPOSE 9020

