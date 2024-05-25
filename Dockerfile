FROM node:18.17.0-alpine AS builder

# Create app directory
WORKDIR /app

RUN apk add --no-cache bash
RUN npm i -g pnpm @nestjs/cli typescript ts-node

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json  pnpm-lock.yaml .
COPY .env.example .env
COPY prisma ./prisma/

# Install app dependencies
RUN pnpm install

COPY . .

RUN pnpm run bundle

FROM node:18.17.0-alpine

WORKDIR /app

RUN apk add --no-cache bash
RUN npm i -g @nestjs/cli typescript ts-node

COPY ./prod.sh /opt/prod.sh
RUN chmod +x /opt/prod.sh

COPY ./wait-for-it.sh /opt/wait-for-it.sh
RUN chmod +x /opt/wait-for-it.sh

COPY .env.example .env

RUN sed -i 's/\r//g' /opt/wait-for-it.sh
RUN sed -i 's/\r//g' /opt/prod.sh

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

CMD ["/opt/prod.sh"]
