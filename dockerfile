# Etapa 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# 👇 Recibe PUBLIC_API_URL como ARG
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

COPY . .
RUN npm run build

# Etapa 2: Servidor
FROM node:22-alpine

WORKDIR /app

# Copiar solo lo necesario
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Variables de entorno
ENV HOST=0.0.0.0
ENV PORT=4000
ENV PUBLIC_API_URL=$PUBLIC_API_URL

EXPOSE 4000
CMD ["node", "./dist/server/entry.mjs"]