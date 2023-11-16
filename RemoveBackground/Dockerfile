FROM python:3.9
WORKDIR /rembg

COPY ./requirements.txt /rembg/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /rembg/requirements.txt

COPY . /rembg
EXPOSE 9010

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9010"]
