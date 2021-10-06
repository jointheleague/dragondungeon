FROM node

WORKDIR /dragondungeon

COPY ./package.json .
COPY ./yarn.lock .
COPY ./docker-entrypoint.sh .

COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/
COPY ./packages/site/package.json ./packages/site/

RUN yarn 
RUN yarn global add concurrently http-server

COPY ./packages/client ./packages/client
COPY ./packages/server ./packages/server
COPY ./packages/common ./packages/common
COPY ./packages/site ./packages/site

RUN yarn build:common

RUN concurrently "yarn build:client" "yarn build:site"

EXPOSE 80

EXPOSE 8001

CMD [ "./docker-entrypoint.sh" ]