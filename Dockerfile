FROM node:16-alpine

WORKDIR /dragoncoin

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/

RUN yarn 
RUN yarn global add concurrently http-server

COPY ./packages/client ./packages/client
COPY ./packages/server ./packages/server
COPY ./packages/common ./packages/common

RUN yarn build

RUN mv ./packages/client/build/index.html ./packages/client/build/404.html

EXPOSE 80

EXPOSE 8001

CMD [ "concurrently", "--kill-others-on-fail", "\"http-server packages/client/build --port 80\"", "\"yarn start:server\"" ]