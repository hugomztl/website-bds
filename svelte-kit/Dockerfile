ARG NODE_VERSION=20.11

# Development stage
FROM node:${NODE_VERSION}-alpine AS dev
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npx auth secret
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM node:${NODE_VERSION}-alpine AS builder
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npx auth secret
RUN npm run build
RUN npm prune --production

# Production stage
FROM node:${NODE_VERSION}-alpine AS prod
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY --from=builder /app/.env /
COPY package.json .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "build"]