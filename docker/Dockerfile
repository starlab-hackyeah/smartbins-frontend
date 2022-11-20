FROM node:14-alpine as builder

WORKDIR /usr/src/app

COPY package.json package-lock.json ./

RUN npm i

COPY . .

RUN npm run build:prod

FROM node:14-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist/ ./dist

COPY server/ ./server

RUN npm i --prefix ./server

CMD npm run start --prefix ./server
