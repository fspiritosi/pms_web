FROM node:22-alpine AS base
WORKDIR /app

# Instalar dependencias
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# Build de la aplicación
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Imagen de producción
FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=4321

# Copiar solo lo necesario para producción
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 4321

CMD ["npm", "start"]
