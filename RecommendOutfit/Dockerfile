FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
RUN pwd
COPY . /app
EXPOSE 9000
RUN go build /app/myapp/cmd/myapp/main.go
CMD ["/app/myapp/cmd/myapp/main.go"]
