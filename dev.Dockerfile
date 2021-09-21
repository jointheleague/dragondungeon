FROM node

WORKDIR /dragondungeon

RUN apt-get update && apt-get upgrade && apt-get install git zsh
RUN curl -fsSL https://code-server.dev/install.sh | sh
RUN sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

COPY ./package.json .
COPY ./yarn.lock .

COPY ./packages/client/package.json ./packages/client/
COPY ./packages/common/package.json ./packages/common/
COPY ./packages/server/package.json ./packages/server/

RUN yarn 
RUN yarn global add concurrently http-server

COPY . .

RUN chsh -s /bin/zsh
RUN yarn

EXPOSE 8080
EXPOSE 3000
EXPOSE 8001

CMD [ "code-server", "--bind-addr", "0.0.0.0:8080", "--auth", "none" ]