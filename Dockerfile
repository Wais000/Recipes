# ---- Stage 1: build the static React app ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Reproducible install from the lockfile
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Stage 2: serve it with unprivileged nginx (runs as non-root) ----
FROM nginxinc/nginx-unprivileged:stable-alpine
# Install the latest Alpine security patches for OS packages
USER root
RUN apk upgrade --no-cache
USER 101
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
