FROM golang:1.21 as build-image

WORKDIR /go/src/myapp/cmd/myapp

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app .

FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

COPY --from=build-image /go/src/myapp/cmd/myapp/app .

EXPOSE 9000

CMD ["./app"]
