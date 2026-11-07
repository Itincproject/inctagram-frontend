# Устанавливаем зависимости
FROM node:22-alpine AS dependencies
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile


# Билдим приложение
# Если исходники изменились, но зависимости остались прежними,
# Docker использует закэшированный предыдущий слой dependencies.
FROM node:22-alpine AS builder
WORKDIR /app

COPY . .
COPY --from=dependencies /app/node_modules ./node_modules

RUN yarn build:production


# Стейдж запуска
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/ ./

USER node

EXPOSE 3000

CMD ["yarn", "start"]
