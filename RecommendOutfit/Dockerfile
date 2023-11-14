FROM golang:1.21
ENV GO111MODULE=on
WORKDIR /app
RUN ls -al
RUN echo "$(pwd)"
COPY ./myapp/go.mod .
COPY ./myapp/go.sum .
COPY . .
EXPOSE 9000
RUN go build ./myapp/cmd/myapp/main.go
CMD ["./main.go"]
