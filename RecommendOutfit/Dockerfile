FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
RUN ls
RUN ls /app
RUN ls /myapp
COPY ./myapp/go.mod .
COPY ./myapp/go.sum .
COPY . .
EXPOSE 9000
RUN go build ./myapp/cmd/myapp/main.go
CMD ["./main.go"]
