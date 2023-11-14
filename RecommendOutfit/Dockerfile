FROM golang:1.21 as build-image
WORKDIR /recommend
COPY . /recommend
RUN go env -w GO111MODULE=auto
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o app /recommend

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /root/
COPY --from=build-image /recommend/app .
CMD ["./app"]
