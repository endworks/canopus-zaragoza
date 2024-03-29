FROM node:alpine AS builder

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn run build

FROM node:alpine AS production
LABEL org.opencontainers.image.source https://github.com/drkcat/canopus-zaragoza

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn --prod

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000/tcp

CMD ["yarn", "run", "start:prod"]