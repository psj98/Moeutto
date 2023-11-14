FROM golang:1.21 as build-image
WORKDIR /recommend
COPY . /recommend
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app /myapp/cmd/myapp/main.go

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build-image /recommend/app .
CMD ["./app"]