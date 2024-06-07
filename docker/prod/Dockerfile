FROM node:18.17.0-alpine

# Create app directory
WORKDIR /app

RUN apk update && \
    apk add postgresql-client

RUN apk update && apk add bash
RUN npm i -g pnpm

COPY package.json  pnpm-lock.yaml .

# Install app dependencies
ENV NODE_ENV=production
ENV PATH /app/node_modules/.bin:$PATH
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

CMD [ "pnpm", "run", "start" ]
