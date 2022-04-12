FROM node:12-alpine

ENV PORT 3000
RUN mkdir -p /app
WORKDIR /app

COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

EXPOSE 3000
