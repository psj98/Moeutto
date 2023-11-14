FROM golang:1.21
RUN go env -w GO111MODULE=auto
WORKDIR /app
COPY . /app

RUN echo "$PWD"
RUN ls -al

WORKDIR /myapp/cmd/myapp

RUN echo "$PWD"
RUN ls -al
RUN go env -w GO111MODULE=off
RUN go build -o main.go

EXPOSE 9000

CMD ["./main.go"]
