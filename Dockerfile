# Use the Node.js 16 Alpine base image
FROM node:18.19.0-alpine

WORKDIR /app

COPY . ./

RUN npm install -g pnpm
RUN npm install -g nodemon
RUN npm install -g dotenv-cli

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



RUN npm install

COPY . .

# EXPOSE 3000

CMD ["npm","start"]
