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

# Etapa 2: Servidor estático
FROM node:22-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 4000
CMD ["serve", "dist", "-l", "4000"]
