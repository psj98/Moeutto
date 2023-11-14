FROM golang:1.21
RUN go env -w GO111MODULE=auto
WORKDIR /app
COPY . /app

RUN echo "$PWD"
RUN ls

RUN go env -w GO111MODULE=auto
RUN cd myapp/cmd/myapp | echo "$PWD" | ls
RUN go build -o main.go

EXPOSE 9000

CMD ["./main.go"]
