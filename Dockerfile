# Устанавливаем зависимости
FROM node:20.11-alpine AS dependencies

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile


# Билдим приложение
# Кэширование зависимостей — если файлы проекта изменились,
# но package.json и pnpm-lock.yaml остались неизменными,
# зависимости повторно не устанавливаются.
FROM node:20.11-alpine AS builder

WORKDIR /app

RUN corepack enable

COPY . .

COPY --from=dependencies /app/node_modules ./node_modules

RUN pnpm run build:production


# Стейдж запуска
FROM node:20.11-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN corepack enable

COPY --from=builder /app/ ./

USER node

EXPOSE 3000

CMD ["pnpm", "start"]