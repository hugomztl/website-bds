FROM node:20.11

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY /src ./src
COPY /static ./static
COPY /vite.config.ts .
COPY /tsconfig.json .
COPY /svelte.config.js .