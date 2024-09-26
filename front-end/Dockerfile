FROM node:20.11

WORKDIR /app

COPY . .
RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "build:watch"]