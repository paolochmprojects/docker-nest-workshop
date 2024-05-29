FROM node:20-bookworm-slim as deps

WORKDIR /app

COPY package*.json ./

RUN npm install


FROM node:20-bookworm-slim as builder

WORKDIR /app

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN npm run build
RUN npx prisma generate


FROM node:20-bookworm-slim as runner

WORKDIR /app

RUN apt update && apt install -y openssl

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY ./prisma ./prisma

CMD npx prisma migrate deploy && node dist/main
