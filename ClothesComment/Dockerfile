FROM python:3.10
WORKDIR /comment

COPY ./requirements.txt /comment/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /comment/requirements.txt

COPY . /comment
EXPOSE 9011

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9011"]