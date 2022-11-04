FROM node:12-alpine as build_stage

WORKDIR /app/scholastic-client-components

COPY scholastic-client-components/package.json ./package.json
COPY scholastic-client-components/package-lock.json ./package-lock.json
RUN npm install --only=production
COPY scholastic-client-components ./

WORKDIR /app/scholastic-client

COPY scholastic-client/package.json ./package.json
COPY scholastic-client/package-lock.json ./package-lock.json
RUN yarn install --production
COPY scholastic-client ./
RUN yarn build


FROM alpine

VOLUME [ "/www" ]

RUN apk add --no-cache rsync

WORKDIR /app
COPY --from=build_stage /app/scholastic-client/build ./build

CMD ["rsync", "-a", "--delete", "/app/build/", "/www"]