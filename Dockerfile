FROM node:20-alpine AS builder

EXPOSE 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV BACKEND_URL https://api.kronfort.quantum747.tech
ENV NEXT_PUBLIC_SITE_URL https://kronfort.quantum747.tech

WORKDIR /app
COPY ["package.json", "package-lock.json", "tsconfig.json", "next.config.mjs", "custom.d.ts", "./"]
ARG BACKEND_URL
RUN echo "BACKEND_URL=${BACKEND_URL}" >> .env
RUN npm ci
COPY . .
RUN npm run build

ENTRYPOINT npm run start
