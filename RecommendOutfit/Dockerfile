FROM golang:1.21
RUN go env -w GO111MODULE=auto
WORKDIR /app
COPY . /app

RUN echo "$PWD"
RUN ls

WORKDIR /app/myapp/cmd/myapp

RUN echo "$PWD"
RUN ls

RUN go env -w GO111MODULE=auto
RUN go build -o main.go

EXPOSE 9000

ENV TZ=Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD ["./main.go"]
