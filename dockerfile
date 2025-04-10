# Dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .

# 👇 Recibe PUBLIC_API_URL como ARG
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

RUN npm install -g pnpm && pnpm install && pnpm build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
RUN npm install -g serve
EXPOSE 4000
CMD ["serve", "dist", "-l", "4000"]
