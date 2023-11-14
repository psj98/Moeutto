FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
COPY . /app
RUN pwd
RUN go build /app/myapp/cmd/myapp/main.go

COPY . /app
EXPOSE 9000

CMD ["/myapp/cmd/myapp/main.go"]
