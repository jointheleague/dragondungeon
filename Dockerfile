FROM node

WORKDIR /dragondungeon

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

CMD ["concurrently", "\"cp /etc/tls/privkey1.pem ./key.pem && cp /etc/tls/cert1.pem ./cert.pem\"", "\"http-server packages/client/build --port 443 -S -C cert.pem\"", "\"http-server packages/client/build --port 80\"", "\"yarn start:server\"" ]