# syntax=docker/dockerfile:1

FROM golang:1.17.6

WORKDIR /app

COPY go.mod ./
COPY go.sum ./

RUN go mod download

COPY . ./

RUN go build -o /locadora-backend

EXPOSE 3001

CMD [ "/locadora-backend" ]