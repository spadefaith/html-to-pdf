# Use the Node.js 16 Alpine base image
FROM node:18.19.0-alpine

RUN npm install -g pnpm
RUN npm install -g nodemon
RUN npm install dotenv

RUN apk update && \
    apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/


WORKDIR /app

COPY package*.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

# EXPOSE 3000

CMD ["npm","start"]
