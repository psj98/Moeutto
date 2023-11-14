FROM golang:1.21
RUN go env -w GO111MODULE=auto
WORKDIR /app
COPY . /app

RUN echo "$PWD"
RUN ls

RUN go env -w GO111MODULE=auto
RUN go build -o /app/myapp/cmd/myapp/main.go

EXPOSE 9000

CMD ["./app/myapp/cmd/myapp/main.go"]
