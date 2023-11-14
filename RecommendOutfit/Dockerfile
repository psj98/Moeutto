FROM golang:1.21
RUN go env -w GO111MODULE=auto
WORKDIR /app
COPY . /app

RUN echo "$PWD"
RUN ls

RUN go env -w GO111MODULE=off
RUN go build -o /myapp/cmd/myapp/main.go

EXPOSE 9000

CMD ["./myapp/cmd/myapp/main.go"]
