# Base image
FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app
COPY pnpm-lock.yaml ./
COPY package*.json ./

# Development Stage
FROM base AS dev
RUN apk update && apk add git curl && rm -rf /var/cache/apk/*
RUN pnpm install
COPY . .
EXPOSE 3000
CMD ["pnpm", "dev"]

# Production Stage
From base as prod
ENV NODE_ENV=production
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
CMD ["pnpm", "start"]