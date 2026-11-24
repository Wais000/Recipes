# ---- Stage 1: build the static React app ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
# Reproducible install from the lockfile
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# ---- Stage 2: serve it with nginx from Alpine's own repository ----
# Alpine's nginx package gets security fixes faster than the nginx.org
# image's pinned build, which Trivy flagged. Runs as the non-root nginx user.
FROM alpine:3.24
RUN apk upgrade --no-cache \
 && apk add --no-cache nginx \
 && chown -R nginx:nginx /var/lib/nginx /var/log/nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build --chown=nginx:nginx /app/build /usr/share/nginx/html
USER nginx
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8080/ >/dev/null || exit 1
CMD ["nginx", "-g", "daemon off;"]
