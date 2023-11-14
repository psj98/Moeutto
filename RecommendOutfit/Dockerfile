FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
RUN pwd
RUN echo "$PWD"
COPY . .
EXPOSE 9000
RUN go build /app/myapp/cmd/myapp/main.go
CMD ["./main.go"]
