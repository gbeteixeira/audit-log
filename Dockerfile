FROM node:18.17.0-alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Instala o PNPM globalmente usando npm
RUN npm install -g pnpm

# Instala o NestJS CLI globalmente
RUN npm install -g @nestjs/cli

COPY .env.example .env

RUN pnpm install

COPY . .

RUN npx prisma generate && pnpm run build

FROM node:18.17.0-alpine as production

ARG NODE_ENV=production
ARG EnvironmentVariable
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

# Instala o PNPM globalmente usando npm
RUN npm install -g pnpm

# Instala o NestJS CLI globalmente
RUN npm install -g @nestjs/cli

COPY .env.example .env

RUN pnpm install

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
