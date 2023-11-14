FROM golang:1.21
RUN go env -w GO111MODULE=off
WORKDIR /app
COPY . /app

RUN pwd
RUN echo "$PWD"

WORKDIR /myapp/cmd/myapp
RUN pwd
RUN echo "$PWD"
RUN go env -w GO111MODULE=off
RUN go build main.go

EXPOSE 9000

CMD ["./main.go"]
