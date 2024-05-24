FROM node:18.17.0-alpine as builder

WORKDIR /app

COPY . .

RUN apk add git make g++ alpine-sdk python3 py3-pip unzip
RUN npm i -g pnpm
RUN pnpm install
RUN pnpm bundle

FROM node:18.17.0-alpine

RUN apk add zip unzip bash --no-cache

WORKDIR /app

COPY --from=builder /app/out .

CMD ["npm", "start:prod"]
