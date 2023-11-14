FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
COPY . /app

RUN pwd
RUN echo "$PWD"

WORKDIR /myapp/cmd/myapp
RUN pwd
RUN echo "$PWD"

RUN go build main.go

EXPOSE 9000

CMD ["./main.go"]
