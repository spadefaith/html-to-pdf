# Use the Node.js 16 Alpine base image
FROM node:18.19.0-alpine

WORKDIR /app

COPY . ./

RUN npm install -g pnpm
RUN npm install -g nodemon
RUN npm install -g dotenv-cli
RUN npm install


ENV CHROME_BIN=/snap/bin/chromium

COPY . .

# EXPOSE 3000

CMD ["npm","start"]
