# Use a more modern Flutter version to support flutter_bootstrap.js (v3.22+)
FROM ghcr.io/cirruslabs/flutter:3.24.0 AS build-env

WORKDIR /app
COPY . .

# Ensure .env is available during build for dart-defines
RUN flutter pub get
RUN flutter build web --release

# Final image using nginx
FROM nginx:alpine
COPY --from=build-env /app/build/web /usr/share/nginx/html

# Cloud Run expects the service to listen on the port defined by $PORT (default 8080)
# We overwrite the default nginx config to use 8080
RUN printf "server {\n  listen 8080;\n  location / {\n    root /usr/share/nginx/html;\n    index index.html index.htm;\n    try_files \$uri \$uri/ /index.html;\n  }\n}\n" > /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
