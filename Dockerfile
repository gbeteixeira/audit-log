FROM node:18.17.0-alpine as builder

WORKDIR /app

RUN apk add bash
RUN npm i -g pnpm @nestjs/cli typescript ts-node

COPY package.json  pnpm-lock.yaml .
COPY .env.example .env

COPY . .

RUN pnpm install
RUN pnpm run bundle

FROM node:18.17.0-alpine

RUN apk add bash
RUN npm i -g pnpm @nestjs/cli typescript ts-node

COPY package.json  pnpm-lock.yaml .
COPY .env.example .env

RUN pnpm install

COPY . .

WORKDIR /app

COPY --from=builder /app/dist .

RUN chmod +x /scripts/wait-for-it.sh /scripts/prod.sh
RUN sed -i 's/\r//g' /scripts/wait-for-it.sh
RUN sed -i 's/\r//g' /scripts/prod.sh

CMD ["/scripts/prod.sh"]
